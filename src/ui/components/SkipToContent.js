import Button from './Button';
import styled from 'styled-components';
import { focusRing } from '../styles/focusRing';

const StyledContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  opacity: 0;
  pointer-events: none;

  &:focus-within {
    opacity: 1;
  }

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    background: white;
    text-decoration: none;
    font-size: 15px;
    color: black;
    ${focusRing}
  }
`;

function SkipToContent() {
  return (
    <StyledContainer>
      <a href="#libby-iframe">Skip To Content</a>
    </StyledContainer>
  );
}

export default SkipToContent;
