# Input 输入框

表单组件。支持input、number、password、textarea类型。

## 代码示例



:::demo 基础用法

可以使用v-model实现双向数据绑定。默认宽度100%。

```html
<template>
    <cl-input placeholder="placeholder" v-model="valueBase" style="width: 300px"></cl-input>
</template>
<script>
    export default {
      data(){
        return {
          valueBase: '',
        }
      }
    }
</script>

```

:::


:::demo 禁用

设置 `disabled`属性禁用输入框。

```html
<template>
    <Row :gutter="16">
        <Col>
            <h4>input</h4>
            <cl-input disabled placeholder="placeholder" v-model="valueDisabled"></cl-input>
        </Col>
        <Col>
            <h4>number</h4>
            <cl-input type="number" disabled placeholder="placeholder" v-model="valueDisabled"></cl-input>
        </Col>
        <Col>
            <h4>search</h4>
            <cl-input type="search" disabled placeholder="placeholder" v-model="valueDisabled"></cl-input>
        </Col>
        <Col>
            <h4>password</h4>
            <cl-input type="password" disabled placeholder="placeholder" v-model="valueDisabled"></cl-input>
        </Col>
    </Row>
</template>
<script>
    export default {
      data(){
        return {
          valueDisabled: '',
        }
      }
    }
</script>

```

:::


:::demo 尺寸

支持三种尺寸，设置 `size`为 `mini` `small` `large`实现迷你尺寸、小尺寸和大尺寸，不设置为默认尺寸。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-input size="mini" placeholder="mini placeholder" v-model="valueSizeMini"></cl-input>
        </cl-col>
        <cl-col>
            <cl-input size="small" placeholder="small placeholder" v-model="valueSizeSmall"></cl-input>
        </cl-col>
        <cl-col>
            <cl-input placeholder="default placeholder" v-model="valueSizeDefault"></cl-input>
        </cl-col>
        <cl-col>
            <cl-input size="large" placeholder="large placeholder" v-model="valueSizeLarge"></cl-input>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueSizeMini: '',
          valueSizeSmall: '',
          valueSizeDefault: '',
          valueSizeLarge: '',
        }
      }
    }
</script>

```

:::


:::demo 可清空

设置 `clearable`属性实现可清空的输入框。显示清除按钮。

```html
<template>
    <cl-input placeholder="placeholder" clearable v-model="valueClearable" style="width: 300px"></cl-input>
</template>
<script>
    export default {
      data(){
        return {
          valueClearable: '',
        }
      }
    }
</script>

```

:::


:::demo 前缀和后缀图标

设置 `prefix`和 `suffix`属性及同名的 `slot`实现前缀和后缀图标。

```html
<template>
    <h4>属性方式</h4>
    <cl-input placeholder="placeholder" v-model="valuePrefix" prefix="user-fill" style="width: 300px"></cl-input>
    <br>
    <cl-input placeholder="placeholder" v-model="valueSuffix" suffix="search" style="width: 300px"></cl-input>

    <h4>slot方式</h4>
    <cl-input placeholder="placeholder" v-model="valuePrefixSlot" style="width: 300px">
        <Icon slot="prefix" type="user-fill"></Icon>
    </cl-input>
    <br>
    <cl-input placeholder="placeholder" v-model="valueSuffixSlot" style="width: 300px">
        <Icon slot="suffix" type="search"></Icon>
    </cl-input>
</template>
<script>
    export default {
      data(){
        return {
          valuePrefix: '',
          valueSuffix: '',
          valuePrefixSlot: '',
          valueSuffixSlot: '',
        }
      }
    }
</script>

