const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ProvidePlugin} = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output:{
        path: path.resolve(__dirname, 'build'),
        filename:'index.build,js'
    },
    module:{
        rules: [
            {
                test:/\.((s{0,1})css)$/,
                loaders: ['style-loader','css-loader','sass-loader',]
            },
            {
                test:/\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.(png|eot|ttf|woff|woff2|svg|gif|jpg|jpeg)$/,
                loader:'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new ProvidePlugin({
            React: 'react'
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        compress:true,
        port: 7000
    }
};
