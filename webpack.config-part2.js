const webpack = require('webpack');
 
module.exports = {
  entry: './src/part2/index.js',
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