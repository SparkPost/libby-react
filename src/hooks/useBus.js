import React from 'react';
import createBus from 'page-bus';

function useBus(syncId = '') {
  return React.useMemo(() => {
    const bus = createBus(`libby-react-${syncId}`);
    bus.setMaxListeners(200);
    return bus;
  }, [syncId]);
}

export default useBus;
