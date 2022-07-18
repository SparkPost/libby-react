import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { performance } from 'perf_hooks';
import makeConfig from './makeConfig';
import { prettyStart } from './logger';

export default async function start(config, callback) {
  try {
    performance.mark('start-s');

    const webpackConfig = await makeConfig(config, {
      production: false
    });

    const webpackDevServerConfig = {
      hot: false,
      client: false,
      port: config.port,
      open: config.openBrowser
    };

    const compiler = webpack({
      ...webpackConfig,
      infrastructureLogging: {
        level: 'none' // Using a custom logger
      },
      watchOptions: {
        aggregateTimeout: 600
      }
    });

    const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);
    await devServer.start();

    const localIPv4 = await WebpackDevServer.internalIP('v4');
    const localIPv6 = await WebpackDevServer.internalIP('v6');

    const { server } = devServer;
    const { port } = server.address();

    performance.mark('start-e');
    const { duration } = performance.measure('start', 'start-s', 'start-e');

    prettyStart({
      port,
      v4: localIPv4,
      v6: localIPv6,
      duration
    });
  } catch (error) {
    if (typeof callback === 'function') {
      callback(error);
    }
  }
}
