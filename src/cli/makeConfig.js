import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, mergeConfig } from 'vite';
import glob from 'vite-plugin-glob';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '../..');

export const makeConfig = (userConfig, isProduction) => {
  const config = defineConfig({
    root: root,
    plugins: [react(), glob()],
    define: {
      __LIBBY_IS_DEV__: JSON.stringify(!isProduction)
    },
    resolve: {
      alias: {
        __LIBBY_CWD__: userConfig.cwd,
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
          entryFileNames: isProduction
            ? '[name].[hash].js'
            : '[name].js',
          dir: resolve(userConfig.cwd, userConfig.outputPath)
        }
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      sourcemap: isProduction
    },
    optimizeDeps: {
      exclude: ['@sparkpost/libby-react']
    }
  });

  return mergeConfig(
    config,
    userConfig.vite({ root: userConfig.cwd, resolve, isProduction })
  );
};
