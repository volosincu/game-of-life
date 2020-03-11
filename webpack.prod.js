const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//loaders
const htmlLoader = require('./webpack-modules/loaders/html.js');
const babelLoader = require('./webpack-modules/loaders/babel.js');
const postCssLoader = require('./webpack-modules/loaders/postcss-prod.js');
const typeScriptLoader = require('./webpack-modules/loaders/typescript.js');

module.exports = {
    mode: "production",
    entry: './src/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            {...typeScriptLoader},
            {...babelLoader},
            {...htmlLoader},
            {...postCssLoader}
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ]
};
