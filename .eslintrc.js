module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			2,
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
