import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import styled from 'styled-components';
import Box from '@sweatpants/box';
import Button from './components/Button';
import ScreenReaderOnly from '@sweatpants/screenreaderonly';
import Orientation from './components/icons/Orientation';
import IconWrapper from './components/IconWrapper';

const StyledWrapper = styled(Box)`
  user-select: ${(props) => (props.resizing ? 'none' : '')};
`;

const StyledIcon = styled(Button)`
  position: relative;
  transform: ${(props) => (props.orientation === 'vertical' ? 'rotate(90deg)' : 'rotate(0deg)')};
  transform-origin: 50% 50%;
`;

const StyledXResize = styled(Box)`
  cursor: col-resize;
  &:before {
    position: absolute;
    content: '';
    left: 4px;
    right: 0;
    top: 1px;
    bottom: 1px;
    border-left: 1px solid ${(props) => props.theme.colors.blue};
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease-in-out;
    transition-delay: 200ms;
    border-radius: 5px;
  }
  &:hover,
  &:active {
    &:before {
      opacity: 1;
    }
  }
`;

const StyledYResize = styled(Box)`
  cursor: row-resize;
  &:before {
    position: absolute;
    content: '';
    left: 1px;
    right: 1px;
    top: 4px;
    bottom: 0;
    border-top: 1px solid ${(props) => props.theme.colors.blue};
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease-in-out;
    transition-delay: 200ms;
    border-radius: 5px;
  }
  &:hover,
  &:active {
    &:before {
      opacity: 1;
    }
  }
`;

function Source(props) {
  const {
    orientation,
    toggleOrientation,
    resizeYProps,
    resizeXProps,
    width,
    height,
    resizing
  } = props;
  SyntaxHighlighter.registerLanguage('jsx', jsx);

  return (
    <StyledWrapper
      id="libby-source"
      position="absolute"
      top={orientation === 'vertical' ? '0' : 'auto'}
      left={orientation === 'vertical' ? 'auto' : '0'}
      bottom="0"
      right="0"
      resizing={resizing}
      height={orientation === 'horizontal' ? `${height}px` : 'auto'}
      width={orientation === 'horizontal' ? 'auto' : `${width}px`}
    >
      <StyledYResize
        position="absolute"
        top="-4px"
        width="100%"
        height="8px"
        bg="transparent"
        display={orientation === 'horizontal' ? 'block' : 'none'}
        {...resizeYProps}
      />
      <StyledXResize
        position="absolute"
        height="100%"
        width="8px"
        left="-4px"
        bg="transparent"
        display={orientation === 'horizontal' ? 'none' : 'block'}
        {...resizeXProps}
      />
      <Box position="absolute" right="8px" top="8px" transform="rotate(28deg)">
        <StyledIcon
          orientation={orientation}
          onClick={toggleOrientation}
          title="Toggle Source Code Orientation"
        >
          <IconWrapper>
            <Orientation />
            <ScreenReaderOnly>Toggle source code orientation</ScreenReaderOnly>
          </IconWrapper>
        </StyledIcon>
      </Box>
      <SyntaxHighlighter language="jsx" showLineNumbers style={ghcolors}>
        {props.code}
      </SyntaxHighlighter>
    </StyledWrapper>
  );
}

export default Source;
