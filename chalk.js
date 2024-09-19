const args = require('./args.js');

exports.magenta = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return `\u001b[35m${params.join(' ')}\u001b[0m`;
}

exports.bold = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return `\u001b[1m${params.join(' ')}\u001b[0m`;
}

exports.yellow = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return `\u001b[33m${params.join(' ')}\u001b[0m`;
}

exports.green = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return `\u001b[32m${params.join(' ')}\u001b[0m`;
}

exports.blue = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return `\u001b[34m${params.join(' ')}\u001b[0m`;
}
