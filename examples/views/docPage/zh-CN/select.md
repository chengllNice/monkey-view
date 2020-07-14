# Select 选择框

表单组件。使用下拉菜单展示选项内容。模拟原生选择器。支持单选、多选、搜索。

## 代码示例


:::demo 基础用法

可以使用v-model实现双向数据绑定。默认宽度100%。使用方式有两种，可以自己实现slot模式的，也可以传入数据 `option`内部自动实现。单选是 `value`接受字符串和数字类型的数据。组件会自动根据option的数据选中指定的value数据。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <h4>slot模式</h4>
            <cl-select v-model="valueBase">
                <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</cl-option>
            </cl-select>
        </cl-col>
        <cl-col>
            <h4>option模式</h4>
            <cl-select v-model="valueBase1" :option="valueBaseOption"></cl-select>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueBase: '',
          valueBase1: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 尺寸

设置 `size`属性可以控制尺寸大小，可选值 `small` `large`或者不设置。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-select v-model="valueSizeSmall" :option="valueBaseOption" size="small"></cl-select>
        </cl-col>
        <cl-col>
            <cl-select v-model="valueSizeDefault" :option="valueBaseOption"></cl-select>
        </cl-col>
        <cl-col>
            <cl-select v-model="valueSizeLarge" :option="valueBaseOption" size="large"></cl-select>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueSizeSmall: '',
          valueSizeDefault: '',
          valueSizeLarge: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```

:::


:::demo 禁用

设置 `disabled`属性可以实现禁用。单独给 `option`设置 `disabled`可以实现某项的禁用。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-select v-model="valueDisabled" :option="valueBaseOption" disabled></cl-select>
        </cl-col>
        <cl-col>
            <cl-select v-model="valueDisabled1" :option="valueBaseOption"></cl-select>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueDisabled: '',
          valueDisabled1: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
              disabled: true,     
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 可清空

设置 `clearable`属性可以实现选中值之后点击清空按钮清空选中项。仅用于单选模式。

```html
<template>
    <cl-select v-model="valueClearable" :option="valueBaseOption" clearable></cl-select>
</template>
<script>
    export default {
      data(){
        return {
          valueClearable: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
              disabled: true,
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ],
        }
      }
    }
</script>
```

:::


:::demo 分组

使用 `option-group`组件可使用分组模式。同时接受 `option`数据格式为 `[{label: 'group-label', option: [{label: 'option-label', value: 'option-value', disabled: true}]}]`的数据实现分组。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <h4>slot模式</h4>
            <cl-select v-model="valueGroup1">
                <cl-option-group v-for="(groupItem, groupIndex) in GroupOption" :key="groupIndex" :label="groupItem.label">
                    <cl-option v-for="item in groupItem.option" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
                </cl-option-group>
            </cl-select>
        </cl-col>
        <cl-col>
            <h4>option模式</h4>
            <cl-select v-model="valueGroup2" :option="GroupOption"></cl-select>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueGroup1: '',
          valueGroup2: '',
          GroupOption: [
            {
              label: 'group1',
              option: [
                {
                  label: 'Fruit',
                  value: 'fruit',
                },
                {
                  label: 'Apple',
                  value: 'apple',
                  disabled: true,
                },
                {
                  label: 'Banana',
                  value: 'banana',
                },
              ]
            },
            {
              label: 'group2',
              option: [
                {
                  label: 'Orange',
                  value: 'orange',
                },
                {
                  label: 'Pear',
                  value: 'pear',
                },
                {
                  label: 'Peach',
                  value: 'peach',
                },
              ]
            },
          ]
        }
      }
    }
</script>
```

:::


:::demo 自定义模板

自定义模板不支持 `option`数据模式，需要使用 `slot`数据模式自定义实现。此时必须传 `label`属性用于选择时展示被选项。

```html
<template>
    <cl-select v-model="valueModel">
        <cl-option v-for="item in valueModelOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled">
            <i :class="item.icon" style="margin-right: 10px;"></i>
            <span>{{item.label}}</span>
        </cl-option>
    </cl-select>
</template>
<script>
    export default {
      data(){
        return {
          valueModel: '',
          valueModelOption: [
            {
              icon: 'cl-icon-home',
              label: 'Fruit',
              value: 'fruit',
            },
            {
              icon: 'cl-icon-star',
              label: 'Apple',
              value: 'apple',
              disabled: true,
            },
            {
              icon: 'cl-icon-button',
              label: 'Banana',
              value: 'banana',
            },
            {
              icon: 'cl-icon-sound',
              label: 'Orange',
              value: 'orange',
            },
            {
              icon: 'cl-icon-setting',
              label: 'Pear',
              value: 'pear',
            },
            {
              icon: 'cl-icon-user',
              label: 'Peach',
              value: 'peach',
            },
          ],
        }
      }
    }
</script>
```
:::


:::demo 多选

设置 `multiple`属性实现多选。多选模式下 `value`类型为数组格式，返回值也为数组格式。

