/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ],
                        sass: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    postLoaders: {
                        html: 'babel-loader?sourceMap'
                    },
                    sourceMap: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            'monkey-ui': resolve('/'),
            packages: resolve('packages'),
            examples: resolve('examples'),
            main: resolve('src')
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: `'${pkg.version}'`,
                NODE_ENV: '"production"'
            }
        })
    ]
};
