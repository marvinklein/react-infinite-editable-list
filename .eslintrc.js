module.exports = {
  extends: [ 'plugin:react/recommended', 'marvinklein' ],
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: { version: 'detect' }
  }
};
