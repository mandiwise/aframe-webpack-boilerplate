const webpack = require('webpack');
const path = require('path');
const resolve = require('path').resolve;
const src = resolve(__dirname, 'src');
const build = resolve(__dirname, 'build');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    index: './index.html'
  },

  output: {
    path: build,
    filename: '[name].bundle.js',
    publicPath: '/build/'
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc',
        },
        include: [src],
        exclude: [/node_modules/]
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: [src],
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    stats: 'errors-only',
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true
    }),

    // new HtmlWebpackPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
      filename: 'vendor.bundle.js'
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        unused: true,
        dead_code: true,
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),

    new OpenBrowserPlugin({
      url: 'http://localhost:3000/'
    }),
  ]

}