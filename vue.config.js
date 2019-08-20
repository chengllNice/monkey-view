
const path = require('path');

module.exports = {
  // 配置插件
  configureWebpack: {
    resolve: {
      alias: {
        'cl-ui': path.resolve(__dirname, './')
      }
    },
  },
};
