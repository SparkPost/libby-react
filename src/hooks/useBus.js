import React from 'react';
import PageBus from '../api/pagebus';

export function createPageBus(syncId = '') {
  return new PageBus(`libby-react-${syncId}`);
}

function useBus(syncId = '') {
  return React.useMemo(() => {
    return createPageBus(syncId);
  }, [syncId]);
}

export default useBus;
