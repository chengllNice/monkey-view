<template>
    <div class="checkboxView">
        <div>
            <h4>基础</h4>
            <ClCheckbox v-model="checkboxBase" @change="checkboxChange">基础</ClCheckbox>

            <h4>disabled</h4>
            <ClCheckbox v-model="checkboxDisabled" disabled @change="checkboxChange">disabled</ClCheckbox>

            <h4>设置true-value和false-value</h4>
            <ClCheckbox v-model="checkboxCustom" @change="checkboxChange" trueValue="1" falseValue="0">设置true-value和false-value</ClCheckbox>

            <h4>size</h4>
            <ClCheckbox v-model="checkboxSmall" @change="checkboxChange" size="small">small</ClCheckbox>
            <ClCheckbox v-model="checkboxDefault" @change="checkboxChange">default</ClCheckbox>
            <ClCheckbox v-model="checkboxLarge" @change="checkboxChange" size="large">large</ClCheckbox>

            <h4>indeterminate状态</h4>
            <ClCheckbox v-model="checkboxIndeterminate" indeterminate @change="checkboxChange">indeterminate</ClCheckbox>

            <h4>复选框组--设置属性option</h4>
            <ClCheckboxGroup v-model="checkboxGroupOptionValue" :options="checkboxGroupOption" @change="checkboxChange"></ClCheckboxGroup>

            <h4>复选框组--slot插槽</h4>
            <ClCheckboxGroup v-model="checkboxGroupSlotValue" @change="checkboxChange">
                <ClCheckbox label="checkbox1">测试Group1</ClCheckbox>
                <ClCheckbox label="checkbox2">测试Group2</ClCheckbox>
                <ClCheckbox label="checkbox3">测试Group3</ClCheckbox>
                <ClCheckbox label="checkbox4">测试Group4</ClCheckbox>
            </ClCheckboxGroup>

            <h4>复选框组--disabled</h4>
            <ClCheckboxGroup v-model="checkboxGroupDisabled" disabled @change="checkboxChange">
                <ClCheckbox label="checkbox1">测试Group1</ClCheckbox>
                <ClCheckbox label="checkbox2">测试Group2</ClCheckbox>
                <ClCheckbox label="checkbox3">测试Group3</ClCheckbox>
                <ClCheckbox label="checkbox4">测试Group4</ClCheckbox>
            </ClCheckboxGroup>

            <h4>复选框组--单独设置某项disabled</h4>
            <ClCheckboxGroup v-model="checkboxGroupSingleDisabled" @change="checkboxChange">
                <ClCheckbox label="checkbox1">测试Group1</ClCheckbox>
                <ClCheckbox label="checkbox2" disabled>测试Group2</ClCheckbox>
                <ClCheckbox label="checkbox3">测试Group3</ClCheckbox>
                <ClCheckbox label="checkbox4">测试Group4</ClCheckbox>
            </ClCheckboxGroup>

            <h4>全选</h4>
            <ClCheckbox v-model="checkboxAll" :indeterminate="indeterminateAll" @change="checkboxChangeAll">全选</ClCheckbox>
            <br>
            <ClCheckboxGroup v-model="checkboxGroupAll" :options="checkboxGroupOption" @change="checkboxChangeAllChildren"></ClCheckboxGroup>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>checkbox props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>只有单独使用是可以使用v-model绑定值，设置true-value和false-value时返回设置的值，默认返回boolean值</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：label</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>单独使用时该项值为文字描述。组合使用时，如果使用组合的options属性，该项值为文字描述；使用slot的checkbox时，该项为判断当前项是否选中</p>
                <p><b>默认值：</b></p>
            </div>
            <div class="propItem">
                <p><b>属性：indeterminate</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>只负责样式控制，设置indeterminate状态</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>原生name属性</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：trueValue</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>设置选中时的值</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="propItem">
                <p><b>属性：falseValue</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>设置取消选中时的值</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>checkbox尺寸，可选值small/default/large</p>
                <p><b>默认值：</b>default</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>checkboxGroup props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>指定选中的集合，使用v-model双向绑定。checkbox指定的label的值。使用options属性时选中的值为value的值</p>
                <p><b>默认值：</b>[]</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>组合中的所有checkbox全部禁用</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>组合中所有checkbox的尺寸</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：options</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>类似[{value: '0', label: 'checkbox'}]这样的数组，其中value指定当前项是否选中，label为当前项的文字描述</p>
                <p><b>默认值：</b>[]</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "checkboxView",
    data() {
      return {
        checkboxBase: true,
        checkboxDisabled: false,
        checkboxCustom: '0',
        checkboxSmall: false,
        checkboxDefault: false,
        checkboxLarge: false,
        checkboxIndeterminate: false,

        checkboxGroupOptionValue: ['复选框value1'],
        checkboxGroupOption: [
          {
            label: '复选框1',
            value: '复选框value1'
          },
          {
            label: '复选框2',
            value: '复选框value2'
          },
          {
            label: '复选框3',
            value: '复选框value3'
          },
          {
            label: '复选框4',
            value: '复选框value5'
          },
        ],

        checkboxGroupSlotValue: [],

        checkboxGroupDisabled: [],

        checkboxGroupSingleDisabled: [],

        checkboxAll: false,
        indeterminateAll: false,
        checkboxGroupAll: [],
      }
    },
    computed: {},
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      checkboxChange(value){
        console.log(value, 'vvvcheckboxvvv')
      },
      checkboxChangeAllChildren(){
        if(this.checkboxGroupAll.length === this.checkboxGroupOption.length){
          this.checkboxAll = true;
        }else if(this.checkboxGroupAll.length && this.checkboxGroupAll.length !== this.checkboxGroupOption.length){
          this.indeterminateAll = true;
          this.checkboxAll = false;
        }else{
          this.checkboxAll = false;
          this.indeterminateAll = false;
        }
      },
      checkboxChangeAll(){
        if(this.checkboxAll){
          this.checkboxGroupOption.forEach(item=>{
            this.checkboxGroupAll.push(item.value)
          })
        }else{
          this.checkboxGroupAll = [];
          this.indeterminateAll = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
