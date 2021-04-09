const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
module.exports = {
  entry: {
    "js/cms": path.resolve(__dirname, "assets/js/app.js"),
    "css/main": path.resolve(__dirname, "assets/scss/main.scss"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
            publicPath: "imgs"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: false
              },
            },
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "cms": path.resolve(__dirname, "assets/js/components/"),
      "views": path.resolve(__dirname, "assets/js/views/"),
      "loginBase": path.resolve(__dirname, "assets/js/components/base/loginBase/"),
      "homeBase": path.resolve(__dirname, "assets/js/components/base/homeBase/"),
      "projectBase": path.resolve(__dirname, "assets/js/components/base/projectBase/"),
      "profileBase": path.resolve(__dirname, "assets/js/components/base/profileBase/"),
      "employeeBase": path.resolve(__dirname, "assets/js/components/base/employeeBase/"),
      "statisticBase": path.resolve(__dirname, "assets/js/components/base/statisticBase/")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
};
