const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve, getIp, createNotifierCallback } = require("./utils");
const WebpackCommon = require("./webpack.common");

const ENV_DEV = process.env.NODE_ENV === "development";
module.exports = () => {
  return new Promise((resFn, rejFn) => {
    portfinder.getPort((err, port) => {
      if (err) {
        rejFn(err);
      } else {
        const DEV_CONFIG = merge(WebpackCommon, {
          mode: "development",
          devtool: "inline-source-map",
          output: {
            filename: "js/[name][contenthash].js",
            path: resolve("dist"),
            publicPath: ENV_DEV ? "/" : "./",
          },
          devServer: {
            host: getIp(), // 开发服务器网络服务ip地址
            port, // 开发服务器端口
            // open: true,// 编译后是否自动打开浏览器
            hot: true, // 配合hmr插件热刷新
            inline: true,
            noInfo: true, // 关闭启动服务时的控制台输出
            clientLogLevel: "silent", // 关闭过于冗杂的日志输出
            overlay: {
              warnings: true,
              errors: true,
            },
            historyApiFallback: true,
            proxy: {
              "/api": {
                target: "http://192.168.0.211:3000",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
              },
            },
          },
          plugins: [
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: false,
              __VUE_PROD_DEVTOOLS__: true,
              "proccess.env.NODE_ENV": "development",
            }),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
              template: resolve("public/index.html"),
              title: "vue-simple",
              filename: "index.html",
              inject: true,
              // favicon: resolve('public/favicon.ico')
              chunks: ["runtime", "vendors", "common", "main"],
            }),
            new CleanWebpackPlugin({
              cleanOnceBeforeBuildPatterns: ["**/*", "dist"],
            }),
            new MiniCssExtractPlugin({
              filename: "css/[name][contenthash].css",
              chunkFilename: "css/[id][contenthash].css",
            }),
          ],
        });
        // 本地开发服务器
        if (ENV_DEV)
          DEV_CONFIG.plugins.push(
            new FriendlyErrorsWebpackPlugin({
              compilationSuccessInfo: {
                quiet: true,
                messages: [
                  "Your application is running at",
                  `Network  http://${getIp()}:${port}`,
                ],
              },
              onErrors: createNotifierCallback,
            })
          );
        resFn(DEV_CONFIG);
      }
    });
  });
};
