module.exports = {
	// Use tabs instead of spaces for indentation
	useTabs: true,
	// Specify the number of tabs per indentation level
	tabWidth: 2,
	arrowParens: 'always',
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	// pnpm doesn't support plugin autoloading
	// https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation
	plugins: [require('prettier-plugin-tailwindcss')],
};
