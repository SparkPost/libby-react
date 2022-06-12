import React from 'react';
import { Box } from '@sweatpants/box';

const IconWrapper = (props) => {
  return (
    <Box
      pl="200"
      py="100"
      position="relative"
      top="2px"
      color="black"
    >
      {props.children}
    </Box>
  );
};

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper;
