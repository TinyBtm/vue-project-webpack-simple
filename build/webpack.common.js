const {resolve} = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: resolve('src/main.js'),
	resolve: {
		extensions: ['.vue', '.js', '.scss', '.css']
	},
	module: {
		rules: [
			//vue
			{test: /\.vue$/, loader: 'vue-loader'},
			//js
			{test: /\.js$/, include: resolve('src'), use: ['babel-loader']},
			//css|scss
			{
				test: /\.(c|sc)ss$/,
				use: [MiniCssExtractPlugin.loader, {
					loader: "css-loader", options: {
						importLoaders: 2
					}
				}, 'sass-loader']
			},
			{
				test: /\.(png|jpeg|gif|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							outputPath: 'images',
							name: '[name][contenthash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 50000,
							outputPath: 'fonts',
							name: '[name][contenthash].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
}