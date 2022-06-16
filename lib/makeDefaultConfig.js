export default function makeDefaultConfig(config) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: config.cwd,
          exclude: /node_modules/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx'
            }
          }
        },
        {
          test: /\.(ts|tsx)$/,
          include: config.cwd,
          exclude: /node_modules/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx'
            }
          }
        },
        {
          test: /\.m?js/,
          include: config.cwd,
          exclude: /node_modules/,
          // See https://github.com/webpack/webpack/issues/11467
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css?$/,
          include: config.cwd,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg|webm|webp|mp4)$/,
          include: config.cwd,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: config.cwd,
          exclude: /node_modules/,
          type: 'asset/resource'
        }
      ]
    }
  };
}
