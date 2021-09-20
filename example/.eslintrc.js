const coreConfig = require('eslint-config-core-config-ui-eslint');

module.exports = {
  ...coreConfig,
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      },
    },
  },
};
