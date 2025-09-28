const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  // make paths resolve relative to mfe-host folder
  context: path.resolve(__dirname), // <-- important
  entry: "./src/components/Button.tsx", // now resolves to mfe-host/src/index.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: { port: 9001 },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "mfe_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteButton": "./src/components/Button"
      }
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
