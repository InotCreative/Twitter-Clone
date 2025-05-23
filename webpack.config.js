const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv').config();

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  },

  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true,
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    })
  ]
};
