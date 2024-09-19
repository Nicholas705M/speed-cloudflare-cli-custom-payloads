const args = require('./args.js');

exports.magenta = (...args) => {
    if (args.doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[35m${args.join(' ')}\u001b[0m`;
}

exports.bold = (...args) => {
    if (args.doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[1m${args.join(' ')}\u001b[0m`;
}

exports.yellow = (...args) => {
    if (args.doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[33m${args.join(' ')}\u001b[0m`;
}

exports.green = (...args) => {
    if (args.doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[32m${args.join(' ')}\u001b[0m`;
}

exports.blue = (...args) => {
    if (args.doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[34m${args.join(' ')}\u001b[0m`;
}
