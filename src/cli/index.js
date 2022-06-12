import start from './start';
import build from './build';
import rimraf from 'rimraf';
import { loadConfigFromFile } from './resolveConfig';

function makeDefaultConfig(userConfig) {
  return {
    // Entries is not configurable
    // entries: 'src/**/*.{libby,stories}.{jsx,tsx,js,ts}'
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libby',
    vite: () => {},
    backgrounds: ['#ffffff', '#ffccd5'],
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
