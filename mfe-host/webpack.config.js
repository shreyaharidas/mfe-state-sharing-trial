// mfe-host/webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;


module.exports = {
  mode: "development",
  // make paths resolve relative to mfe-host folder
  context: path.resolve(__dirname), // <-- important
  entry: "./src/index.tsx", // now resolves to mfe-host/src/index.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // ...other output settings
  },
  devServer: { port: 9000 },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // now resolves to mfe-host/public/index.html
    }),
    new ModuleFederationPlugin({
      remotes: {
        mfe_remote: "mfe_remote@http://localhost:9001/remoteEntry.js",
      },
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      // TypeScript loader
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // set true if using ForkTsChecker for faster builds
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader' injects styles into DOM via <style>
          "style-loader",
          // 'css-loader' resolves @import and url()
          "css-loader",
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: ["source-map-loader"],
      },
    ],
  },
};
