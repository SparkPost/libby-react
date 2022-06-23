import fs from 'fs';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';
import { logError } from './logger';

// Prevents rollup from bundling a user config file (it doesnt exist at this point)
const dynamicImport = new Function('file', 'return import(file)');

const ExternalPlugin = {
  name: 'all-packages-external',
  setup(build) {
    // Must not start with "/" or "./" or "../"
    const filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/;
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      external: true
    }));
  }
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
    sourcemap: false,
    plugins: [ExternalPlugin]
  });

  return result.outputFiles[0].text;
};

/**
 * Extracts config options required for the browser
 */
// const makeRuntimeConfig = (userConfig, root) => {
//   const fileName = `config.runtime.js`;
//   if (fs.existsSync(`${root}/${fileName}`)) {
//     fs.unlinkSync(`${root}/${fileName}`);
//   }
//   fs.writeFileSync(
//     `${root}/${fileName}`,
//     `export const backgrounds = [${userConfig.backgrounds.map(
//       (c) => `'${c}'`
//     )}];
//     export const title = "${userConfig.title}";`
//   );
// };

export const loadConfigFromFile = async ({ configPath, root, exit }) => {
  try {
    const fileUrl = pathToFileURL(configPath);
    const bundled = await bundleConfigFile(configPath);

    fs.writeFileSync(configPath + '.bundled.js', bundled);
    const userConfig = (await dynamicImport(`${fileUrl}.bundled.js`)).default
      .default;
    fs.unlinkSync(configPath + '.bundled.js');

    // makeRuntimeConfig(userConfig, root);
    return userConfig;
  } catch (e) {
    logError(e);
    exit();
  }

  return {};
};
