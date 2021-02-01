import React from 'react';
import useWindow from './useWindow';

/**
 * Handles global window event listeners in a reusable hook
 * @param {String} event
 * @param {Func} callback
 *
 * @example
 *  function Component() {
 *    useWindowEvent('resize', handleWindowResize);
 *    ...
 *  }
 */
function useWindowEvent(event, callback) {
  const environment = useWindow();

  React.useEffect(() => {
    environment.addEventListener(event, callback);
    return () => environment.removeEventListener(event, callback);
  }, [event, callback]);
}

export default useWindowEvent;
