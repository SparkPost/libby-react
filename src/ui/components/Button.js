import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { buttonReset } from '../styles/buttonReset';

const StyledButton = styled.button`
  ${buttonReset}
  display: inline-block;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  transition: 0.2s;
  white-space: nowrap;

  ${css({
    px: 0,
    pr: 200,
    py: 100,
    fontSize: 100
  })}

  &:hover {
    ${css({ bg: 'gray.200' })}
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue};
  }
`;

function Button(props) {
  return <StyledButton {...props} />;
}

export default Button;
