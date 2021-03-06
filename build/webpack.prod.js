const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require("./utils");
const WebpackCommon = require("./webpack.common");

module.exports = merge(WebpackCommon, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name][contenthash].js",
    path: resolve("prod"),
    publicPath: "./",
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    usedExports: true,
    minimize: true,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          chunks: "initial",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // reuseExistingChunk: true
        },
        common: {
          name: "common",
          chunks: "initial",
          minChunks: 2,
          priority: -20,
          // reuseExistingChunk: true
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      "proccess.env.NODE_ENV": "production",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "prod"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name][contenthash].css",
      chunkFilename: "css/[id][contenthash].css",
    }),
  ],
});
