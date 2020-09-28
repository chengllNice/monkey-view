const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    runtimeCompiler: true,
    // 配置插件
    configureWebpack: {
        entry: path.resolve(__dirname, '../src/index.js'),
        resolve: {
            alias: {
                'monkey-ui': path.resolve(__dirname, '../'),
                'packages': path.resolve(__dirname, '../packages'),
                'examples': path.resolve(__dirname, '../examples'),
                'main': path.resolve(__dirname, '../src'),
            }
        },
        output: {
            filename: 'monkey1.min.js',
            library: 'monkey1',
            libraryTarget: 'umd',
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
            // @todo
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css)$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
};