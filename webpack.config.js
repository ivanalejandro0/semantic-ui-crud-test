/* eslint-env node */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src');
var ASSETS_DIR = path.resolve(__dirname, 'assets');
var BUILD_DIR = path.resolve(__dirname, 'dist');

const isProduction = process.env.NODE_ENV == "production";

let entry = [ APP_DIR + '/index.jsx' ];
if (!isProduction) {
  entry.unshift(
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server'
  );
}


module.exports = {
  entry,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },

  resolve: {
    modules: [
      APP_DIR,
      ASSETS_DIR,
      BUILD_DIR,
      "node_modules"
    ],

    extensions: ['.js', '.jsx'],
  },

  module: {

    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: APP_DIR,
        exclude: /(node_modules)/,
        use: ['react-hot-loader', 'babel-loader'],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader']
      },

      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            }
          },
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader',
      },
    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Semantic UI - CRUD - test',
      path: isProduction ? "": "http://localhost:9000/",
      template: 'index.ejs',
      inject: false,
      output: {
        path: 'dist',
        filename: 'index.html'
      },
    })
  ]

}
