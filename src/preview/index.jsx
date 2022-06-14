import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import previewCallback from '__LIBBY_PREVIEW__';
import ErrorDisplay from './error';
import { ErrorBoundary } from 'react-error-boundary';
import Preview from './preview';
import * as api from '@sparkpost/libby-react';

const out = document.getElementById('root');
const style = document.createElement('style');

style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }
`;

document.head.appendChild(style);
previewCallback();

const root = createRoot(out);

function renderPreview() {
  root.render(
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/iframe.html"
            element={<Preview api={api} />}
          />
          <Route path="/iframe" element={<Preview api={api} />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

api.loadEntries().then(() => {
  renderPreview();
  api.bus.emit('set_entries', api.getMetadata());
});
