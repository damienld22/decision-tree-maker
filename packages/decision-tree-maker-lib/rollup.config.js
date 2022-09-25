import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postCSS from 'rollup-plugin-postcss';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs',
    },
    {
      file: './lib/esm/index.js',
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    nodePolyfills(),
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
    postCSS({
      plugins: [require('autoprefixer')],
    }),
  ],
  onwarn: function (warning, warn) {
    // Ignore d3-transition circular dependency warning
    if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.importer.includes('/node_modules/d3'))
      return;
    warn(warning);
  },
};
