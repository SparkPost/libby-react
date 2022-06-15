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
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx'
          }
        },
        {
          test: /\.css?$/,
          include: config.cwd,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
          include: config.cwd,
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[ext]'
          }
        }
      ]
    }
  };
}
