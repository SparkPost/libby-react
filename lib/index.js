const start = require('./start');
const build = require('./build');
const rimraf = require('rimraf');

function makeDefaultConfig(config) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libby',
    ...config
  };
}

module.exports = function (userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: (callback) => {
      start(config, callback);
    },
    build: (callback) => {
      rimraf.sync(config.outputPath);
      build(config, callback);
    }
  };
};
