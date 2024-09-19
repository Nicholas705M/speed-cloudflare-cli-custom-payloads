#!/usr/bin/env node

/*
Flags:
    -h || --help
    -p || --plain
*/

exports.runHelp = (process.argv.includes('--help') || process.argv.includes('-h'));
exports.doPrintPlain = (process.argv.includes('--plain') || process.argv.includes('-p'));
