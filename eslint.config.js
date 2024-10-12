const prettier = require('eslint-plugin-prettier');
const babelParser = require('@babel/eslint-parser'); // Import the parser directly

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: babelParser, // Use the imported parser directly
      parserOptions: {
        requireConfigFile: false, // Optional if you don't have a .babelrc
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      semi: ['warn', 'always'],
    },
  },
];
