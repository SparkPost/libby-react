import ReactDOM, { version } from 'react-dom';

const use18 =
  version && (version.startsWith('18') || version.startsWith('0.0.0'));

export const renderRoot = async (node) => {
  const out = document.createElement('div');
  // Creates a unique ID
  // Namespaces the event emitter to prevent cross tab or window events
  // This is defined here so that both the UI and Preview iframe have access to it
  out.id = 'sync_id';
  out.setAttribute('data-id', new Date().getTime());
  document.body.append(out);

  if (use18) {
    const reactDomClient = (await import('react-dom/client')).default;
    const root = reactDomClient.createRoot(out);
    root.render(node);
  } else {
    ReactDOM.render(node, out);
  }
};