```

:::


:::demo 前置和后置标签

设置 `prefix`和 `suffix`属性及同名的 `slot`实现前缀和后缀图标。

```html
<template>
    <cl-input placeholder="placeholder" v-model="valuePrepend">
        <span slot="prepend">http://</span>
        <span slot="append">.com</span>
    </cl-input>
    <br>
    <cl-input placeholder="placeholder" v-model="valueAppend">
        <cl-select slot="prepend" style="width: 70px;" v-model="inputPrependSelect" :option="inputPrependSelectOptions" :dropdownMatchSelectWidth="false"></cl-select>
        <cl-select slot="append" style="width: 70px;" v-model="inputAppendSelect" :option="inputAppendSelectOptions" :dropdownMatchSelectWidth="false"></cl-select>
    </cl-input>
    <br>
    <cl-input placeholder="placeholder" v-model="valuePrepend">
        <Icon slot="append" type="setting"></Icon>
    </cl-input>
</template>
<script>
    export default {
      data(){
        return {
          valuePrepend: '',
          valueAppend: '',
          inputPrependSelect: '0',
          inputPrependSelectOptions: [
            {
              label: 'http://',
              value: '0',
            },
            {
              label: 'https://',
              value: '1',
            }
          ],
          inputAppendSelect: '0',
          inputAppendSelectOptions: [
            {
              label: '.com',
              value: '0',
            },
            {
              label: '.cn',
              value: '1',
            },
            {
              label: '.net',
              value: '2',
            },
            {
              label: '.org',
              value: '3',
            }
          ],
        }
      }
    }
</script>

```

:::


:::demo 搜索框

设置 `type='search'`开启带有搜索按钮的输入框。

```html
<template>
    <cl-input type="search" placeholder="placeholder" v-model="valueSearch"></cl-input>
    <br>
    <cl-input type="search" placeholder="placeholder" v-model="valueSearch1" suffixButton></cl-input>
    <br>
    <cl-input type="search" placeholder="placeholder" v-model="valueSearch2" suffixButton="Search"></cl-input>
</template>
<script>
    export default {
      data(){
        return {
           valueSearch: '',
           valueSearch1: '',
           valueSearch2: '',
        }
      }
    }
</script>

```

:::


:::demo 密码框

设置 `type='password'`开启密码输入框。可以自定义密码框的后缀图标或者不显示图标

```html
<template>
    <cl-input type="password" placeholder="placeholder" v-model="valuePassword"></cl-input>
    <br>
    <cl-input type="password" placeholder="placeholder" v-model="valuePassword1" :showPasswordIcon="false"></cl-input>
    <br>
    <cl-input type="password" placeholder="placeholder" v-model="valuePassword2">
        <Icon slot="suffix" type="password"></Icon>
    </cl-input>
</template>
<script>
    export default {
      data(){
        return {
           valuePassword: '',
           valuePassword1: '',
           valuePassword2: '',
        }
      }
    }
</script>

```

:::


:::demo 数字输入框

设置 `type='number'`开启数字输入框。数字输入框的默认 `step=1`。可以自定义 `step`大小，也可以设置 `step=false`不显示操作。

```html
<template>
    <cl-input type="number" placeholder="placeholder" v-model="valueNumber"></cl-input>
    <h4>step=2</h4>
    <cl-input type="number" placeholder="placeholder" v-model="valueNumber1" :step="2"></cl-input>
    <h4>step=false</h4>
    <cl-input type="number" placeholder="placeholder" v-model="valueNumber2" :step="false"></cl-input>
    <h4>stepType='right'</h4>
    <cl-input type="number" placeholder="placeholder" v-model="valueNumber3" stepType="right"></cl-input>
    <h4>限制最大最小值及小数位：min=0,max=100,precision=2</h4>
    <cl-input type="number" placeholder="placeholder" v-model="valueNumber4" :min="0" :max="100" :precision="2"></cl-input>
</template>
<script>
    export default {
      data(){
        return {
           valueNumber: '',
           valueNumber1: '',
           valueNumber2: '',
           valueNumber3: '',
           valueNumber4: '',
        }
      }
    }
</script>

