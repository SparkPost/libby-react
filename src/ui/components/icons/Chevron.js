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
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        width="14px"
        height="14px"
      >
        <g>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </g>
      </svg>
    </Box>
  );
}

export default Chevron;
