import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  useSearchParams,
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { getEntry, getMetadata, bus } from '../api';
import previewCallback from '__LIBBY_PREVIEW__';
import ErrorDisplay from './error';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './defaultLayout';

const out = document.createElement('div');
document.body.append(out);
const root = createRoot(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }
`;

document.head.appendChild(style);
previewCallback();

function convertRenderToString(render) {
  /**
   * Doesnt work with stories with hooks, so we catch that error instead
   * of falling back to the Error Boundary
   */
  try {
    if (render) {
      return reactElementToJSXString.default(render(), {
        maxInlineAttributesLineLength: 70,
        showDefaultProps: false,
        functionValue: () => `fn()`
      });
    }
    return '';
  } catch (e) {
    return 'Could not render component entry source code.';
  }
}

/**
 * Source code and Entry rendering is handle in a separate component
 * so that any hooks inside entries are encapsulated.
 * Hooks inside Preview do not conflict with any entry hooks.
 */

function SourceHandler({ path }) {
  const entry = getEntry(path) ?? {};
  bus.emit('set_entry_source', convertRenderToString(entry.render));
  return null;
}

function EntryHandler({ path, render }) {
  if (!render) {
    return <Layout />;
  }
  return (
    <Layout>
      {render()}
      <SourceHandler path={path} />
    </Layout>
  );
}

function Preview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get('path');
  const entry = getEntry(path) ?? {};

  bus.removeAllListeners();
  bus.emit('set_entries', getMetadata());
  bus.on('load_entry', (newPath) => {
    if (newPath && path !== newPath) {
      setSearchParams({ path: newPath }, { replace: true });
    }
  });

  return <EntryHandler path={path} render={entry.render} />;
}

root.render(
  <ErrorBoundary FallbackComponent={ErrorDisplay}>
    <BrowserRouter>
      <Routes>
        <Route path="/iframe.html" element={<Preview />} />
        <Route path="/iframe" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
