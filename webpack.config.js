const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'client/src'),
  dist: path.join(__dirname, 'client/dist')
}

module.exports = {
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: [ 'style', 'css' ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: [ 'babel-loader' ],
        query: {
          presets: [ 'react', 'es2015' ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
  ]
}
