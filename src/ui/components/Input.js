import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { focusRing } from '../styles/styles';

const StyledInput = styled.input`
  display: block;
  margin: 0;
  width: 100%;
  border: none;
  border-radius: 4px;
  outline: none;
  transition: 0.2s;

  ${css({
    p: 200,
    fontSize: 100,
    bg: 'gray.200'
  })}

  ${focusRing}
`;

const Input = React.forwardRef(function Input(props, ref) {
  return <StyledInput data-id="libby-input" {...props} ref={ref} />;
});

export default Input;
