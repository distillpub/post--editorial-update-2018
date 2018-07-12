const path = require("path");
const webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    "index": "./components/index.js",
  },
  resolve: {
    extensions: [ ".js", ".html" ]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        loader: "svelte-loader",
        options: {
          cascade: true,
          store: true,
          hydratable: false
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'static/' }])
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    overlay: true,
    stats: "minimal",
    contentBase:  __dirname + "/public"
  },
  stats: {
    maxModules: 50,
    modulesSort: "!size",
    excludeModules: ""
  },
  devtool: "inline-source-map"
};



if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new Uglify({
      parallel: true,
      uglifyOptions: {
        ecma: 6
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
