const path = require('path');

module.exports = {
    runtimeCompiler: true,
    // 配置插件
    configureWebpack: {
        entry: path.resolve(__dirname, './examples/main.js'),
        resolve: {
            alias: {
                'monkey-ui': path.resolve(__dirname, './'),
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
                            loader: path.resolve(__dirname, './md-loader/index.js')
                        }
                    ],
                },
            ]
        },
        devServer: {
            host: '127.0.0.1',
        },
    },
};
