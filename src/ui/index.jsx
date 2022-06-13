import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const out = document.getElementById('root');

// Creates a unique ID
// Namespaces the event emitter to prevent cross tab or window events
// This is defined here so that both the UI and Preview iframe have access to it
out.id = 'sync_id';
out.setAttribute('data-id', new Date().getTime());

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; }
  * { box-sizing: border-box; }

  #libby-source .linenumber.react-syntax-highlighter-line-number {
    font-style: normal !important;
    font-size: 10px !important;
    padding-right: 20px !important;
    color: #a2adb8 !important;
  }

  #libby-source code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace !important;
  }

  #libby-source pre {
    border-radius: 5px !important;
    border: 1px solid #ebf0f5 !important;
    margin: 0 !important;
    background: white;
    height: 100% !important;
    padding: 24px !important;
    font-size: 13px !important;
    line-height: 1.45em !important;
  }
`;
document.head.appendChild(style);

const root = createRoot(out);

function renderApp() {
  root.render(<App />);
}

renderApp();
