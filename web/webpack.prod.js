const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  target: "browserslist",
  mode: "production",
  devtool: "cheap-source-map",
});
