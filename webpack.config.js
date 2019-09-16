const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = [
  {
    mode: 'production',
    entry: './source/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [ 'babel-loader' ]
        }
      ]
    },
    externals: {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }
    }
  }, {
    mode: 'development',
    entry: './examples/src/index.js',
    output: {
      path: path.resolve(__dirname, 'examples/dist'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [ 'babel-loader' ]
        }
      ]
    },
    resolve: {
      alias: {
        'react-infinite-editable-list': path.resolve(__dirname, 'dist/index.js')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({ title: 'Basic Example' }),
      new HtmlWebpackRootPlugin()
    ]
  }
];
