const styles = `
#libby-error, #libby-error-stack, .libby-error-button {
  color: #2c353d;
  line-height: 1.5em;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace !important;
}
#libby-error {
  font-size: 14px;
  font-weight: bold;
}
#libby-error-stack {
  margin-top: 1rem;
  font-size: 12px;    
}
#libby-error-container {
  padding: 1rem;
  border-radius: 5px;
  background: #ebf0f5;
  overflow: auto;
}
.libby-error-button {
  border: none;
  border-radius: 3px;
  margin: 0 1rem 1rem 0;
  padding: 0.5rem 1rem;
  width: auto;
  overflow: visible;
  background: #ebf0f5;
  color: #2c353d;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.15s;
}
.libby-error-button:hover {
  background: #d9e0e6;
}
`;

function ErrorDisplay(props) {
  return (
    <>
      <style>{styles}</style>
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
