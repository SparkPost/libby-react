import webpack from 'webpack';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import makeDefaultConfig from './makeDefaultConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function makeConfig(config, options) {
  const root = resolve(__dirname, '..');
  const includePaths = [resolve(root, 'src')];
  const isProduction = options.production;
  const mode = isProduction ? 'production' : 'development';
  const devServerEntries = isProduction
    ? []
    : [
        'webpack/hot/dev-server',
        'webpack-dev-server/client/index.js?hot=true&live-reload=true?logging=none'
      ];

  const libbyConfig = {
    mode,
    entry: {
      main: [...devServerEntries, resolve(root, 'src/ui/index.js')],
      preview: [...devServerEntries, resolve(root, 'src/preview/index.js')]
    },
    output: {
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProduction
        ? '[name].[contenthash:8].chunk.js'
        : '[name].chunk.js',
      path: resolve(config.cwd, config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        __LIBBY_CONFIG__: resolve(config.cwd, 'libby.config.js'),
        __LIBBY_LAYOUT__: config.layout
          ? resolve(config.cwd, config.layout)
          : resolve(root, 'src/preview/defaultLayout.js'),
        __LIBBY_PREVIEW__: config.preview
          ? resolve(config.cwd, config.preview)
          : resolve(root, 'src/preview/defaultPreview.js'),
        react: resolve(config.cwd, 'node_modules/react'),
        'react-dom': resolve(config.cwd, 'node_modules/react-dom')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: includePaths,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx'
            }
          },
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    plugins: [
      ...(!isProduction ? [new webpack.HotModuleReplacementPlugin()] : []),
      new HtmlWebpackPlugin({
        title: config.title ? config.title : 'Libby',
        chunksSortMode: 'none',
        chunks: ['main'],
        filename: 'index.html',
        favicon: resolve(root, 'src/favicon.png')
      }),
      new HtmlWebpackPlugin({
        title: config.title ? config.title : 'Libby Preview',
        chunksSortMode: 'none',
        chunks: ['preview'],
        filename: 'iframe.html',
        favicon: resolve(root, 'src/favicon.png')
      }),
      // Hack to make React 17/18 work together
      ...(config.use18
        ? []
        : [
            new webpack.IgnorePlugin({
              resourceRegExp: /react-dom\/client$/
            })
          ])
    ],
    devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
    stats: 'minimal'
  };

  const userConfig = config.webpack ? config.webpack({ mode, webpack }) : {};
  const defaultConfig = makeDefaultConfig(config);
  return merge(libbyConfig, defaultConfig, userConfig);
}
