module.exports = {
  entries: () => require.context('./src', true, /\.libby\.js$/),
  title: 'Libby Example',
  home: '.libby/home.js',
  port: 9003,
  outputPath: 'dist',
  backgrounds: {
    default: 'gray',
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
