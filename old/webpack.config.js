const path = require("path");
const outputDir = path.resolve(__dirname, "dist/js/");
module.exports = {
  devtool: "eval-source-map",
  entry: path.resolve(__dirname, "src/js/main.js"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "58",
                    ie: "11"
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  output: {
    path: outputDir,
    filename: "main.js"
  }
};