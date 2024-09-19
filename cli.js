#!/usr/bin/env node

const { performance } = require("perf_hooks");
const https = require("https");
const { magenta, bold, yellow, green, blue } = require("./chalk.js");
const stats = require("./stats.js");

async function get(hostname, path) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            {
                hostname,
                path,
                method: "GET",
            },
            (res) => {
                const body = [];
                res.on("data", (chunk) => {
                    body.push(chunk);
                });
                res.on("end", () => {
                    try {
                        resolve(Buffer.concat(body).toString());
                    } catch (e) {
                        reject(e);
                    }
                });
                req.on("error", (err) => {
                    reject(err);
                });
            },
        );

        req.end();
    });
}

async function fetchServerLocationData() {
    const res = JSON.parse(await get("speed.cloudflare.com", "/locations"));

    return res.reduce((data, { iata, city }) => {
        // Bypass prettier "no-assign-param" rules
        const data1 = data;

        data1[iata] = city;
        return data1;
    }, {});
}

function fetchCfCdnCgiTrace() {
    const parseCfCdnCgiTrace = (text) =>
        text
            .split("\n")
            .map((i) => {
                const j = i.split("=");

                return [j[0], j[1]];
            })
            .reduce((data, [k, v]) => {
                if (v === undefined) return data;

                // Bypass prettier
                // "no-assign-param" rules
                const data1 = data;
                // Object.fromEntries is only
                // supported by Node.js 12 or newer
                data1[k] = v;

                return data1;
            }, {});

    return get("speed.cloudflare.com", "/cdn-cgi/trace").then(parseCfCdnCgiTrace);
}

function request(options, data = "") {
    let started;
    let dnsLookup;
    let tcpHandshake;
    let sslHandshake;
    let ttfb;
    let ended;

    options.agent = new https.Agent(options);

    return new Promise((resolve, reject) => {
        started = performance.now();
        const req = https.request(options, (res) => {
            res.once("readable", () => {
                ttfb = performance.now();
            });
            res.on("data", () => {});
            res.on("end", () => {
                ended = performance.now();
                resolve([started, dnsLookup, tcpHandshake, sslHandshake, ttfb, ended, parseFloat(res.headers["server-timing"].slice(22))]);
            });
        });

        req.on("socket", (socket) => {
            socket.on("lookup", () => {
                dnsLookup = performance.now();
            });
            socket.on("connect", () => {
                tcpHandshake = performance.now();
            });
            socket.on("secureConnect", () => {
                sslHandshake = performance.now();
            });
        });

        req.on("error", (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

function download(bytes) {
    const options = {
        hostname: "speed.cloudflare.com",
        path: `/__down?bytes=${bytes}`,
        method: "GET",
    };

    return request(options);
}

function upload(bytes) {
    const data = "0".repeat(bytes);
    const options = {
        hostname: "speed.cloudflare.com",
        path: "/__up",
        method: "POST",
        headers: {
            "Content-Length": Buffer.byteLength(data),
        },
    };

    return request(options, data);
}

function measureSpeed(bytes, duration) {
    return (bytes * 8) / (duration / 1000) / 1e6;
}

async function measureLatency() {
    const measurements = [];

    for (let i = 0; i < 20; i += 1) {
        await download(1000).then(
            (response) => {
                // TTFB - Server processing time
                measurements.push(response[4] - response[0] - response[6]);
            },
            (error) => {
                console.log(`Error: ${error}`);
            },
        );
    }

    return [Math.min(...measurements), Math.max(...measurements), stats.average(measurements), stats.median(measurements), stats.jitter(measurements)];
}

async function measureDownload(bytes, iterations) {
    const measurements = [];

    for (let i = 0; i < iterations; i += 1) {
        await download(bytes).then(
            (response) => {
                const transferTime = response[5] - response[4];
                measurements.push(measureSpeed(bytes, transferTime));
            },
            (error) => {
                console.log(`Error: ${error}`);
            },
        );
    }

    return measurements;
}

async function measureUpload(bytes, iterations) {
    const measurements = [];

    for (let i = 0; i < iterations; i += 1) {
        await upload(bytes).then(
            (response) => {
                const transferTime = response[6];
                measurements.push(measureSpeed(bytes, transferTime));
            },
            (error) => {
                console.log(`Error: ${error}`);
            },
        );
    }

    return measurements;
}

function logInfo(text, data) {
    console.log(bold(" ".repeat(15 - text.length), `${text}:`, blue(data)));
}

function logLatency(data) {
    console.log(bold("         Latency:", magenta(`${data[3].toFixed(2)} ms`)));
    console.log(bold("          Jitter:", magenta(`${data[4].toFixed(2)} ms`)));
}

function logSpeedTestResult(size, test) {
    const speed = stats.median(test).toFixed(2);
    console.log(bold(" ".repeat(9 - size.length), size, "speed:", yellow(`${speed} Mbps`)));
}

function logDownloadSpeed(tests) {
    console.log(bold(" Download speed:", green(stats.quartile(tests, 0.9).toFixed(2), "Mbps")));
}

function logUploadSpeed(tests) {
    console.log(bold("   Upload speed:", green(stats.quartile(tests, 0.9).toFixed(2), "Mbps")));
}

async function speedTest() {
    const [ping, serverLocationData, { ip, loc, colo }] = await Promise.all([measureLatency(), fetchServerLocationData(), fetchCfCdnCgiTrace()]);

    const city = serverLocationData[colo];
    logInfo("Server location", `${city} (${colo})`);
    logInfo("Your IP", `${ip} (${loc})`);

    logLatency(ping);
    
    // [testSizeMB, testIterations]
    const downloadTests = [
        [0.1, 8], 
        [1, 8],
        [10, 6],
        [25, 4]
    ];

    var downloadTestResults = [];
    for (test of downloadTests) {
        const payloadSize = test[0];
        const iterations = test[0];
        const bytes = (payloadSize * 1000000) + 1000;
        const result = await measureDownload(bytes, iterations);

        var label = payloadSize + "MB";
        if (payloadSize < 1) {
            label = (1000 * payloadSize) + "kB";
        }

        logSpeedTestResult(label, result);
        downloadTestResults = [...downloadTestResults, ...result];
    }
    logDownloadSpeed(downloadTestResults);

    const testUp1 = await measureUpload(11000, 10);
    const testUp2 = await measureUpload(101000, 10);
    const testUp3 = await measureUpload(1001000, 8);
    const uploadTests = [...testUp1, ...testUp2, ...testUp3];
    logUploadSpeed(uploadTests);
}

speedTest();
