module.exports = {
	"arrowParens": "always",
	"bracketSpacing": true,
	"endOfLine": "lf",
	"htmlWhitespaceSensitivity": "css",
	"jsxBracketSameLine": false,
	"printWidth": 80,
	"proseWrap": "preserve",
	"jsxSingleQuote": true,
	"requirePragma": false,
	"semi": true,
	"singleQuote": true,
	"tabWidth": 4,
	"trailingComma": "all",
	"useTabs": true,
	"overrides": [
		{
			"files": "*.json",
			"options": {
				"printWidth": 200
			}
		}
	],
	plugins: [require('prettier-plugin-tailwindcss')],
}
