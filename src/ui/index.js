import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const out = document.createElement('div');

// Creates a unique ID
// Namespaces the event emitter to prevent cross tab or window events
// This is defined here so that both the UI and Preview iframe have access to it
out.id = 'sync_id';
out.setAttribute('data-id', new Date().getTime());

document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; }
  * { box-sizing: border-box; }
`;
document.head.appendChild(style);

function renderApp() {
  ReactDOM.render(<App />, out);
}

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
