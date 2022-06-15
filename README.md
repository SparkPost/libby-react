## Libby

Libby is a focused, no-frills React component development tool, similar to Storybook but without the plugins or addons. Libby provides a standalone environment that can be used or deployed with your component or design system documentation.

##### Demos

- [matchbox-libby.netlify.app/](https://matchbox-libby.netlify.app/)
- [libby.netlify.app/](https://libby.netlify.app/)

### Motivation

Storybook is slow and ships with a lot of features that we don't need. We wanted something performant, lightweight, with slim dependencies. Benchmarking shown here was done with 1,000 stories with a single `<div/>`, on a 2019 MBP i7 2.6GHz. Both setups are using default configs.

Libby is over **20x** faster than Storybook at starting up, and is **4x** faster at a production build.

Final bundled size is **492 KB** for Libby, compared to **5.6 MB** for Storybook.

<img width="659" alt="Screen Shot 2022-03-23 at 8 15 29 PM" src="https://user-images.githubusercontent.com/3903325/159817365-be0b0d96-cb6f-473f-abac-17d7102aa712.png">

---

### Getting Started

Install `libby` in your app:

```bash
npm i libby-react
```

Create a `libby.config.js` file to the root directory of your project:

```js
// libby.config.js
export default {
  /**
   * Imports your entries
   * @see https://webpack.js.org/api/module-methods/#requirecontext
   */
  entries: () => require.context('./src', true, /\.libby\.js$/),

  // Optional
  outputPath: 'dist',
  layout: '.libby/layout.js',
  preview: '.libby/preview.js',
  openBrowser: true,
  port: 9000,
  title: 'Page Title',
  backgrounds: ['#ffffff', '#ebf0f5']
  webpackConfig: () => ({
    // Custom Webpack config goes here
  }),
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
import { describe, add, it } from '@sparkpost/libby-react';

describe('My Component', () => {
  add('Renders', () => <div>This is a React component!</div>);
});
```

---

### License

MIT
