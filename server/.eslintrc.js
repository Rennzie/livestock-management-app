module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import'],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'arrow-parens': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'func-names': 0
  }
};
