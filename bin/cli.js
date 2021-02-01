#! /usr/bin/env node
const path = require('path');
const meow = require('meow');
const findUp = require('find-up');
const lib = require('../lib/index.js');

const cli = meow(
  `
  Usage
    $ libby <command> [options...]

  Commands
    start          Starts the libby UI
    build          Builds the libby UI
    help           Displays this usage guide

	Options
    --help, -h     Displays this usage guide
    --version, -v  Displays version info
`,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

async function libby(command, flags) {
  if (flags.version) {
    cli.showVersion(1);
  }

  if (command === 'help') {
    cli.showHelp();
    process.exit(1);
  }

  const configPath = await findUp('libby.config.js');

  if (!configPath) {
    console.error('Please add libby.config.js to the root directory your project.');
    process.exit(1);
  }

  const config = require(configPath);

  const libby = lib({
    cwd: path.dirname(configPath),
    ...config
  });

  if (libby.hasOwnProperty(command)) {
    libby[command]((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    cli.showHelp();
    process.exit(1);
  }
}

libby(cli.input[0], cli.flags);
