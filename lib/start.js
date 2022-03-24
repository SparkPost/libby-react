const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
const makeConfig = require('./makeConfig');

module.exports = async (config, callback) => {
  console.log(chalk.blueBright.bold('Starting Libby'));
  console.log();

  // Make dev webpack config
  const webpackConfig = await makeConfig(config, {
    production: false
  });

  const webpackDevServerConfig = {
    hot: true,
    port: config.port,
    compress: true,
    client: {
      logging: 'error',
      overlay: true
    }
  };

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);

  const { port, openBrowser } = config;

  try {
    await devServer.start();
    if (openBrowser) {
      open(`http://localhost:${port}`);
    }
  } catch (error) {
    if (typeof callback === 'function') {
      callback(error);
    }
  }
};
