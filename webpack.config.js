const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
            main: './src/index.js',
    },
    output: {
            path: path.resolve(__dirname, 'build')
    },
    
    module: {
        rules: [
        {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true
            }
        },
        {
            test: /\.s?css$/,
            loader: [
                MiniCssExtractPlugin.loader,
                'css-loader?url=false',
                'sass-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.pug',
		}),
        
        new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css'
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
		overlay: true,
    },
};