import React from 'react';
import { version } from 'react-dom';
import {
  useSearchParams,
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ErrorBoundary } from 'react-error-boundary';
import previewCallback from '__LIBBY_PREVIEW__';
import Layout from '__LIBBY_LAYOUT__';
import ErrorDisplay from './error';
import { getEntry, getMetadata, bus } from '../api/index.js';
import { renderRoot } from '../utils/root';

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }
`;

document.head.appendChild(style);
previewCallback();

function makeCodeFromRender(render) {
  try {
    if (render) {
      return reactElementToJSXString.default(render(), {
        maxInlineAttributesLineLength: 70,
        showDefaultProps: false,
        functionValue: () => `fn()`
      });
    }
  } catch (e) {
    return 'Unable to load source code.';
  }
}

/**
 * Source code and Entry rendering is handle in a separate component
 * so that any hooks inside entries are encapsulated.
 * Hooks inside Preview do not conflict with any entry hooks.
 */

function SourceBoundary({ path }) {
  const entry = getEntry(path) ?? {};
  React.useEffect(() => {
    bus.emit('set_entry_source', makeCodeFromRender(entry.render));
  }, [path]);
  return null;
}

function EntryBoundary({ path }) {
  const entry = getEntry(path) ?? {};
  const { render: Render } = entry;
  return <Render />;
}

function EntryHandler({ path }) {
  if (!path) {
    return <Layout />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Layout>
        <EntryBoundary path={path} />
      </Layout>
    </ErrorBoundary>
  );
}

function Preview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get('path');

  bus.removeAllListeners();
  bus.emit('set_entries', getMetadata());
  bus.on('load_entry', (newPath) => {
    if (newPath && path !== newPath) {
      setSearchParams({ path: newPath }, { replace: true });
    }
  });

  return (
    <>
      <EntryHandler path={path} />
      {/* Do not hijack app when source fails (for hooks) */}
      <ErrorBoundary fallbackRender={() => null}>
        <SourceBoundary path={path} />
      </ErrorBoundary>
    </>
  );
}

const render = async () => {
  return await renderRoot(
    <BrowserRouter>
      <Routes>
        <Route path="/iframe.html" element={<Preview />} />
        <Route path="/iframe" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
};

let root;
const setRoot = (v) => {
  root = v;
};
render().then(setRoot);

if (module.hot) {
  module.hot.accept('../api', () => {
    const use18 =
      version && (version.startsWith('18') || version.startsWith('0.0.0'));
    if (use18) {
      root.unmount();
      render().then(setRoot);
    } else {
      root.remove();
      render().then(setRoot);
    }
  });
}
