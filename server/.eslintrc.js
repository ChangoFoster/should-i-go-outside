module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-case-declarations': 0,
  },
}
