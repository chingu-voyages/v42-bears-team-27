module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'next',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // prefer named arrow-function components
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    // airbnb is using .jsx
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // Great for raising awareness; however, sometimes not needed
    // if data is never expected to change (i.e. non-state data)
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    // use ES6+ deconstructed inner props instead of defaultProps
    'react/require-default-props': 'off',
    'react/sort-prop-types': 'error',
    'react/jsx-props-no-spreading': 'warn',
    // enforces react hook rules
    'react-hooks/rules-of-hooks': 'error',

    // rule may produce incorrect errors
    '@typescript-eslint/indent': 'warn',
    indent: 'off',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/dot-notation': 'off',
    'dot-notation': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/no-implied-eval': 'off',
    'no-implied-eval': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/no-throw-literal': 'off',
    'no-throw-literal': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/return-await': 'off',
    'no-return-await': 'error',
  },
};
