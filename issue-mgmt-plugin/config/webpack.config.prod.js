/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 11:22:03
 */
const { merge } = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "inline-source-map",
  // plugins: [new UglifyJsPlugin()],
});
