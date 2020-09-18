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
	optimization: {
		minimizer: [new TerserPlugin({sourceMap: false})]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};