import fs from 'fs';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';
import { logError } from './logger';

const dynamicImport = new Function('file', 'return import(file)');

const bundleConfigFile = async (fileName) => {
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: 'cjs',
    sourcemap: 'inline'
  });

  return result.outputFiles[0].text;
};

export const loadConfigFromFile = async (configPath, exit) => {
  try {
    const fileUrl = pathToFileURL(configPath);
    const bundled = await bundleConfigFile(configPath);
    fs.writeFileSync(configPath + '.bundled.js', bundled);
    const userConfig = (await dynamicImport(`${fileUrl}.bundled.js`)).default;
    fs.unlinkSync(configPath + '.bundled.js');
    return userConfig.default;
  } catch (e) {
    logError(e);
    exit();
  }

  return {};
};
