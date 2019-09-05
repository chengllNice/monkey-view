const path = require('path');
// const markdownLoaderOptions = require('./markdown-loader/index')

// const mdLoaderOption = require('./md-loader/index');



module.exports = {
  runtimeCompiler: true,
  // 配置插件
  configureWebpack: {
    resolve: {
      alias: {
        'cl-ui': path.resolve(__dirname, './')
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
            // {
            //   loader: 'vue-markdown-loader/lib/markdown-compiler',
            //   options: mdLoaderOption
            // }
          ],
        },
      ]
    },
  },
};
