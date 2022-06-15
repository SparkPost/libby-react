import path from 'path';
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default defineConfig({
  input: {
    cli: path.resolve(__dirname, 'lib/index.js')
  },
  output: {
    dir: path.resolve(__dirname, 'dist'),
    entryFileNames: `[name].js`,
    chunkFileNames: 'chunks/dep-[hash].js',
    format: 'esm'
  },
  external: [
    'fs',
    'path',
    'url',
    'perf_hooks',
    ...Object.keys(pkg.dependencies)
  ],
  plugins: [nodeResolve()]
});
