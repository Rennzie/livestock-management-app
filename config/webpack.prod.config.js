const merge = require('webpack-merge');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

// Configs for merge
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
  return merge([
    {
      mode: 'production',
      optimization: {
        runtimeChunk: 'single', // splitChunks: {
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name: 'vendors',
        //       chunks: 'all'
        //     }
        //   }
        // },
        minimizer: [new UglifyJsPlugin()]
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
        new Visualizer({ filename: './statistics.html' })
      ]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
