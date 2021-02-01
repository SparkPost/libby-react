## Libby

Libby is a focused, no-frills React component development tool, similar to Storybook but without the plugins or addons. Libby provides a standalone environment that can be used or deployed with your component or design system documentation.

##### Demos
- [libby.netlify.app/](https://libby.netlify.app/)

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
  layout: 'src/components/layout.js',
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
  "libby:start": "libby start",
  "libby:build": "libby build"
}
```

Run libby:

```bash
npm run libby:start
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
