module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y', 'import'],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    // 'comma-dangle': 0,
    'object-curly-newline': 0,
    'arrow-parens': 0,
    'no-underscore-dangle': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack-common-config.js'
      }
    }
  }
};
