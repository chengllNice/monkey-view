# Checkbox 复选框

复选框。一组可选项中进行多选。也可单独使用，表示某种状态的切换。

## 代码示例


:::demo 单独使用

可以使用v-model实现双向数据绑定。

```html
<template>
    <div>
        <Checkbox v-model="single">Checkbox</Checkbox>
        <p>{{single}}</p>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          single: false,
        }
      }
    }
</script>
```
:::


:::demo 自定义选中的值

单独使用时，可以通过设置 `true-value`属性和 `false-value`属性控制选中和取消选中的值。

```html
<template>
    <Checkbox v-model="singleCustom" true-value="1" false-value="0">自定义选中和取消选中的值</Checkbox>
    <p>{{singleCustom}}</p>
</template>
<script>
    export default {
      data(){
        return {
          singleCustom: '0',
        }
      }
    }
</script>
```
:::


:::demo 组合使用

使用 `checkboxGroup`组件把多个 `checkbox`组件组合起来使用，只需要在 Group 组件上绑定 `v-model`即可，此时需要绑定 `Array`类型的 `v-model`。此时`checkbox`的 `label`属性是该项的对应的值，若此标签中没有内容，该 `label`属性的值即作为内容。如果 Group的 `v-model`有对应 `checkbox`的 `label`的值，表明为选中状态，否则不选中。`checkboxGroup`组件可以使用 `options`属性绑定数据实现多选框组合，值类型如：`[{label: '', value: '', disabled: true}]`的形式，label为展示内容，value为选中时的值，disabled可选，禁用控制。

```html
<template>
    <Row>
        <Col>
            <CheckboxGroup v-model="group">
                <Checkbox label="apple">Apple</Checkbox>
                <Checkbox label="orange">Orange</Checkbox>
                <Checkbox label="banana">Banana</Checkbox>
                <Checkbox label="melon">Melon</Checkbox>
            </CheckboxGroup>
            <p>{{group}}</p>
        </Col>
        <Col>
            <CheckboxGroup v-model="group1" :options="groupOptions"></CheckboxGroup>
            <p>{{group1}}</p>
        </Col>
    </Row>
</template>
<script>
    export default {
      data(){
        return {
          group: ['orange'],
          group1: ['banana'],
          groupOptions: [
            {
              label: '苹果',
              value: 'apple'
            },
            {
              label: '橘子',
              value: 'orange'
            },
            {
              label: '香蕉',
              value: 'banana'
            },
            {
              label: '西瓜',
              value: 'melon'
            }
          ]
        }
      }
    }
</script>

```
:::


:::demo disable状态

设置 `disbaled`属性可以实现禁用。可以给 `checkbox`组件添加 `disabled`属性实现禁用。组合使用时可以给 Group 组件添加 `disabled`属性实现该组合下的所有子项禁用；也可以单独给某个子项设置 `disabled`属性实现某一项的禁用。

```html
<template>
    <h4>单独使用禁用</h4>
    <Checkbox disabled  v-model="disabledSingle">DisabledCheckbox</Checkbox>
    <p>{{disabledSingle}}</p>

    <h4>组合使用禁用</h4>
    <Checkbox-group disabled v-model="disabledGroup" :options="disabledGroupOptions"></Checkbox-group>
    <p>{{disabledGroup}}</p>

    <h4>组合使用禁用指定项</h4>
    <Checkbox-group v-model="disabledGroup1" :options="disabledGroupOptions"></Checkbox-group>
    <p>{{disabledGroup1}}</p>

    <h4>组合使用禁用指定项</h4>
    <Checkbox-group v-model="disabledGroup2">
        <Checkbox label="apple">Apple</Checkbox>
        <Checkbox label="orange">Orange</Checkbox>
        <Checkbox label="banana" disabled>Banana</Checkbox>
        <Checkbox label="melon">Melon</Checkbox>
    </Checkbox-group>
    <p>{{disabledGroup2}}</p>
</template>
<script>
    export default {
      data(){
        return {
          disabledSingle: true,
          disabledGroup: ['banana'],
          disabledGroup1: [],
          disabledGroupOptions: [
            {
              label: '苹果',
              value: 'apple'
            },
            {
              label: '橘子',
              value: 'orange',
              disabled: true,
            },
            {
              label: '香蕉',
              value: 'banana'
            },
            {
              label: '西瓜',
              value: 'melon'
            }
          ],
          disabledGroup2: [],
        }
      }
    }
</script>

```
:::


:::demo 受控的checkbox

和其它组件通信联动。

