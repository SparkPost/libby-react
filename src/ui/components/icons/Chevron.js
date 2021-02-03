import React from 'react';
import styled from 'styled-components';
import Box from '@sweatpants/box';

const StyledChevron = styled.span`
  display: inline-block;
  position: relative;
  top: 1px;
  transform: rotate(${(props) => (props.open ? '90deg' : '0deg')});
  transition: transform 0.1s;
`;

function Chevron({ open }) {
  return (
    <Box as={StyledChevron} open={open} color="gray.600">
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
      >
        <path d="M6.5 10.5l3-3-3-3" stroke="currentColor" stroke-linecap="square"></path>
      </svg>
    </Box>
  );
}

export default Chevron;
