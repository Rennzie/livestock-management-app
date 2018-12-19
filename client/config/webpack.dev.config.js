const path = require('path');
const merge = require('webpack-merge');

// Configs for merge
const baseConfig = require('./webpack.base.config');

const devConfig = () =>
  //   const { VERSION, PLATFORM } = env;
  merge([
    {
      mode: 'development',
      output: {
        // filename: '[name].[contenthash].js',
        chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
      devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000,
        open: true,
        proxy: {
          '/api': {
            target: 'http://localhost:4000',
            secure: false
          }
        }
      }
    }
  ]);
module.exports = env => merge(baseConfig(env), devConfig(env));
