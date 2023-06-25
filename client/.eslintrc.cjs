module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['jest.config.js', 'babel.config.js', '**/*.test.js'],
  overrides: [
    {
      files: ['**/*.test.js'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest/all',
      ],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint'],

  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'no-undef': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
