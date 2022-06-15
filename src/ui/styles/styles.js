export const focusRing = `
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px white, 0 0 0 6px #1273e6;
  }
`;

export const buttonReset = `
  border: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  width: auto;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  ${focusRing}
`;
