import React from 'react';
import App from './App';
import { renderRoot } from '../utils/root';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; }
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

renderRoot(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
