const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  target: "web",
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
});
