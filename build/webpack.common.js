const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { resolve } = require("./utils");

module.exports = {
  entry: resolve("src/main.js"),
  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      // vue
      { test: /\.vue$/, loader: "vue-loader" },
      // js
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        // 指定检查的目录
        include: resolve("src"),
        // eslint检查报告的格式规范
        options: {
          fix: true,
          emitWarning: true,
        },
      },
      // css|scss
      {
        test: /\.(c|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpeg|gif|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              outputPath: "images",
              name: "[name][contenthash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              outputPath: "fonts",
              name: "[name][contenthash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
