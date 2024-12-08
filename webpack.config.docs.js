/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base.js')

const DIR_DOCS = path.resolve(__dirname, 'docs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.png',
      template: './src/index_docs.html',
      title: 'AP Accounts',
      publicPath: '/ap-games-dominion'
    }),
    new webpack.EnvironmentPlugin({
      AP_GAMES_DOMINION_PUBLIC: '/ap-games-dominion',
      AP_GAMES_DOMINION_ENVIRONMENT: 'github',
    }),
  ]
})
