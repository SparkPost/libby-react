import { performance } from 'perf_hooks';
import { createServer } from 'vite';
import { makeConfig } from './makeConfig';
import chalk from 'chalk';

export default async (config, callback) => {
  console.log(chalk.green.bold('\nStarting Libby'));

  try {
    performance.mark('start-start');
    const viteConfig = makeConfig(config, false);

    const server = await createServer({
      ...viteConfig,
      mode: 'development',
      configFile: false,
      server: {
        port: config.port,
        open: config.openBrowser,
        host: true
      }
    });

    performance.mark('start-end');
    const { duration } = performance.measure(
      'start',
      'start-start',
      'start-end'
    );
    console.log(
      chalk.gray(`Started in ${(duration / 1000).toFixed(2)}s\n`)
    );

    await server.listen();
    server.printUrls();
  } catch (error) {
    callback(error);
  }
};
