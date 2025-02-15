const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "path": false,//require.resolve("path-browserify"),
            "os": false,//require.resolve("os-browserify/browser"),
            "crypto": false,//require.resolve("crypto-browserify"),
            "process": require.resolve("process/browser"),
            //"buffer": require.resolve("buffer"),
            //"stream": require.resolve("stream-browserify"),
            //"vm": require.resolve("vm-browserify"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '/public/index.html'
        }),
        /*new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),*/
        new Dotenv()
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        hot: true,
        port: 9006,
        compress: true,
    }
}