import path from 'path';
import webpack from 'webpack';
import { performance } from 'perf_hooks';
import makeConfig from './makeConfig.js';
import { prettyBuild, gray } from './logger';

export default async function build(config, callback) {
  console.log(gray('Building...\n'));
  performance.mark('build-s');

  const webpackConfig = await makeConfig(config, {
    production: true
  });

  webpack(webpackConfig, (err, stats) => {
    // https://webpack.js.org/api/node/#error-handling
    if (err) {
      const errorMessage = [err.stack || err, err.details]
        .filter(Boolean)
        .join('\n\n');
      return callback(errorMessage);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      return callback(info.errors.map(({ stack }) => stack).join('\n\n'));
    }

    performance.mark('build-e');
    const { duration } = performance.measure('build', 'build-s', 'build-e');

    prettyBuild({
      duration,
      path: config.outputPath
    });

    return callback();
  });
}
