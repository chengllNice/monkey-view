<template>
    <div class="SwitchView">
        <p>基础</p>
        <ClSwitch size="small" @change="handlerChange"></ClSwitch>
        <ClSwitch v-model="defaultValue" @change="handlerChange"></ClSwitch>
        <ClSwitch size="large" @change="handlerChange"></ClSwitch>

        <p>disabled</p>
        <ClSwitch disabled @change="handlerChange"></ClSwitch>
        <ClSwitch disabled v-model="disabledValue" @change="handlerChange"></ClSwitch>

        <p>slot</p>
        <ClSwitch size="small" @change="handlerChange">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </ClSwitch>
        <ClSwitch @change="handlerChange">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </ClSwitch>
        <ClSwitch size="large" @change="handlerChange">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </ClSwitch>

        <p>自定义背景色</p>
        <ClSwitch v-model="defaultValue" checkedColor="red" @change="handlerChange"></ClSwitch>

        <p>自定义宽度</p>
        <ClSwitch v-model="defaultValue" width="80px" @change="handlerChange">
            <span slot="open">已经开启</span>
            <span slot="close">已经关闭</span>
        </ClSwitch>

        <p>loading状态</p>
        <ClSwitch v-model="defaultValue" :loading="true" @change="handlerChange"></ClSwitch>

        <p>定义trueValue和falseValue</p>
        <ClSwitch v-model="value" trueValue="1" falseValue="0" @change="handlerChange"></ClSwitch>


        <div class="viewDes">
            <h3>API</h3>
            <h4>switch props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Number, Boolean</b></p>
                <p><b>说明：</b>指定当前是否选中，可以使用v-model双向绑定</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：trueValue</b></p>
                <p><b>类型：String, Number, Boolean</b></p>
                <p><b>说明：</b>指定选中时的值</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="propItem">
                <p><b>属性：falseValue</b></p>
                <p><b>类型：String, Number, Boolean</b></p>
                <p><b>说明：</b>指定没有选中时的值</p>
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
                <p><b>说明：</b>尺寸，可选值small/default/large或者不设置</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：checkedColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可以自定义选中时的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：uncheckedColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可以自定义没有选中时的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用选项</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>定义宽度。建议当文字比较多时设置此项</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：loading</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>加载中的开关</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>switch event</h4>

            <div class="propItem">
                <p><b>事件名：change</b></p>
                <p><b>说明：</b>开关状态变化时触发，返回当前状态</p>
                <p><b>返回值：</b>状态</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>switch slot</h4>

            <div class="propItem">
                <p><b>名称：open</b></p>
                <p><b>说明：</b>自定义打开时的文字内容</p>
            </div>
            <div class="propItem">
                <p><b>名称：close</b></p>
                <p><b>说明：</b>自定义关闭时的文字内容</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "SwitchView",
    data() {
      return {
        disabledValue: true,
        defaultValue: true,
        value: '0'
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
      handlerChange(value){
        console.log(value,'switch--')
      }
    }
  }
</script>

<style scoped>

</style>
