const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


//loaders
const htmlLoader = require('./webpack-modules/loaders/html.js');
const babelLoader = require('./webpack-modules/loaders/babel.js');
const postCssLoader = require('./webpack-modules/loaders/postcss-prod.js');
const typeScriptLoader = require('./webpack-modules/loaders/typescript.js');

module.exports = {
    mode: "development",
    entry: './src/main.tsx',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false, // path.join(__dirname, 'static-files-folder'),
        compress: true,
        port: 9000
    },
     resolve: {
         extensions: ['.ts', '.tsx', '.js', '.scss']
    //     alias: {
    //         components: path.resolve(__dirname, 'src/components')
    //     }
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
            filename: '[name].css'
        })
    ]
};
