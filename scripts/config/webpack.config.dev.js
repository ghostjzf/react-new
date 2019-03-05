const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../../src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../../dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello React",
      template: path.resolve(__dirname, "../../public/index.html")
    })
  ]
};
