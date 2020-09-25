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
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
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