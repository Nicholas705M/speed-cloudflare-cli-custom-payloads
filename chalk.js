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
    return args.doPrintColor 
        ? FORMAT.BOLD + params.join(' ') + FORMAT.CLEAN
        : params.join(' ');
}

exports.green = (...params) => {
    return args.doPrintColor 
        ? FORMAT.GREEN + params.join(' ') + FORMAT.CLEAN
        : params.join(' ');
}

exports.yellow = (...params) => {
    return args.doPrintColor 
        ? FORMAT.YELLOW + params.join(' ') + FORMAT.CLEAN
        : params.join(' ');
}

exports.blue = (...params) => {
    return args.doPrintColor 
        ? FORMAT.BLUE + params.join(' ') + FORMAT.CLEAN
        : params.join(' ');
}

exports.magenta = (...params) => {
    return args.doPrintColor 
        ? FORMAT.MAGENTA + params.join(' ') + FORMAT.CLEAN
        : params.join(' ');
}
