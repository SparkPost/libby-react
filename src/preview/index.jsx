import React from 'react';
import { createRoot } from 'react-dom/client';
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

  #libby-error, #libby-error-stack, .libby-error-button {
    color: #2c353d;
    line-height: 1.5em;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace !important;
  }
  #libby-error {
    font-size: 14px;
    font-weight: bold;
  }
  #libby-error-stack {
    margin-top: 1rem;
    font-size: 12px;    
  }
  #libby-error-container {
    padding: 1rem;
    border-radius: 5px;
    background: #ebf0f5;
    overflow: auto;
  }
  .libby-error-button {
    border: none;
    border-radius: 3px;
    margin: 0 1rem 1rem 0;
    padding: 0.5rem 1rem;
    width: auto;
    overflow: visible;
    background: #ebf0f5;
    color: #2c353d;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    cursor: pointer;
    font-size: 14px;
    transition: 0.15s;
  }
  .libby-error-button:hover {
    background: #d9e0e6;
  }
`;

document.head.appendChild(style);
previewCallback();

// Pulls a unique id from the parent window to namespace the event emitter
// See: src/ui/index.js
const syncElem = window.parent.document.getElementById('sync_id');
const bus = createPageBus(
  syncElem ? syncElem.getAttribute('data-id') : new Date().getTime()
);

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

const root = createRoot(out);
function renderPreview() {
  root.render(
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Preview />
    </ErrorBoundary>
  );
}

api.configure().then(() => {
  renderPreview();
});
