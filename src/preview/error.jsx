import React from 'react';

function ErrorDisplay(props) {
  return (
    <>
      <button
        className="libby-error-button"
        type="button"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
      <button
        className="libby-error-button"
        type="button"
        onClick={() => props.error.resetErrorBoundary()}
      >
        Reset Error Boundary
      </button>
      <div id="libby-error-container">
        <div id="libby-error">
          <div>Something went wrong</div>
          <div>{props.error.toString()}</div>
        </div>
        <div id="libby-error-stack">
          <pre>{props.error.stack}</pre>
        </div>
      </div>
    </>
  );
}

export default ErrorDisplay;
