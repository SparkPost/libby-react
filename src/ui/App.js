import config from '__LIBBY_CONFIG__';
import React from 'react';
import { Router } from '@reach/router';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import styled from 'styled-components';
import { theme } from './theme';
import createBus from '../api/pagebus';
import BackgroundContext, { BackgroundContextProvider } from './context/BackgroundContext';
import SearchContext from './context/SearchContext';
import useWindow from './hooks/useWindow';
import Navigation from './components/Navigation';
import Input from './components/Input';
import Toolbar from './components/Toolbar';

const StyledWrapper = styled(Box)`
  transition: background 0.1s;
`;

function App() {
  const { value: backgroundValue } = React.useContext(BackgroundContext);
  const [initialized, setInitialized] = React.useState(false);
  const [navItems, setNavItems] = React.useState({});
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef();

  const environment = useWindow();
  const searchString = environment?.location?.search;

  const bus = React.useMemo(() => {
    // Pulls a unique id from the parent window to namespace the event emitter
    // See: src/ui/index.js
    return createBus(document.getElementById('sync_id').getAttribute('data-id'));
  }, []);

  bus.on('set_entries', (d) => {
    setInitialized(true);
    setNavItems(d);
  });

  bus.emit('load_entry', searchString);

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
            toggleSource={() => setShowSource(!showSource)}
          />
        </Box>
        <StyledWrapper bg={backgroundValue || 'white'} borderRadius="5px" height="100%">
          <Box
            id="libby-iframe"
            as="iframe"
            src={`${environment.location.origin}/iframe.html`}
            width="100%"
            height="100%"
            border="none"
          />
        </StyledWrapper>
      </Box>
    </Box>
  );
}

function Wrapper() {
  return (
    <BackgroundContextProvider>
      <Theme theme={theme}>
        <Router>
          <App path="/" />
        </Router>
      </Theme>
    </BackgroundContextProvider>
  );
}
export default Wrapper;
