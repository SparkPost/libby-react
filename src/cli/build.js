import { build } from 'vite';
import { makeConfig } from './makeConfig';
import { resolve } from 'path';
import chalk from 'chalk';

export default async (config, callback) => {
  console.log();
  console.log(chalk.green.bold('Building Libby'));
  console.log();

  try {
    const viteConfig = makeConfig(config);

    await build({
      ...viteConfig,
      mode: 'production',
      configFile: false
    });

    console.log();
    console.log(chalk.green('→ ' + resolve(config.cwd, config.outputPath)));
  } catch (e) {
    callback(e);
  }
};
