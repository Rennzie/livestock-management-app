const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Configs for merge
const baseConfig = require('./webpack.base.config');

const devConfig = env => {
  //   const { VERSION, PLATFORM } = env;
  return merge([
    {
      mode: 'development',
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
};

module.exports = env => {
  return merge(baseConfig(env), devConfig(env));
};
