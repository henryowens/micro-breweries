import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

const config: WebpackConfiguration & { devServer?: DevServerConfiguration } = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, "dist"),
    publicPath: "/public",
  },
  devServer: {
    proxy: {
      "/api/breweries": {
        target: "https://download.oberon.nl",
        pathRewrite: { "/api/breweries": "" },
        changeOrigin: true,
      },
      "/api/v1/*": {
        target: "https://app.zipcodebase.com",
        changeOrigin: true,
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};

export default config;
