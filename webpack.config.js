const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve(__dirname, './source'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  devServer: {
    contentBase: './dist', 
    historyApiFallback: true,
    inline: true,
    progress: true,
    hot: true,
    port:8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
}