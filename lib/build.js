const webpack = require('webpack');
const chalk = require('chalk');
const makeConfig = require('./makeConfig.js');
const path = require('path');

const noop = () => {};

module.exports = async (config, callback = noop) => {
  console.log(chalk.blueBright.bold('Building Libby'));
  console.log();

  const webpackConfig = await makeConfig(config, { production: true });

  webpack(webpackConfig, (err, stats) => {
    // https://webpack.js.org/api/node/#error-handling
    if (err) {
      const errorMessage = [err.stack || err, err.details].filter(Boolean).join('\n\n');
      return callback(errorMessage);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      return callback(info.errors.map(({ stack }) => stack).join('\n\n'));
    }

    console.log(chalk.green('Build Done'));
    console.log(chalk.gray('→ ' + path.resolve(config.cwd, config.outputPath)));
    return callback();
  });
};
