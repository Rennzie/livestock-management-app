const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env =>
  merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        filename: '[name].[contenthash].js',
        // chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },
      resolve: {
        extensions: ['.js']
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
            // exclude: /node_modules/
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
          { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
        })
        // new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
      ]
    }
  ]);
