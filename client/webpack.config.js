/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects":
"only-multiline"} ] */

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  // externals: {
  //   'cheerio': 'window',
  //   'react/addons': true, // important!!
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': true
  // },
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './app/bundles/js/app.jsx',
  ],

  output: {
    filename: 'bundle.js',
    path: '../app/assets/webpack',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    })
  ],

  module: {
    loaders: [
      {
        test: require.resolve('react'),
        loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader',
          // 'eslint-loader'
        ],
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          // Fail only on errors
          failOnWarning: false,
          failOnError: true,

          // Disable/enable autofix
          fix: false,

          // Output to Jenkins compatible XML
          outputReport: {
            filePath: 'checkstyle.xml',
            formatter: require('eslint/lib/formatters/checkstyle'),
          },
        },
      },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
