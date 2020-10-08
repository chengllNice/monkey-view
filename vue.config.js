const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/monkey-view' : '/',
    runtimeCompiler: true,
    assetsDir: 'static',
    // 配置插件
    configureWebpack: {
        entry: path.resolve(__dirname, './examples/main.js'),
        resolve: {
            alias: {
                'monkey-view': path.resolve(__dirname, './'),
                'packages': path.resolve(__dirname, './packages'),
                'examples': path.resolve(__dirname, './examples'),
                'main': path.resolve(__dirname, './src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'vue-loader',
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false
                                }
                            }
                        },
                        {
                            loader: path.resolve(__dirname, './build/md-loader/index.js')
                        }
                    ],
                }
            ]
        },
        devServer: {
            host: '127.0.0.1',
        },
    },
};
