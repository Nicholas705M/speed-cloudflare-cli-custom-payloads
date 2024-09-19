exports.showHelp = (process.argv.includes('-h') || process.argv.includes('--help'));
exports.showVersion = (process.argv.includes('-v') || process.argv.includes('--version'));
exports.doPrintPlain = (process.argv.includes('-p') || process.argv.includes('--plain'));
