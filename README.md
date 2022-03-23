## Libby

Libby is a focused, no-frills React component development tool, similar to Storybook but without the plugins or addons. Libby provides a standalone environment that can be used or deployed with your component or design system documentation.

##### Demos

- [matchbox-libby.netlify.app/](https://matchbox-libby.netlify.app/)
- [libby.netlify.app/](https://libby.netlify.app/)

#### Why

Storybook is slow and ships with a lot of features that we don't need. We wanted something performant, lightweight, with slim dependencies. Some benchmarking of build times with 1,000 React component stories:

<img width="685" alt="Benchmark" src="https://user-images.githubusercontent.com/3903325/159557294-827d5456-fe51-4541-ada5-912b53b4d419.png">

---

### Getting Started

Install `libby` in your app:

```bash
npm i libby-react
```

Create a `libby.config.js` file to the root directory of your project:

```js
// libby.config.js
module.exports = {
  // Required
  entries: () => require.context('./src', true, /\.libby\.js$/),

  // Optional
  outputPath: 'dist',
  layout: '.libby/layout.js',
  home: '.libby/home.js',
  preview: '.libby/preview.js',
  openBrowser: true,
  port: 9000,
  title: 'Page Title',
  webpackConfig: () => ({
    // Custom Webpack config goes here
  }),
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff'
      },
      {
        name: 'gray',
        value: '#ebf0f5'
      }
    ]
  }
};
```

Add the following scripts to your `package.json` file:

```js
// package.json
"scripts": {
  "start": "libby start",
  "build": "libby build"
}
```

Run libby:

```bash
npm run start
```

Create an entry:

```js
import React from 'react';
import { describe, it } from '@sparkpost/libby-react';

describe('My Component', () => {
  it('renders correctly', () => <div>This is a React component!</div>);
});
```

---

### License

MIT
