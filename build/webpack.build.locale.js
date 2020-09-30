const path = require('path');
const webpack = require('webpack');
const entry = require('./locale-entry');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
    mode: 'none',
    devtool: 'source-map',
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true
                },
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/locale'),
        publicPath: '/dist/locale/',
        filename: '[name].js',
        library: 'MONKEY/lang',
        libraryTarget: 'umd',
        libraryExport: 'lang.default',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        })
    ]
};
