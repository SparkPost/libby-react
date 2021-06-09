import React from 'react';

function ErrorDisplay(props) {
  return (
    <>
      <div id="libby-error">{props.error.toString()}</div>
      <div id="libby-error-stack">{props.error.stack}</div>
    </>
  );
}

export default ErrorDisplay;
