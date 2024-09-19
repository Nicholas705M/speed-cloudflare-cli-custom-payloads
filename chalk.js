const args = require('./args.js');
const TERM = {
    CLEAN:      `\u001b[0m`, 
    BOLD:       `\u001b[1m`,
    GREEN:      `\u001b[32m`,
    YELLOW:     `\u001b[33m`,
    BLUE:       `\u001b[34m`,
    MAGENTA:    `\u001b[35m`,
};

exports.TERM = TERM;
exports.format = (terminalCode, ...params) => {
    return args.doPrintColor 
        ? terminalCode + params.join(' ') + TERM.CLEAN
        : params.join(' ');
}

exports.bold = (...params) => {
    return this.format(TERM.BOLD, ...params);
}

exports.green = (...params) => {
    return this.format(TERM.GREEN, ...params);
}

exports.yellow = (...params) => {
    return this.format(TERM.YELLOW, ...params);
}

exports.blue = (...params) => {
    return this.format(TERM.BLUE, ...params);
}

exports.magenta = (...params) => {
    return this.format(TERM.MAGENTA, ...params);
}
