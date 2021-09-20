const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
const makeConfig = require('./makeConfig');

module.exports = async (config, callback) => {
  console.log(chalk.gray('Starting Libby'));

  // Make dev webpack config
  const webpackConfig = await makeConfig(config, {
    production: false
  });

  const webpackDevServerConfig = {
    hot: true,
    client: {
      logging: 'error',
      overlay: true,
      progress: true
    }
  };

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);

  const { port, openBrowser } = config;

  devServer.listen(port, '0.0.0.0', (...args) => {
    const [err] = args;

    if (!err && openBrowser) {
      open(`http://localhost:${port}`);
    }

    if (typeof callback === 'function') {
      callback(...args);
    }
  });
};
