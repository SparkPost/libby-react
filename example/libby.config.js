module.exports = {
  entries: () => require.context('./src', true, /\.libby\.js$/),
  title: 'Libby Example',
  layout: '.libby/layout.js',
  port: 9003,
  outputPath: 'dist/libby-example',
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff'
      },
      {
        name: 'pink',
        value: '#FFCCD5'
      },
      {
        name: 'gray',
        value: '#ebf0f5'
      }
    ]
  }
};
