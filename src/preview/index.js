import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
// import createBus from '../api/pagebus';
import { api } from '../api';
import previewCallback from '__LIBBY_PREVIEW__';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }
`;

document.head.appendChild(style);
previewCallback();

function Preview({ layout: Layout = require('./layout'), home: Home = require('./home') } = {}) {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  if (!entry) {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }

  return <Layout>{entry.render()}</Layout>;
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();

if (module.hot) {
  module.hot.accept('../api', () => {
    renderPreview();
  });
}
