import React from 'react';

function getDocument(id) {
  if (document.getElementById(id)) {
    return document.getElementById(id).contentWindow.document;
  }

  function noop() {}

  return {
    addEventListener: noop,
    removeEventListener: noop
  };
}
function useIframeEvent(id, event, callback) {
  const environment = getDocument(id);

  React.useEffect(() => {
    environment.addEventListener(event, callback);
    return () => {
      environment.removeEventListener(event, callback);
    };
  }, [event, callback]);
}

export default useIframeEvent;
