module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    camelcase: 'off',
    'react/prefer-stateless-function': 'off',
    'react/static-property-placement': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/alt-text': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'react/sort-comp': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-return-assign': 'off',
    'max-classes-per-file': 'off',
    'react/forbid-prop-types': 'off'
  },
};
