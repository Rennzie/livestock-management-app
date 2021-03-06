const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Configs for merge
const baseConfig = require('./webpack.base.config');

const prodConfiguration = () =>
  merge([
    {
      mode: 'production',
      output: {
        filename: '[name].[contenthash].js',
        // chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'babel';
          },
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        },
        minimizer: [new TerserPlugin()]
      },
      module: {
        rules: [
          { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
          { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new CompressionPlugin(),
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        // new Visualizer({ filename: './statistics.html' })
        // new BundleAnalyzerPlugin()
      ]
    }
  ]);

module.exports = env => merge(baseConfig(env), prodConfiguration(env));
