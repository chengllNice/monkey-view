const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.build.base.js');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    mode: 'none',
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'monkey-view.js',
        library: 'MONKEY',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
    // plugins: [
    //     // @todo
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': '"production"'
    //     })
    // ]
});
