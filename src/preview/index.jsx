import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams
} from 'react-router-dom';
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
    return reactElementToJSXString(render(), {
      maxInlineAttributesLineLength: 70,
      showDefaultProps: false,
      functionValue: () => `fn()`
    });
  } catch (e) {
    console.error(e);
    return 'Something went wrong.';
  }
}

function Preview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get('path');
  const entry = api.getEntry(path);

  bus.removeAllListeners();
  bus.emit('set_entries', api.getMetadata());
  bus.on('load_entry', (newPath) => {
    if (newPath && path !== newPath) {
      setSearchParams({ path: newPath }, { replace: true });
    }
  });

  if (!entry) {
    return <Layout></Layout>;
  }

  const render = createElement(entry.render);
  // This breaks certain stories, unclear why
  // reactElementToJSXString does not fully support certain stories with hooks, e.g. Tabs stories
  bus.emit('set_entry_source', convertRenderToString(entry.render));
  return <Layout>{render}</Layout>;
}

const root = createRoot(out);

function renderPreview() {
  root.render(
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <BrowserRouter>
        <Routes>
          <Route path="/iframe.html" element={<Preview />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

api.configure().then(() => {
  renderPreview();
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
