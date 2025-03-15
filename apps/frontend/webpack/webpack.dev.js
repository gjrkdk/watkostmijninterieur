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
      "process.env.API_URL_DEV": JSON.stringify(process.env.API_URL_DEV),
    }),
    new Dotenv({ path: path.resolve(__dirname, "../.env") }),
  ],
};
