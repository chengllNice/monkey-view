# 定制主题

`monkey-view`提供一套默认的UI主题样式。可以在一定程度上进行自定义主题，以满足业务和场景的多样化需求。

`monkey-view`基于sass进行开发，默认以`.m-`作为命名前缀。

<div>
    <img width="49%" src="https://chengllnice.github.io/static/images/monkey-view/theme-2.png" />
    <img width="49%" src="https://chengllnice.github.io/static/images/monkey-view/theme-1.png" />
</div>

## 变量覆盖

如果你的项目使用`webpack`搭建，可以通过变量覆盖的方式修改主题。

首先在项目中新建一个`.scss`的样式文件，例如命名为`my-theme.scss`，并写入一下内容：

```shell
$--color-primary: #8c0776;

@import '~monkey-view/src/styles/index.scss';
```

把写好的文件在入口文件中引入，此时无需引入`monkey-view`编译好的css文件。

```javascript
import Vue from 'vue';
import MonkeyView from 'monkey-view';
import './my-theme.scss';

Vue.use(MonkeyView);
```
