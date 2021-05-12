import config from '__LIBBY_CONFIG__';
import React from 'react';
import { Router } from '@reach/router';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import styled from 'styled-components';
import { theme } from './theme';
import useBus from '../hooks/useBus';
import BackgroundContext, { BackgroundContextProvider } from './context/BackgroundContext';
import SourceContext, { SourceContextProvider } from './context/SourceContext';
import SearchContext from './context/SearchContext';
import Source from './source';
import useWindow from './hooks/useWindow';
import useSource from './hooks/useSource';
import Navigation from './components/Navigation';
import Input from './components/Input';
import Toolbar from './components/Toolbar';

const StyledPreviewWrapper = styled(Box)`
  transition: background 0.1s;
`;

const StyledResizeWrapper = styled(Box)`
  cursor: ${(props) =>
    props.resizing ? (props.orientation === 'vertical' ? 'col-resize' : 'row-resize') : ''};
`;

function App() {
  const { value: backgroundValue } = React.useContext(BackgroundContext);
  const sourceContext = React.useContext(SourceContext);
  const [initialized, setInitialized] = React.useState(false);
  const [navItems, setNavItems] = React.useState({});
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [entrySource, setEntrySource] = React.useState('');
  const inputRef = React.useRef();
  const bus = useBus(document.getElementById('sync_id').getAttribute('data-id'));

  const { resizeYProps, resizeXProps, width, height, resizing } = useSource({
    orientation: sourceContext.orientation
  });

  const environment = useWindow();
  const searchString = environment?.location?.search;

  bus.on('set_entries', (d) => {
    setInitialized(true);
    setNavItems(d);
  });

  bus.emit('load_entry', searchString);

  bus.on('set_entry_source', (d) => {
    setEntrySource(d);
  });

  function handleSearchChange(e) {
    setInputValue(e.currentTarget.value);
  }

  function handleSearchKeydown(e) {
    e.stopPropagation();
  }

  return (
    <Box display="grid" gridTemplateColumns={showSidebar ? 'minmax(200px, 18%) 1fr' : '1fr'}>
      {showSidebar ? (
        <Box height="100%" maxHeight="100vh" overflowY="auto" overflowX="hidden">
          <Box as="h1" fontSize="100" m="0" my="400" px="300">
            {config.title || 'Libby'}
          </Box>
          <Box mb="200" px="300">
            <Input
              type="text"
              value={inputValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeydown}
              placeholder="Search"
              ref={inputRef}
            />
          </Box>
          <Box px="300">
            <Box as="nav">
              <SearchContext.Provider value={inputValue.toLowerCase()}>
                <Navigation items={navItems} initialized={initialized} />
              </SearchContext.Provider>
            </Box>
          </Box>
        </Box>
      ) : null}
      <Box position="relative" height="100vh" pt="700" pb="600" px="600">
        <Box position="absolute" top="200" right="500">
          <Toolbar
            toggleSidebar={() => setShowSidebar(!showSidebar)}
            toggleSource={sourceContext.toggleShowSource}
          />
        </Box>
        <StyledResizeWrapper resizing={resizing} position="relative" height="100%">
          <StyledPreviewWrapper bg={backgroundValue || 'white'} borderRadius="5px" height="100%">
            <Box
              id="libby-iframe"
              as="iframe"
              src={`${environment.location.origin}/iframe.html`}
              border="none"
              width="100%"
              height="100%"
            />
          </StyledPreviewWrapper>
          {sourceContext.show ? (
            <>
              {/*
                Resize event handlers don't work when over an iframe, because they are not part of the "window"
                So we add a hidden box here when resizing so mousemove is picked up
              */}
              {resizing && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  bottom="0"
                  right="0"
                  bg="transparent"
                ></Box>
              )}
              <Source
                width={width}
                height={height}
                orientation={sourceContext.orientation}
                toggleOrientation={sourceContext.toggleOrientation}
                resizeYProps={resizeYProps}
                resizeXProps={resizeXProps}
                code={entrySource}
              />
            </>
          ) : null}
        </StyledResizeWrapper>
      </Box>
    </Box>
  );
}

function Wrapper() {
  return (
    <BackgroundContextProvider>
      <SourceContextProvider>
        <Theme theme={theme}>
          <Router>
            <App path="/" />
          </Router>
        </Theme>
      </SourceContextProvider>
    </BackgroundContextProvider>
  );
}
export default Wrapper;
