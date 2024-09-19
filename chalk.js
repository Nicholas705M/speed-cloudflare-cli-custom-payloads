const args = require('./args.js');
const FORMAT = {
    CLEAN:      `\u001b[0m`, 
    BOLD:       `\u001b[1m`,
    GREEN:      `\u001b[32m`,
    YELLOW:     `\u001b[33m`,
    BLUE:       `\u001b[34m`,
    MAGENTA:    `\u001b[35m`,
};

exports.bold = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return FORMAT.BOLD + params.join(' ') + FORMAT.CLEAN;
}

exports.green = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return FORMAT.GREEN + params.join(' ') + FORMAT.CLEAN;
}

exports.yellow = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return FORMAT.YELLOW + params.join(' ') + FORMAT.CLEAN;
}

exports.blue = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return FORMAT.BLUE + params.join(' ') + FORMAT.CLEAN;
}

exports.magenta = (...params) => {
    if (args.doPrintPlain) {
        return params.join(' ');
    }

    return FORMAT.MAGENTA + params.join(' ') + FORMAT.CLEAN;
}
