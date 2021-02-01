import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { startReportingRuntimeErrors, stopReportingRuntimeErrors } from 'react-error-overlay';

function Source(props) {
  SyntaxHighlighter.registerLanguage('jsx', jsx);

  React.useEffect(() => {
    startReportingRuntimeErrors({ onError: () => {} });
    return () => {
      stopReportingRuntimeErrors();
    };
  }, []);

  return (
    <div id="libby-source">
      <SyntaxHighlighter language="jsx" showLineNumbers style={ghcolors}>
        {reactElementToJSXString(props.entry.render())}
      </SyntaxHighlighter>
    </div>
  );
}

export default Source;
