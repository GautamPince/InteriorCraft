// ESLint config in CommonJS format expected by ESLint v9+ when using flat config
module.exports = {
	languageOptions: {
		ecmaVersion: 2021,
		sourceType: 'module'
	},
	linterOptions: {
		reportUnusedDisableDirectives: true
	},
	rules: {
		'no-unused-vars': ['warn'],
		'react/prop-types': 'off'
	},
	ignores: ['dist/', 'node_modules/']
};
