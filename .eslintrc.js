module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-nested-ternary': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-key': 1,
    'react/no-children-prop': 1,
    'no-shadow': 1,
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
};
