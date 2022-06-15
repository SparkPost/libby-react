import start from './start';
import build from './build';
import rimraf from 'rimraf';
import { logError } from './logger';

function makeDefaultConfig(config) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libby',
    backgrounds: ['#ffffff', '#ffccd5'],
    ...config
  };
}

async function libby(userConfig, exit) {
  const config = makeDefaultConfig(userConfig);

  const handleError = (err) => {
    if (err) {
      logError(err);
      exit();
    }
  };

  return {
    start: () => {
      start(config, handleError);
    },
    build: () => {
      rimraf.sync(config.outputPath);
      build(config, handleError);
    }
  };
}

export default libby;
