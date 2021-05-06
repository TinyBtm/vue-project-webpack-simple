const webpack = require('webpack');
const {merge} = require('webpack-merge');
const {resolve, getIp} = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackCommon = require('./webpack.common');
const ENV_DEV = process.env.NODE_ENV === 'development';

module.exports = merge(WebpackCommon, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: 'js/[name][contenthash].js',
		path: resolve('dist'),
		publicPath: ENV_DEV ? '/' : './'
	},
	devServer: {
		host: getIp(),
		port: 8088,
		open: true,
		hot: true,
		inline: true,
		hotOnly: false,
		noInfo: true,
		overlay: {
			warnings: true,
			errors: true
		},
		historyApiFallback: true
		// proxy: {
		// 	'/api': {
		// 		target: 'http://127.0.0.1:10600',
		// 		changeOrigin: true
		// 	}
		// }
	},
	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: false,
			__VUE_PROD_DEVTOOLS__: true,
			'proccess.env.NODE_ENV': 'development'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: resolve('public/index.html'),
			title: 'vue-simple',
			filename: 'index.html',
			inject: true,
			// favicon: resolve('public/favicon.ico')
			chunks: ['runtime', 'vendors', 'common', 'main']
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*', 'dist']
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name][contenthash].css',
			chunkFilename: 'css/[id][contenthash].css'
		})
	]
})