// Default config
// Used if user does not provide a webpack config
module.exports = (config) => ({
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: config.cwd,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
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
});
