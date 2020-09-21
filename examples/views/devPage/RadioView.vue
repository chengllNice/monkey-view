<template>
    <div class="radioView">
        <div>
            <h4>基础--没有设置label--单独使用</h4>
            <Radio v-model="radioBase" @change="changHandler">基础</Radio>

            <h4>基础--设置label--单独使用</h4>
            <Radio v-model="radioBaseLable" label="1" @change="changHandler">基础Label</Radio>

            <h4>disabled--单独使用</h4>
            <Radio v-model="radioDisabled" disabled @change="changHandler">基础</Radio>

            <h4>size--单独使用</h4>
            <Radio v-model="radioSize" label="small" size="small" @change="changHandler">small</Radio>
            <Radio v-model="radioSize" label="default" @change="changHandler">default</Radio>
            <Radio v-model="radioSize" label="large" size="large" @change="changHandler">large</Radio>

            <h4>组合使用--使用属性options</h4>
            <RadioGroup v-model="radioGroupOptionValue" :options="radioOptions" @change="changHandler"></RadioGroup>

            <h4>组合使用--使用slot</h4>
            <RadioGroup v-model="radioGroupSlotValue" @change="changHandler">
                <Radio label="0">radio0</Radio>
                <Radio label="1">radio1</Radio>
                <Radio label="2">radio2</Radio>
                <Radio label="3">radio3</Radio>
                <Radio label="4">radio4</Radio>
            </RadioGroup>

            <h4>组合使用--size</h4>
            <RadioGroup v-model="radioGroupOptionValueSizeSmall" size="small" :options="radioOptions" @change="changHandler"></RadioGroup>
            <RadioGroup v-model="radioGroupOptionValueSizeDefault" :options="radioOptions" @change="changHandler"></RadioGroup>
            <RadioGroup v-model="radioGroupOptionValueSizeLarge" size="large" :options="radioOptions" @change="changHandler"></RadioGroup>

            <h4>组合使用--disabled</h4>
            <RadioGroup v-model="radioGroupOptionValueDisabled" disabled :options="radioOptions" @change="changHandler"></RadioGroup>

            <h4>组合使用--单独设置某项disabled</h4>
            <RadioGroup v-model="radioGroupSlotValueSingleDisabled" @change="changHandler">
                <Radio label="0" disabled>radio0--disabled</Radio>
                <Radio label="1">radio1</Radio>
                <Radio label="2">radio2</Radio>
                <Radio label="3">radio3</Radio>
                <Radio label="4">radio4</Radio>
            </RadioGroup>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>radio props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>只有单独使用是可以使用v-model绑定值。单独使用时没有设置label，选中时返回true；单独使用设置label时，选中返回label指定的值。组合使用时不支持设置该值</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：label</b></p>
                <p><b>类型：Number, String, Boolean</b></p>
                <p><b>说明：</b>单独使用时选中时返回该值。组合使用时，如果使用组合的options属性，该项值为文字描述；使用slot时，选中时返回该值</p>
                <p><b>默认值：</b>true</p>
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
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>checkbox尺寸，可选值small/default/large</p>
                <p><b>默认值：</b>default</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>radioGroup props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Number, Boolean</b></p>
                <p><b>说明：</b>指定当前选中的radio，使用v-model双向绑定。</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>组合中的所有radio全部禁用</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>组合中所有radio的尺寸</p>
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
        radioBase: false,
        radioBaseLable: '',
        radioDisabled: false,
        radioSize: '',

        radioGroupOptionValue: '',
        radioOptions: [
          {
            value: '0',
            label: '测试1'
          },
          {
            value: '1',
            label: '测试2'
          },
          {
            value: '2',
            label: '测试3'
          },
          {
            value: '3',
            label: '测试4'
          }
        ],

        radioGroupSlotValue: '',

        radioGroupOptionValueSizeSmall: '',
        radioGroupOptionValueSizeDefault: '',
        radioGroupOptionValueSizeLarge: '',

        radioGroupOptionValueDisabled: '',

        radioGroupSlotValueSingleDisabled: '',
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
      changHandler(value){
        console.log(value, 'vvvvvv')
      },
    }
  }
</script>

<style scoped>

</style>
