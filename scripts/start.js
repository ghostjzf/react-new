process.on("unhandledRejection", err => {
  throw err;
});

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("react-dev-utils/chalk");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { alias } = require("./config/path.js");

console.log(chalk.cyan("正在启动环境..."));

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: require.resolve("react-dev-utils/eslintFormatter"),
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../node_modules/antd/es/")
        ],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        include: path.resolve(__dirname, "../src"),
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(txt|htm)$/,
        include: path.resolve(__dirname, "../src"),
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
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    hot: true,
    compress: true,
    port: 9000,
    quiet: true,
    overlay: true // 编译出现错误时，将错误直接显示在页面上
  },
  resolve: {
    alias: alias,
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".json"]
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
    new HtmlWebpackPlugin({
      title: "Hello React",
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Local: ${0 ? "https" : "http"}://localhost:9000`,
          `On Your Network: ${0 ? "https" : "http"}://localhost:9000`
        ]
      },
      onErrors: null,
      clearConsole: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
