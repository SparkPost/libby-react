import fs from 'fs';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';

export const dynamicImport = new Function(
  'file',
  'return import(file)'
);

export const loadConfigFromFile = async (configPath) => {
  try {
    const fileUrl = pathToFileURL(configPath);
    const bundled = await bundleConfigFile(configPath);
    fs.writeFileSync(configPath + '.bundled.js', bundled);
    const userConfig = (await dynamicImport(`${fileUrl}.bundled.js`))
      .default.default;
    fs.unlinkSync(configPath + '.bundled.js');
    return userConfig;
  } catch (e) {
    console.error('[Libby] Failed to load config file');
  }

  return {};
};

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
