/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 11:22:02
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin()],
  devServer: {
    contentBase: utils.resolvePath('dist'),
    port: 9999,
    hot: true,
    open: true,
    publicPath: '/',
  },
  performance: { hints: false },
});
