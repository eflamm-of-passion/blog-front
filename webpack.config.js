const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new RemovePlugin({
			before: {
				include: [
					'./dist'
				]
			}
		}),
		new HtmlWebpackPlugin({
			title: 'Eflamm - blog',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.s[ca]ss$/,
				use: [
					'raw-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: `
							@import "./src/styles/_variables.scss";
							@import "./src/styles/_mixins.scss";
						  `
						}
					}
				]
			}
		],
	},
	optimization: {
		minimizer: [new TerserPlugin({sourceMap: false})]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};