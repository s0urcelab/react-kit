const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: ["react-hot-loader/patch", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 排除npm包
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'], // 顺序右到左，先处理高级或特殊语法
          plugins: [
            ["import", {
              "libraryName": "rcom",
              // "libraryDirectory": "src/reactComponents",
              "camel2DashComponentName": false,  // default: true
              "customName": (name) => {
                return `@/reactComponents/${name}` // 核心配置 根据你自己的组件目录配置
              },
            }],
            "react-hot-loader/babel", // react 热更新
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-async-to-generator", // async/await
            "@babel/plugin-proposal-object-rest-spread", // 对象扩展运算符
            ["@babel/plugin-proposal-decorators", {legacy: true}], // 装饰器
            "@babel/plugin-proposal-function-bind", // 双冒号bind
            "@babel/plugin-proposal-nullish-coalescing-operator", // 双问号默认值
            "@babel/plugin-proposal-optional-chaining", // 单问号链式取值
            "@babel/plugin-transform-react-constant-elements", // 静态组件优化
            "@babel/plugin-transform-react-jsx-source", // __source组件定位属性
            "@babel/plugin-transform-react-jsx", // <></>fragment
            "@babel/plugin-proposal-class-properties",
            "babel-plugin-styled-components", // styled-component插件
          ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@assets': path.resolve(__dirname, 'assets/'),
      '@': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空dist
    new HtmlWebpackPlugin({
      // filename: path.join(__dirname, 'entry.html'), // 生成的html(绝对路径：可用于生成到根目录)
      filename: 'index.html', // 生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
      template: './public/index.temp.html' // 以哪个文件作为模板，不指定的话用默认的空模板
    }),
    new webpack.HotModuleReplacementPlugin() // 热更新
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public/"),
    port: 5555,
    publicPath: "/",
    proxy: {
      "/api": {
        "target": "http://localhost:7001/",
        "changeOrigin": true,
        "secure": true,
        "pathRewrite": {
          "^/api": ""
        }
      }
    },
  },
};
