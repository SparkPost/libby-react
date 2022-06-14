import { createElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Layout from '__LIBBY_LAYOUT__';

function convertRenderToString(render) {
  try {
    return reactElementToJSXString(render(), {
      maxInlineAttributesLineLength: 70,
      showDefaultProps: false,
      functionValue: () => `fn()`
    });
  } catch (e) {
    console.error(e);
    return 'Something went wrong.';
  }
}

function Preview({ api }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entry, setEntry] = useState(null);
  const path = searchParams.get('path');

  api.bus.removeAllListeners();

  useEffect(() => {
    setEntry(api.getEntry(path));
  }, [path]);

  api.bus.on('load_entry', (newPath) => {
    if (newPath && path !== newPath) {
      setSearchParams({ path: newPath }, { replace: true });
    }
  });

  if (!entry) {
    return <Layout />;
  }

  const render = createElement(entry.render);
  // This breaks certain stories, unclear why
  // reactElementToJSXString does not fully support certain stories with hooks, e.g. Tabs stories
  api.bus.emit(
    'set_entry_source',
    convertRenderToString(entry.render)
  );
  return <Layout>{render}</Layout>;
}

export default Preview;