```

:::


:::demo 文本域

设置 `type='textarea'`开启文本域模式。设置 `autosize`属性可自适应高度，该属性设置为对象可设置最小行数和最大行数。

```html
<template>
    <cl-input type="textarea" placeholder="placeholder" v-model="valueTextarea"></cl-input>
    <h4>自适应高度</h4>
    <cl-input type="textarea" placeholder="placeholder" v-model="valueTextarea1" autosize></cl-input>
    <cl-input type="textarea" placeholder="placeholder" v-model="valueTextarea2" :autosize="{minRows: 3, maxRows: 6}"></cl-input>
    <h4>设置文本域大小</h4>
    <cl-input type="textarea" placeholder="placeholder" v-model="valueTextarea3" :rows="5"></cl-input>
    <h4>限制输入长度并显示输入长度：maxLength=20,showLimitLabel</h4>
    <cl-input type="textarea" placeholder="placeholder" v-model="valueTextarea4" :maxLength="20" showLimitLabel></cl-input>
</template>
<script>
    export default {
      data(){
        return {
           valueTextarea: '',
           valueTextarea1: '',
           valueTextarea2: '',
           valueTextarea3: '',
           valueTextarea4: '',
        }
      }
    }
</script>

```

:::



## API

### Input props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 设置文本框的类型，可选值 `input` `number` `search` `password` `textarea` | input |
| name | String | 原生name属性 | - |
| value | String, Number | 绑定的值，可以使用v-model进行双向绑定 | - |
| disabled | Boolean | 禁用 | - |
| readonly | Boolean | 只读属性 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| step | Boolean, Number | type为number时，每次改变的步数，可以是小数。false时不显示控制按钮， true时显示控制按钮，默认显示左右按钮 | 1 |
| step-type | String | type为`number`时，控制按钮显示的位置。可选值`right` | 1 |
| min | Number | 最小值。type类型为`number`时有用，设置可输入的最小值 | - |
| max | Number | 最大值。type类型为`number`时有用，设置可输入的最大值 | - |
| precision | Number | 保留小数点位数。type类型为`number`时有用 | - |
| max-length | Number | 可输入的最大字符长度。`input`和`textarea`时有效 | - |
| show-limit-label | Boolean | 是否显示限制。为true时会在输入框或者textarea尾部显示当前字符长度和限制长度`man-length`。该值需要和`man-length`配合使用。 | - |
| autosize | Boolean, Object | type为`textarea`时有效。自适应内容高度，可设置对象，如`{minRows: 2, maxRows: 6}` | - |
| rows | Number | type为`textarea`时有效。默认行数，超出时显示滚动条 | - |
| show-password-icon | Boolean, Object | type为`password`时尾部显示控制字符显示的icon图标。false时不显示。可设置对象，设置icon，如：`{close: 'close', open: 'square-plus'}` | true |
| suffix | String | 输入框尾部图标。`textarea`时无效。type为`search`时默认显示搜索图标 | - |
| prefix | Boolean, String | 输入框头部图标。`textarea`时无效 | - |
| suffix-button | String | type为`search`时有效。定义搜索按钮，true时显示纯图标的按钮，string时可定义按钮的文字 | false |
| clearable | Boolean | 显示清除图标。type为`textarea`时无效 | false |
| input-style | Object | 输入框的样式，type为`textarea`时无效 | false |


### Input event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 数据改变时触发 | - |
| blur | 失去焦点时触发 | - |
| focus | 获取焦点时触发 | - |
| enter | 按下回车键时触发 | - |
| search | 按下搜索或回车键时触发。`search`状态下有用 | - |
| clear | 开始`clearable`时有用。点击清空按钮时触发 | - |



### Input slot

| 名称 | 说明 |
| ---- | ---- |
| prepend | 前置内容。type为`textarea`时无效 |
| prefix | 输入框头部内容。设置此项内容后内置的`prefix`无效。type为`textarea`时无效 |
| suffix | 输入框尾部内容。设置此项内容后会导致内置`suffix`的无效。type为`textarea`时无效 |
| append | 后置内容。设置此项内容后`suffix-button`无效。type为`textarea`时无效 |


### Input methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 主动使input获取焦点 | - |
| blur | 主动使input失去焦点 | - |
