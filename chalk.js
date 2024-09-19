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
    return args.doPrintPlain 
        ? params.join(' ')
        : FORMAT.BOLD + params.join(' ') + FORMAT.CLEAN;
}

exports.green = (...params) => {
    return args.doPrintPlain 
        ? params.join(' ')
        : FORMAT.GREEN + params.join(' ') + FORMAT.CLEAN;
}

exports.yellow = (...params) => {
    return args.doPrintPlain 
        ? params.join(' ')
        : FORMAT.YELLOW + params.join(' ') + FORMAT.CLEAN;
}

exports.blue = (...params) => {
    return args.doPrintPlain 
        ? params.join(' ')
        : FORMAT.BLUE + params.join(' ') + FORMAT.CLEAN;
}

exports.magenta = (...params) => {
    return args.doPrintPlain 
        ? params.join(' ')
        : FORMAT.MAGENTA + params.join(' ') + FORMAT.CLEAN;
}
