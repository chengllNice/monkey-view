# 快速上手

本章节将介绍如何在项目中使用`monkey-view`

## 开始之前

必要的基础知识不可缺少，在开始之前有必要先了解以下知识点，这里我们假设您已经掌握以下内容：

- <a href="https://www.w3school.com.cn/js/index.asp" target="_blank">javascript</a>
- <a href="https://cn.vuejs.org/" target="_blank">vue.js</a>
- <a href="http://nodejs.cn/" target="_blank">node.js</a>
- <a href="https://www.webpackjs.com/" target="_blank">webpack</a>


## 引入 MonkeyView

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import App from './App.vue';
import MonkeyView from 'monkey-view';
import 'monkey-view/dist/styles/monkey-view.css';

Vue.use(MonkeyView);

new Vue({
    el: '#app',
    render: h => h(App)
});
```

## 按需引入

借助插件 babel-plugin-import可以实现按需加载组件，减少文件体积。首先安装，并在文件 .babelrc 中配置：

首先，安装 babel-plugin-component：

```shell
npm install babel-plugin-import --save-dev
```

然后，将 .babelrc 修改为：

```javascript
// .babelrc
{
  "plugins": [["import", {
    "libraryName": "monkey-view",
    "libraryDirectory": "src/packages"
  }]]
}
```

然后按照自己的需求引入组件，比如 Button 和 Select 组件：

```javascript
import { Button, Select } from 'monkey-view';
Vue.component('Button', Button);
Vue.component('Select', Select);
```

按需引用仍然需要导入样式，即在 main.js 或根组件执行 `import 'monkey-view/dist/styles/monkey-view.css'`;


## 全局配置

使用 `monkey-view` 时可以使用全局配置对象进行组件属性的全局配置。

组件优先使用`props`属性传递的属性值，如果未设置，再使用全局配置。

该全局配置对象介绍如下：

- size：该属性配置适用于组件 `Button` `List` `Tabs` `Input` `Select` `Cascader` `m-switch` `DatePicker` `TimePicker` `Form` `Table` `Tag`
- locale: 语言文件，默认中文。

示例

完整引入`monkey-view`

```javascript
import MonkeyView from 'monkey-view';
import locale from 'monkey-view/dist/locale/en-US'

Vue.use(MonkeyView, {
    size: 'small',
    locale,
});
```

按需引入`monkey-view`

```javascript
import Vue from 'vue';
import { locale, Page } from 'monkey-view';
import lang from 'monkey-view/dist/locale/en-US'

locale(lang);

Vue.prototype.$MONKEY = { size: 'small' };
Vue.component('Page', Page);
```

