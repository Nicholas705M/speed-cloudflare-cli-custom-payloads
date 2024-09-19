#!/usr/bin/env node

/*
Flags:
--plain
*/

exports.doFormat = !(process.argv.includes('--plain') || process.argv.includes('-p'));
