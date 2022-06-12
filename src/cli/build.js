import { performance } from 'perf_hooks';
import { build } from 'vite';
import { makeConfig } from './makeConfig';
import { resolve } from 'path';
import chalk from 'chalk';

export default async (config, callback) => {
  console.log(chalk.green.bold('\nBuilding Libby\n'));

  try {
    performance.mark('build-start');
    const viteConfig = makeConfig(config, true);

    await build({
      ...viteConfig,
      mode: 'production',
      configFile: false
    });

    console.log(
      '\n' + chalk.gray(resolve(config.cwd, config.outputPath))
    );

    performance.mark('build-end');
    const { duration } = performance.measure(
      'build',
      'build-start',
      'build-end'
    );
    console.log(
      chalk.gray(`Built in ${(duration / 1000).toFixed(2)}s`)
    );
  } catch (e) {
    callback(e);
  }
};
