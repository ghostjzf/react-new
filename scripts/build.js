process.on("unhandledRejection", err => {
  throw err;
});

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("react-dev-utils/chalk");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

console.log(chalk.cyan("正在打包..."));

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    vendor: ["react", "react-dom"],
    path: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(txt|htm)$/,
        loader: "raw-loader"
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "static/images/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: "single"
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      title: "Hello React",
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
