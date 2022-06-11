import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glob from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '../..');

export const makeConfig = (userConfig) => {
  const config = defineConfig({
    root: root,
    plugins: [
      react({
        // Force reloads
        exclude: /\.(libby|stories)\.(t|j)sx?$/
      })
    ],
    define: {
      __LIBBY_ENTRIES__: JSON.stringify(glob.sync(userConfig.entries, { absolute: true }))
    },
    resolve: {
      alias: {
        __LIBBY_CONFIG__: resolve(userConfig.cwd, 'libby.config.js'),
        __LIBBY_PREVIEW__: userConfig.preview
          ? resolve(userConfig.cwd, userConfig.preview)
          : resolve(root, 'src/preview/defaultPreview.js'),
        __LIBBY_LAYOUT__: userConfig.layout
          ? resolve(userConfig.cwd, userConfig.layout)
          : resolve(root, 'src/preview/defaultLayout.jsx')
      }
    },
    build: {
      outDir: resolve(userConfig.cwd, userConfig.outputPath),
      rollupOptions: {
        input: {
          index: resolve(root, 'index.html'),
          iframe: resolve(root, 'iframe.html')
        },
        output: {
          entryFileNames: '[name].js',
          dir: resolve(userConfig.cwd, userConfig.outputPath)
        }
      }
    }
  });

  return mergeConfig(config, userConfig.vite);
};
