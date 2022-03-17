import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import babel from '@rollup/plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

const packages = require('./package.json')

const ENV = process.env.NODE_ENV

const fileName = `isNetworkConfig.${ENV === 'production' ? 'min.js': 'js'}`

const config = {
  input: './src/index.js',
  output: {
    file: `dist/${fileName}`,
    format: 'umd',
    name: 'OneSocket'
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-proposal-class-properties']
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    (ENV === 'production' && uglify())
  ]
}

export default config
