const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    'js/cms': path.resolve(__dirname, 'assets/js/app.js'),
    'scss/cms': path.resolve(__dirname, 'assets/scss/main.scss'),
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
            publicPath: 'imgs'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'cms': path.resolve(__dirname, 'assets/js/components/'),
      'views': path.resolve(__dirname, 'assets/js/views/'),
      'projectBase': path.resolve(__dirname, 'assets/js/components/base/projectBase/'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: "./dist"
  },
};