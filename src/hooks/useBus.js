import React from 'react';
import createBus from 'page-bus';

export function createPageBus(syncId = '') {
  const bus = createBus(`libby-react-${syncId}`);
  bus.setMaxListeners(200);
  return bus;
}

function useBus(syncId = '') {
  return React.useMemo(() => {
    return createPageBus(syncId);
  }, [syncId]);
}

export default useBus;
