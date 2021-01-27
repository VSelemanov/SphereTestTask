module.exports = {
  extends: ['eslint:recommended', 'airbnb-base'],
  plugins: ['import'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    quotes: [2, 'single'],
    'max-len': ['warn', {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true,
    }],
    semi: [2, 'always'],
    'no-console': 'off',
  },
};
