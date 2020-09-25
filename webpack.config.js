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
			// Regular css files
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
		
			// Transforming SCSS file into CSS string
			{
				test: /\.s[ca]ss$/,
				use: [
					'raw-loader',
					{
						loader: 'sass-loader'
					}
				]
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