import { createServer } from 'vite';
import { makeConfig } from './makeConfig';
import chalk from 'chalk';

export default async (config, callback) => {
  console.log();
  console.log(chalk.green.bold('Starting Libby'));
  console.log();

  try {
    const viteConfig = makeConfig(config);

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

    await server.listen();
    server.printUrls();
  } catch (error) {
    callback(error);
  }
};
