const { doFormat } = require('./args.js');

exports.magenta = (...args) => {
    if (doFormat) {
        return `\u001b[35m${args.join(' ')}\u001b[0m`;
    }

    return args.join(' ');
}

exports.bold = (...args) => {
    if (doFormat) {
        return `\u001b[1m${args.join(' ')}\u001b[0m`;
    }

    return args.join(' ');
}

exports.yellow = (...args) => {
    if (doFormat) {
        return `\u001b[33m${args.join(' ')}\u001b[0m`;
    }

    return args.join(' ');
}

exports.green = (...args) => {
    if (doFormat) {
        return `\u001b[32m${args.join(' ')}\u001b[0m`;
    }

    return args.join(' ');
}

exports.blue = (...args) => {
    if (doFormat) {
        return `\u001b[34m${args.join(' ')}\u001b[0m`;
    }

    return args.join(' ');
}
