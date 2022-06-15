#! /usr/bin/env node
import { dirname } from 'path';
import meow from 'meow';
import { findUp } from 'find-up';
import lib from '../dist/cli.js';

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
    importMeta: import.meta,
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
    console.error(
      'Please add libby.config.js to the root directory your project.'
    );
    process.exit(1);
  }

  const libby = await lib(
    {
      cwd: dirname(configPath),
      configPath
    },
    () => {
      process.exit(1);
    }
  );

  if (libby.hasOwnProperty(command)) {
    libby[command]();
  } else {
    cli.showHelp();
    process.exit(1);
  }
}

libby(cli.input[0], cli.flags);
