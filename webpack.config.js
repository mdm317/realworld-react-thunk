/* eslint-disable */
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports= {
    mode:"development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: "/",
        overlay: true,
        port: 3000,
        stats: "errors-only",
        historyApiFallback: true,
    },
    entry: "./src/index.tsx",
    resolve: {
        // import 를 상대경로로 할떄 절대 경로로 변환하는과정중
        //extensions 에 있는 확장자만 검사
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            },
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/, 
                loader: "ts-loader",
                exclude:/node-modules/
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: [
    new HtmlPlugin({
        template: "./public/index.html",
        templateParameters: {
        env: process.env.NODE_ENV === "production" ? "배포용" : "개발용",
        },
        minify:
        process.env.NODE_ENV === "production"
            ? {
                collapseWhitespace: true, //빈칸제거
                removeComments: true, //주석제거
            }
            : false,
    }),
    new CleanWebpackPlugin(),
    ],
};
