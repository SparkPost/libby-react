import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { createPageBus } from '../hooks/useBus';
import { api } from '../api';
import previewCallback from '__LIBBY_PREVIEW__';
import ErrorDisplay from './error';
import { ErrorBoundary } from 'react-error-boundary';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }

  #libby-error, #libby-error-stack {
    color: #FF2222;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace !important;
  }
  #libby-error {
    font-size: 14px;
    font-weight: bold;
  }
  #libby-error-stack {
    margin-top: 10px;
    font-size: 11px;
  }
`;

document.head.appendChild(style);
previewCallback();

// Pulls a unique id from the parent window to namespace the event emitter
// See: src/ui/index.js
const syncElem = window.parent.document.getElementById('sync_id');
const bus = createPageBus(syncElem ? syncElem.getAttribute('data-id') : new Date().getTime());

function Preview({ layout: Layout = require('./layout'), home: Home = require('./home') } = {}) {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  bus.emit('set_entries', api.getMetadata());
  bus.on('load_entry', (search) => {
    if (search && window.location.search !== search) {
      window.location.search = search;
    }
  });

  if (!entry) {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }

  const render = React.createElement(entry.render);
  bus.emit('set_entry_source', reactElementToJSXString(entry.render()));
  return <Layout>{render}</Layout>;
}

function renderPreview() {
  ReactDOM.render(
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Preview />
    </ErrorBoundary>,
    out
  );
}

renderPreview();

if (module.hot) {
  module.hot.accept('../api', () => {
    renderPreview();
  });
}
