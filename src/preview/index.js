import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';
import Source from './source';
import previewCallback from '__LIBBY_PREVIEW__';
import Box from '@sweatpants/box';
import useSource from './hooks/useSource';
import styled from 'styled-components';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }

  #libby-source .linenumber.react-syntax-highlighter-line-number {
    font-style: normal !important;
    font-size: 12px !important;
    padding-right: 20px !important;
    color: #a2adb8 !important;
  }
  
  #libby-source code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace !important;
  }
  
  #libby-source pre {
    border-radius: 5px !important;
    border: 1px solid #d9e0e6 !important;
    margin: 0 !important;
    background: white;
    height: 100% !important;
    padding: 24px !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }  
`;

document.head.appendChild(style);
previewCallback();

const StyledWrapper = styled(Box)`
  cursor: ${(props) =>
    props.resizing ? (props.orientation === 'vertical' ? 'col-resize' : 'row-resize') : ''};
`;

function Preview({ layout: Layout = require('./layout'), home: Home = require('./home') } = {}) {
  const { path, source } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  const {
    isSource,
    orientation,
    toggleOrientation,
    resizeYProps,
    resizeXProps,
    width,
    height,
    resizing
  } = useSource({ source });

  if (!entry) {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }

  if (isSource === 'true') {
    return (
      <StyledWrapper
        display="flex"
        orientation={orientation}
        resizing={resizing}
        flexDirection={orientation === 'vertical' ? 'row' : 'column'}
        height="100vh"
      >
        <Box flex="1">
          <Layout>{entry.render()}</Layout>
        </Box>
        <Source
          entry={entry}
          orientation={orientation}
          toggleOrientation={toggleOrientation}
          resizeYProps={resizeYProps}
          resizeXProps={resizeXProps}
          width={width}
          height={height}
          resizing={resizing}
        />
      </StyledWrapper>
    );
  }

  return <Layout>{entry.render()}</Layout>;
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();

if (module.hot) {
  module.hot.accept('../api', () => {
    renderPreview();
  });
}
