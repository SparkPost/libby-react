// const webpack = require('webpack');

/**
 * @type {import('@sparkpost/libby-react').Config}
 */
export default {
  entries: () => require.context('./src', true, /\.libby\.jsx$/),
  title: 'Libby Example',
  port: 9003,
  outputPath: 'dist',
  openBrowser: true,
  backgrounds: ['#ffffff', '#FFCCD5', '#ebf0f5'],
  webpack: ({ mode }) => {
    return {
      // This doesnt work
      // need to split the config and prevent this from reaching the browser
      // plugins: [
      //   new webpack.IgnorePlugin({
      //     resourceRegExp: /^test$/
      //   })
      // ]
    }
  }
};