```html
<template>
    <Checkbox v-model="controlChecked" :disabled="controlDisabled">Checkbox</Checkbox>
    <p>controlChecked: {{controlChecked}}</p>
    <p>controlDisabled: {{controlDisabled}}</p>
    <m-switch width="90" v-model="controlChecked">
        <template slot="open">Checked</template>
        <template slot="close">UnChecked</template>
    </m-switch>
    <m-switch width="90" v-model="controlDisabled">
        <template slot="open">Disabled</template>
        <template slot="close">UnDisabled</template>
    </m-switch>
</template>
<script>
    export default {
      data(){
        return {
           controlChecked: false,
           controlDisabled: false,
        }
      }
    }
</script>

```
:::


:::demo 全选

可以使用v-model实现双向数据绑定。

```html
<template>
    <Checkbox v-model="checkboxAll" :indeterminate="indeterminateAll" @change="checkboxAllChange">全选</Checkbox>
    <br>
    <Checkbox-group v-model="checkboxGroupAll" :options="checkboxGroupAllOption" @change="checkboxGroupAllChange"></Checkbox-group>
</template>
<script>
    export default {
      data(){
        return {
          checkboxAll: false,
          indeterminateAll: false,
          checkboxGroupAll: [],
          checkboxGroupAllOption: [
            {
              label: '苹果',
              value: 'apple'
            },
            {
              label: '橘子',
              value: 'orange',
            },
            {
              label: '香蕉',
              value: 'banana'
            },
            {
              label: '西瓜',
              value: 'melon'
            }
          ],
        }
      },
      methods: {
        checkboxAllChange(){
          if(this.checkboxAll){
            this.checkboxGroupAllOption.forEach(item=>{
              this.checkboxGroupAll.push(item.value)
            })
          }else{
            this.checkboxGroupAll = [];
            this.indeterminateAll = false;
          }
        },
        checkboxGroupAllChange(){
          if(this.checkboxGroupAll.length === this.checkboxGroupAllOption.length){
            this.checkboxAll = true;
          }else if(this.checkboxGroupAll.length && this.checkboxGroupAll.length !== this.checkboxGroupAllOption.length){
            this.indeterminateAll = true;
            this.checkboxAll = false;
          }else{
            this.checkboxAll = false;
            this.indeterminateAll = false;
          }
        },
      }
    }
</script>

```
:::


:::demo 尺寸

可以通过设置 `size`属性控制尺寸大小，可选值有 `small` `large` 或者不设置。

```html
<template>
    <Checkbox v-model="singleMini" size="mini">Mini</Checkbox>
    <Checkbox v-model="singleSmall" size="small">Small</Checkbox>
    <Checkbox v-model="singleDefault">Default</Checkbox>
    <Checkbox v-model="singleLarge" size="large">Large</Checkbox>
</template>
<script>
    export default {
      data(){
        return {
          singleMini: false,
          singleSmall: false,
          singleDefault: false,
          singleLarge: false,
        }
      }
    }
</script>

```
:::


## API

### Checkbox props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Number, String, Boolean | 只有单独使用是可以使用v-model绑定值，设置true-value和false-value时返回设置的值，默认返回boolean值 | - |
| label | Number, String, Boolean | 单独使用时该项值为文字描述。组合使用时，如果使用组合的options属性，该项值为文字描述；使用slot的checkbox时，该项为判断当前项是否选中 | - |
| indeterminate | Boolean | 只负责样式控制，设置indeterminate状态 | - |
| disabled | Boolean | 禁用 | - |
| name | String | 原生name属性 | - |
| trueValue | Number, String, Boolean | 设置选中时的值 | - |
| falseValue | Number, String, Boolean | 设置取消选中时的值 | - |
| size | String | 尺寸，可选值 `mini` `small` `large` | - |


### Checkbox event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 只有单独使用时有效。绑定的值改变时触发 | 当前状态 |


### CheckboxGroup props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Array | 指定选中的集合，使用v-model双向绑定。使用 `options` 属性时选中的是选项`value`的值。使用`slot`的`checkbox`时选中的是指定`label`的值。 | - |
| disabled | Boolean | 组合中的所有checkbox全部禁用 | - |
| size | String | 组合中所有checkbox的尺寸 | - |
| options | Array | 类似`[{value: '0', label: 'checkbox', disabled: true}]`这样的数组，其中`value`指定当前项是否选中，`label`为当前项的文字描述，`disabled`可选，控制禁用状态 | - |


### CheckboxGroup event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 绑定的值改变时触发，返回当前选中值的数组 | [] |

