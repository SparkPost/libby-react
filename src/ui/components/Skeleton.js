import React from 'react';
import Box from '@sweatpants/box';

function Skeleton(props) {
  return <Box height="1.3rem" borderRadius="4px" bg="gray.200" width="60%" {...props} />;
}

export default Skeleton;
