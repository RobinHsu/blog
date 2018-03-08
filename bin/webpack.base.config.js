const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const base = path.join(__dirname, '..');
const babelOptions = {
  presets: ["env", ["es2015", {modules: false}]],
  plugins: ["transform-runtime"]
}

module.exports = {
  entry: {
    main: `${base}/src/views/index.tsx`
  },
  output: {
    path: `${base}/www/static`,
    filename: 'js/[name].js',
    publicPath: '/static/',
    chunkFilename: 'js/[name].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelOptions
      }, {
        loader: 'ts-loader'
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelOptions
      }]
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            precision: 8
          }
        }, {
          loader: 'postcss-loader'
        }]
      })
    }, {
      test: /\.((woff2?svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|eot|ttf)$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.(jpe?g|png|gif|ico)$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'img/[name].[hash:8].[ext]'
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new AssetsPlugin({
      path: `${base}/runtime/`
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
