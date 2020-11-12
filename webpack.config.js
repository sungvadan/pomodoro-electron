const webpack = require("webpack");
const path = require("path");

let config = {
    entry: ['./assets/js/app.js', './assets/js/setup.js'],
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./bundle-2.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
}

module.exports = config;