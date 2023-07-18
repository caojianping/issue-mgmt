/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-17 23:18:52
 */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const utils = require('./utils');
const envConfig = require('./env');
console.log('envConfig:', envConfig);

module.exports = {
  entry: {
    index: utils.resolvePath('src/index.ts'),
  },
  output: {
    path: utils.resolvePath('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less|css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    browsers: ['last 5 versions', '> 1%', 'maintained node versions', 'not dead'],
                  }),
                ],
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
