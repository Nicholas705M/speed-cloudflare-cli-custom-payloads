const { runHelp, doPrintPlain } = require('./args.js');

exports.magenta = (...args) => {
    if (doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[35m${args.join(' ')}\u001b[0m`;
}

exports.bold = (...args) => {
    if (doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[1m${args.join(' ')}\u001b[0m`;
}

exports.yellow = (...args) => {
    if (doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[33m${args.join(' ')}\u001b[0m`;
}

exports.green = (...args) => {
    if (doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[32m${args.join(' ')}\u001b[0m`;
}

exports.blue = (...args) => {
    if (doPrintPlain) {
        return args.join(' ');
    }

    return `\u001b[34m${args.join(' ')}\u001b[0m`;
}
