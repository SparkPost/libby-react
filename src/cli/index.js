import start from './start';
import build from './build';
import rimraf from 'rimraf';
import { loadConfigFromFile } from './resolveConfig';

function makeDefaultConfig(userConfig) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libby',
    entries: 'src/**/*.libby.jsx',
    ...userConfig
  };
}

export default async ({ configPath, cwd }) => {
  const userConfig = await loadConfigFromFile(configPath);
  const config = makeDefaultConfig({ ...userConfig, cwd });

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
