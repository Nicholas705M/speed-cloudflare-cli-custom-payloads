exports.showHelp = (process.argv.includes('-h') || process.argv.includes('--help'));
exports.showVersion = (process.argv.includes('-v') || process.argv.includes('--version'));
exports.doPrintColor = (process.argv.includes('-c') || process.argv.includes('--color'));
