function argvHasDashOption(optionStr) {
    const pattern = new RegExp(`-[A-z]*${optionStr}`);
    const cmdArgs = process.argv.slice(2);

    return cmdArgs.some(cmdArgStr => pattern.test(cmdArgStr));
}

exports.showHelp = (argvHasDashOption('h') || process.argv.includes('--help'));
exports.showVersion = (argvHasDashOption('v') || process.argv.includes('--version'));
exports.doPrintColor = (argvHasDashOption('c') || process.argv.includes('--color'));
