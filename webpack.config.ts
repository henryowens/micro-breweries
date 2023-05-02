import { resolve } from "path";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration as WebpackConfiguration, optimize } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

const config: WebpackConfiguration & { devServer?: DevServerConfiguration } = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
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
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",

      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          enforce: true,
          priority: 1,
          minSize: 30000,
        },
        default: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          priority: -1,
          reuseExistingChunk: true,
        },
        fallback: {
          maxSize: 100000,
          minSize: 20000,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
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
    new optimize.SplitChunksPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./public/*", to: "./" }],
    }),
  ],
};

export default config;