```html
<template>
    <p>{{valueMultiple}}</p>
    <cl-select v-model="valueMultiple" multiple>
        <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
    </cl-select>
</template>
<script>
    export default {
      data(){
        return {
          valueMultiple: [],
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 可搜索

设置 `filterable`属性实现可搜索模式，在option数据中搜索。单选多选都支持搜索模式。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <h4>单选搜索</h4>
            <cl-select v-model="valueSearch" filterable>
                <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
            </cl-select>
        </cl-col>
        <cl-col>
            <h4>多选搜索</h4>
            <cl-select v-model="valueSearchMultiple" multiple filterable>
                <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
            </cl-select>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueSearch: '',
          valueSearchMultiple: [],
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 远程搜索

同时设置 `filterable` `remote` `loading`属性实现远程搜索模式，其中 `loading`属性用于展示加载中状态，emit方法`remote-change`在搜索值发生改变时触发。返回搜索值。

```html
<template>
    <cl-select v-model="valueRemoteSearch" filterable remote :loading="remoteLoading" @remote-change="handlerChangeRemote">
        <cl-option v-for="item in valueRemoteOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
    </cl-select>
</template>
<script>
    export default {
      data(){
        return {
          valueRemoteSearch: '',
          remoteLoading: false,
          valueRemoteOption: [],
          valueRemoteAllOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
              disabled: true,
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ],
        }
      },
      methods: {
        handlerChangeRemote(value){
          this.valueRemoteOption = [];
          this.remoteLoading = true;
          setTimeout(()=>{
            this.valueRemoteOption = this.valueRemoteAllOption.filter(item=>{
              return item.label.includes(value)
            });
            this.remoteLoading = false;
          },500);
        }
      }
    }
</script>
```
:::


:::demo 定义返回值

默认返回值只有 `value`。可以通过设置 `value-lable`属性定义返回值类型为value-lable，及把value和label同时返回。

```html
<template>
    <cl-select v-model="valueLabel" value-lable @change="handlerValueLabelChange">
        <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
    </cl-select>
    <p>{{valueLabel}}</p>
</template>
<script>
    export default {
      data(){
        return {
          valueLabel: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      },
      methods: {
        handlerValueLabelChange(value){
          this.$Message.info(`返回值为--${JSON.stringify(value)}`);
        }
      }
    }
</script>
```
:::


:::demo 创建条目

设置`allow-create`属性可以开启创建条目，必须配合`filterable`属性一起使用。默认选中新建的项目，键盘回车键即可创建。

```html
<template>
    <Row :gutter="16">
        <Col>
            <h4>props模式</h4>
            <cl-select v-model="value1" allow-create filterable :option="valueBaseOption"></cl-select>
        </Col>
        <Col>
            <h4>slot模式</h4>
            <cl-select v-model="value2" allow-create filterable>
                <cl-option v-for="item in valueBaseOption" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled"></cl-option>
            </cl-select>
        </Col>
    </Row>
</template>
<script>
    export default {
      data(){
        return {
          value1: '',
          value2: '',
          valueBaseOption: [
            {
              label: 'Fruit',
              value: 'fruit',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
            {
              label: 'Banana',
              value: 'banana',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Pear',
              value: 'pear',
            },
            {
              label: 'Peach',
              value: 'peach',
            },
          ]
        }
      }
    }
</script>
```
:::



## API

### Select props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 原生name属性 | - |
| value | String, Number, Array | 绑定的值，可以使用v-model进行双向绑定。多选时值为数组类型。 | - |
| disabled | Boolean | 禁用 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `small` `large`或者不设置 | - |
| option | Array| select的选项列表。设置此项后不用再插入Option组件。不设置分组时值类型如：`[{value: '', label: '', disabled: true}]`,其中value为选中时的返回值，label为展示信息，disabled控制是否可选 | - |
| transition | String | 可自定义下拉框的动画效果 | fade |
| multiple | Boolean | 多选 | - |
| clearable | Boolean | 开启清除 | - |
| emptyText | String | 数据为空时的显示文本 | 暂无数据 |
| filterable | Boolean | 开始搜索（option数据搜索） | - |
| remote | Boolean | 开启远程搜索（需要自己控制数据） | - |
| loading | Boolean | 远程搜索时显示loading加载中的效果 | - |
| allow-create | Boolean | 是否可以新建条目，需要配合`filterable`使用 | - |
| multiple-limit | Number | 多选时限制选择的数量，值为0时表示不限制 | 0 |
| max-tag-count | Number | 多选时限制最多显示的`tag`数量，值为0时表示不限制 | 0 |
| max-tag-text | Function | 配合`max-tag-count`使用，指定超出限制数量后显示的文本内容，参数为隐藏的数量 | - |
| maxHeight | String, Number | 设置下拉框的最大高度，超出后滚动 | 200px |
| placement | String | 设置下拉框显示的位置 | bottom-start |
| valueLable | Boolean | 默认返回值只有value。设置此项返回值为value,label组成的对象 | - |
| dropdown-match-select-width | Boolean | 下拉框宽度默认和选择框同宽，文本超出后省略。设置此项后当内容比较长时下拉框宽度自动拉伸。下拉框最小和选择框同宽 | true |
| renderHtml | HTMLElement, Boolean | 指定下拉框所在的元素, true时添加到body中 | false |


### Select event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 选中option变化时触发，默认返回value，如需返回label，详见属性valueLabel | 选中项value值 |
| remote-change | 远程搜索搜索词变化时触发 | 搜索词 |
| clear | 点击清空按钮时触发 | - |


### Option props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Number | 选项值,必选值 | - |
| label | String, Number | 选项显示的内容。默认在无slot内容时显示此项的内容。在通过slot自定义option显示内容时，此项为必填项。默认根据此项进行搜索 | - |
| disabled | Boolean | 禁用 | - |



### OptionGroup props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | String | 分组的组名 | - |
