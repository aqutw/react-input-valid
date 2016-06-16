const webpack = require('webpack')
const pkg = require('./package.json')

const webpackEnv = process.env.WEBPACK
const IS_DEMO = webpackEnv === 'demo'
const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = !webpackEnv && !IS_PROD

const libName = 'index'

module.exports = {
  entry: {
    [libName]: IS_PROD
      ? ['./src']
      : ['babel-polyfill', './demo'],
  },
  output: {
    path: IS_PROD ? `${__dirname}/dist` : `${__dirname}/demo`,
    filename: '[name].js',
    library: 'ReactInputValid',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }
    ]
  },
  resolve: {
    alias: IS_DEMO ? {
      'react': 'react/dist/react.min.js',
      'react-dom': 'react-dom/dist/react-dom.min.js',
    } : {}
  },
  externals: IS_PROD ? {/*TODO*/} : {},
  watch: IS_DEV,
  devtool: IS_DEV ? 'eval' : '',
}
