import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { createPageBus } from '../hooks/useBus';
import { api } from '../api';
import previewCallback from '__LIBBY_PREVIEW__';
import ErrorDisplay from './error';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from '__LIBBY_LAYOUT__';

const out = document.getElementById('root');
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

function convertRenderToString(render) {
  try {
    return reactElementToJSXString(render());
  } catch (e) {
    console.error(e);
    return 'Something went wrong.';
  }
}

function Preview() {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  bus.removeAllListeners();
  bus.emit('set_entries', api.getMetadata());
  bus.on('load_entry', (search) => {
    if (search && window.location.search !== search) {
      window.location.search = search;
    }
  });

  if (!entry) {
    return <Layout></Layout>;
  }

  const render = React.createElement(entry.render);
  // This breaks certain stories, unclear why
  // reactElementToJSXString does not fully support certain stories with hooks, e.g. Tabs stories
  bus.emit('set_entry_source', convertRenderToString(entry.render));
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

api.configure().then(() => {
  renderPreview();
});
