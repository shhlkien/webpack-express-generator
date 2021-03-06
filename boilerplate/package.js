module.exports = (name) => ({
  name,
  'version': '1.0.0',
  'description': '',
  'main': 'index.js',
  'scripts': {
    'dev': 'cross-env NODE_ENV=development nodemon index.js',
    'start': 'cross-env NODE_ENV=production node index.js',
  },
  'dependencies': {
    'dotenv': 'latest',
    'express': 'latest',
    'morgan': 'latest',
  },
  'devDependencies': {
    'clean-webpack-plugin': 'latest',
    'cross-env': 'latest',
    'css-loader': 'latest',
    'css-minimizer-webpack-plugin': 'latest',
    'mini-css-extract-plugin': 'latest',
    'nodemon': 'latest',
    'webpack': 'latest',
    'webpack-dev-middleware': 'latest',
    'webpack-merge': 'latest',
  },
  'nodemonConfig': {
    'ignore': [
      'node_modules/',
      'client/src/',
      'client/assets/',
    ],
  },
});