/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function config(env, options) {
  const isDevelopment = options.mode === 'development';
  const localIdentName = isDevelopment
    ? '[path][name]__[local]'
    : '[hash:base64]';

  const styleLoader = isDevelopment
    ? 'style-loader'
    : MiniCssExtractPlugin.loader;

  const target = isDevelopment ? 'web' : undefined;

  return {
    context: path.join(__dirname, 'src'),
    entry: path.join(__dirname, 'src', 'index.tsx'),
    mode: isDevelopment ? 'development' : 'production',
    target,
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.css$/,
          use: [styleLoader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.join(__dirname, 'src')],
                },
              },
            },
            'postcss-loader',
          ],
        },
        { test: /\.svg$/, loader: '@svgr/webpack' },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      fallback: {
        querystring: false,
      },
    },
    output: {
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'F1 Word Champions',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ],
  };
};
