const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    port: `3000`,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("development"),
    }),
    new Dotenv({ path: path.resolve(__dirname, ".env") }),
  ],
};
