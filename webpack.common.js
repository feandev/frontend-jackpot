const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        // if a file ends with html
        test: /\.html$/,
        // use template html, import all assets
        use: {
          loader: "html-loader",
          options: {
            esModule: false
          }
        }
      },
      {
        // any of these will match
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // specify filename and extension, make a copy and move it
            name: "[name].[chunkhash].[ext]",
            // copy to new folder in dist
            outputPath: "img",
            esModule: false
          }
        }
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
}