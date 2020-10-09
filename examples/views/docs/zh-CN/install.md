# 安装



## npm 安装

推荐使用`npm`的方式进行安装，有更好丰富的生态圈和工具链，这样可以更好和 <a href="https://webpack.js.org/" target="_blank">webpack</a>进行配合。

```shell
npm install monkey-view --save
```

如果是通过 npm 安装，并希望配合 webpack 使用，请忽略 CDN 方式，继续阅读下一章节：[快速上手](#/zh-CN/guide/quick-start)。


## CDN 引入

目前可以通过 <a href="https://unpkg.com/monkey-view/" target="_blank">unpkg.com/monkey-view</a> 获取到`monkey-view`最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="//unpkg.com/monkey-view/dist/styles/monkey-view.css">
<!-- import monkey-view -->
<script src="//unpkg.com/monkey-view/dist/monkey-view.min.js"></script>
```

### 示例

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>MonkeyView example</title>
        <link rel="stylesheet" type="text/css" href="http://unpkg.com/monkey-view/dist/styles/monkey-view.css">
        <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
        <script type="text/javascript" src="http://unpkg.com/monkey-view/dist/monkey-view.min.js"></script>
    </head>
    <body>
    <div id="app">
        <m-button @click="visible = true">Visible Modal</m-button>
        <Modal v-model="visible" title="Welcome">Hello World</Modal>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                visible: false
            }
        })
      </script>
    </body>
</html>
```
