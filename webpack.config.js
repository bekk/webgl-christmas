const webpack = require('webpack');
 
module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.glsl$/, use: 'webpack-glsl-loader'}
    ]
  },
  plugins: [
    
  ]
};