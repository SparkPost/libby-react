import { useState, useContext, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@sweatpants/box';
import { Stack } from '@sweatpants/stack';
import SearchContext from '../context/SearchContext';
import { focusRing } from '../styles/focusRing';
import Button from './Button';
import Chevron from './icons/Chevron';
import Skeleton from './Skeleton';

function getSearchableString(str) {
  return str.replace('-', ' ').replace('__', ' ').toLowerCase();
}

function searchEntries(entries, inputSearchValue) {
  return entries.reduce((acc, entry) => {
    const stringToSearch = getSearchableString(entry.key);
    return acc || stringToSearch.includes(inputSearchValue);
  }, false);
}

function searchKinds(kinds, inputSearchValue) {
  return Object.keys(kinds).reduce((acc, folderKind) => {
    const hasKinds = kinds[folderKind].kinds;
    const hasEntries =
      kinds[folderKind].entries && kinds[folderKind].entries.length;

    if (acc) {
      return true;
    }

    if (getSearchableString(folderKind).includes(inputSearchValue)) {
      return true;
    }

    if (hasEntries) {
      acc = searchEntries(
        kinds[folderKind].entries,
        inputSearchValue
      );
    }

    if (hasKinds && !acc) {
      acc = searchKinds(kinds[folderKind].kinds, inputSearchValue);
    }

    return acc;
  }, false);
}

const NavLi = styled.li`
  list-style-type: none;
  padding: 0rem;
  margin: 0;

  a,
  a:visited {
    display: inline-block;
    color: #000000;
    text-decoration: none;
    border-radius: 4px;
    transition: 0.2s;
    outline: none;

    ${css({
      px: 200,
      py: 100,
      mb: 200,
      fontSize: 100
    })}
    ${({ selected }) =>
      selected
        ? css({ color: 'blue', bg: 'rgba(18,115,230, 0.15)' })
        : null}
    &:only-child {
      margin-bottom: 0;
    }
    ${focusRing}
  }

  a:hover {
    ${css({ bg: 'gray.200' })}
  }
`;

function NavEntry(props) {
  const { entry } = props;
  const inputSearchValue = useContext(SearchContext);
  const [searchParams] = useSearchParams();

  const selectedKey = searchParams.get('path');
  const stringToSearch = getSearchableString(entry.key);

  if (
    inputSearchValue.length &&
    !stringToSearch.includes(inputSearchValue)
  ) {
    return null;
  }

  return (
    <NavLi selected={selectedKey === entry.key}>
      <Link to={`/?path=${entry.key}`}>{entry.name}</Link>
    </NavLi>
  );
}

function NavFolder(props) {
  const { kind, item, pl } = props;
  const [show, setShow] = useState(false);
  const inputSearchValue = useContext(SearchContext);

  const containsSearchItem = useMemo(() => {
    let contains = false;

    // Checks if anything is being searched
    if (!inputSearchValue.length) {
      return false;
    }

    // Checks if this folder itself matches input search
    const rootKind = getSearchableString(kind);
    if (rootKind.includes(inputSearchValue)) {
      return true;
    }

    // Checks child entries of this folder
    if (item.entries) {
      contains = searchEntries(item.entries, inputSearchValue);
    }

    // Recursively checks kinds of this folder, and all kinds/entries underneath
    if (item.kinds && contains === false) {
      contains = searchKinds(item.kinds, inputSearchValue);
    }

    return contains;
  }, [item, inputSearchValue]);

  if (inputSearchValue.length && !containsSearchItem) {
    return null;
  }

  return (
    <Box pl={pl || '400'}>
      <Box mb="200">
        <Button onClick={() => setShow(!show)}>
          <Chevron open={show || containsSearchItem} /> {kind}
        </Button>
      </Box>
      {show || containsSearchItem ? <NavKind item={item} /> : null}
    </Box>
  );
}

const StyledFolderBorder = styled.div`
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 1px;

  ${css({
    bg: 'gray.300'
  })}
`;

function NavKind(props) {
  const { item = {} } = props;
  return (
    <Box position="relative" mb="200">
      <StyledFolderBorder />
      {item.kinds
        ? Object.keys(item.kinds).map((kind) => {
            return (
              <NavFolder
                kind={kind}
                item={item.kinds[kind]}
                key={kind}
              />
            );
          })
        : null}
      {item.entries
        ? item.entries.map((entry) => {
            return (
              <Box key={entry.key} pl="400">
                <NavEntry entry={entry} />
              </Box>
            );
          })
        : null}
    </Box>
  );
}

function NavRoot(props) {
  const { items = {}, initialized } = props;
  const inputSearchValue = useContext(SearchContext);
  const { root, ...kinds } = items;
  const rootEntries = items.root ? items.root.entries : [];

  const hide = useMemo(() => {
    return (
      !searchEntries(rootEntries, inputSearchValue) &&
      !searchKinds(kinds, inputSearchValue)
    );
  }, [items, inputSearchValue]);

  if (!initialized) {
    return (
      <Box py="300">
        <Stack space="200">
          <Skeleton />
          <Skeleton ml="2ch" />
          <Skeleton />
          <Skeleton ml="2ch" />
          <Skeleton ml="4ch" />
          <Skeleton ml="4ch" />
          <Skeleton />
          <Skeleton />
        </Stack>
      </Box>
    );
  }

  if (!Object.keys(items).length || hide) {
    return (
      <Box py="300" fontSize="100" color="gray.700">
        No entries found.
      </Box>
    );
  }

  return (
    <div>
      {Object.keys(kinds).map((kind) => {
        return (
          <NavFolder
            kind={kind}
            item={kinds[kind]}
            key={kind}
            pl="0"
          />
        );
      })}
      {rootEntries.map((entry) => (
        <NavEntry entry={entry} key={entry.key} />
      ))}
    </div>
  );
}

export default NavRoot;
