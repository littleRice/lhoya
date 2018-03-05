const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const entrys = require('./config');

module.exports = {
  entry: entrys,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css|less$/,
        use:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  plugins: [
    //如果想要传入选项，你可以这样做：
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('[name].css');
      }
    })
  ]
};