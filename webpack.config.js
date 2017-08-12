'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');

const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { 
        presets: ['es2015', 'stage-0', {compact: false}],
    },
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    url: false,
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader?url=false', postcss, 'sass-loader'])
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

const glsl = {
  test: /\.glsl$/,
  loader: 'webpack-glsl-loader'
}

const config = {
  entry: {
    App: `${SRC_DIR}/App.js`
  },
  output: {
    path: BUILD_DIR,
    devtoolLineToLine: true,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      javascript, 
      styles,
      glsl
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

process.noDeprecation = true;

module.exports = config;
