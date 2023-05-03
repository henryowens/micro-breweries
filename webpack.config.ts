import { resolve } from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
    chunkFilename: "[id].[chunkhash].js",
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    new Dotenv(),
    new optimize.SplitChunksPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: "" }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: { ignore: ["**/index.html"] },
        },
      ],
    }),
  ],
};

export default config;
