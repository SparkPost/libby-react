import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import styled from 'styled-components';
import Box from '@sweatpants/box';
import Button from '../ui/components/Button';
import ScreenReaderOnly from '@sweatpants/screenreaderonly';
import Orientation from '../ui/components/icons/Orientation';
import IconWrapper from '../ui/components/IconWrapper';
import Theme from '@sweatpants/theme';
import { theme } from '../ui/theme';

const StyledWrapper = styled(Box)`
  user-select: ${(props) => (props.resizing ? 'none' : '')};
  pointer-events: ${(props) => (props.resizing ? 'none' : '')};
`;

const StyledIcon = styled(Button)`
  position: relative;
  transform: ${(props) => (props.orientation === 'vertical' ? 'rotate(90deg)' : 'rotate(0deg)')};
  transform-origin: 50% 50%;
`;

const StyledXResize = styled(Box)`
  cursor: col-resize;
`;

const StyledYResize = styled(Box)`
  cursor: row-resize;
`;

function Source(props) {
  const {
    orientation,
    toggleOrientation,
    resizeYProps,
    resizeXProps,
    width,
    height,
    resizing,
    isSource
  } = props;
  SyntaxHighlighter.registerLanguage('jsx', jsx);

  return (
    <div id="libby-source">
      <Theme theme={theme}>
        <StyledWrapper
          resizing={resizing}
          height={orientation === 'horizontal' ? `${height}px` : '100vh'}
          width={orientation === 'horizontal' ? '100vw' : `${width}px`}
          position="relative"
        >
          <StyledYResize
            position="absolute"
            top="-16px"
            width="100%"
            height="32px"
            bg="transparent"
            display={orientation === 'horizontal' ? 'block' : 'none'}
            {...resizeYProps}
          />
          <StyledXResize
            position="absolute"
            height="100%"
            width="32px"
            left="-16px"
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
            {reactElementToJSXString(props.entry.render())}
          </SyntaxHighlighter>
        </StyledWrapper>
      </Theme>
    </div>
  );
}

export default Source;
