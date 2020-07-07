<template>
    <div class="SliderView">
        normal:<ClSlider v-model="sliderValue" @change="handlerChange"></ClSlider>
        railColor:<ClSlider v-model="sliderValue" railColor="#ccc" disabled  @change="handlerChange"></ClSlider>
        barColor:<ClSlider v-model="sliderValue" barColor="red" disabled  @change="handlerChange"></ClSlider>
        always:<ClSlider v-model="sliderValueAlways" tooltipVisible="always"  @change="handlerChange"></ClSlider>
        never:<ClSlider v-model="sliderValueNever" tooltipVisible="never"  @change="handlerChange"></ClSlider>
        disabled:<ClSlider v-model="sliderValueDis" disabled  @change="handlerChange"></ClSlider>
        step=0.1:<ClSlider v-model="sliderValueStep" :step="0.1"  @change="handlerChange"></ClSlider>
        min:10,max:80:<ClSlider v-model="sliderValue1" :min="10" :max="80"  @change="handlerChange"></ClSlider>
        tipFormat:<ClSlider v-model="sliderValueFormat" :tipFormat="tipFormat"  @change="handlerChange"></ClSlider>

        <p>vertical</p>
        <div class="vertical">
            <ClSlider v-model="sliderValueVer" vertical  @change="handlerChange"></ClSlider>
            step=10:<ClSlider v-model="sliderValueVerStep" vertical :step="10"  @change="handlerChange"></ClSlider>
        </div>


        <div class="viewDes">
            <h3>API</h3>
            <h4>slider props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Array, Number</b></p>
                <p><b>说明：</b>Array类型暂时不支持。滑块选定的值，可以只用v-model双向绑定</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：min</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>最小值</p>
                <p><b>默认值：</b>0</p>
            </div>
            <div class="propItem">
                <p><b>属性：max</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>最大值</p>
                <p><b>默认值：</b>100</p>
            </div>
            <div class="propItem">
                <p><b>属性：step</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>步长。取值建议能被(max-min)整除</p>
                <p><b>默认值：</b>1</p>
            </div>
            <div class="propItem">
                <p><b>属性：range</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>双滑块模式。暂不支持</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用选项</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：vertical</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>垂直slider</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：tooltipVisible</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>tooltip的显示时机。可选值hover/always/never。hover时鼠标悬停显示，always时总是显示，never时总不显示</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：tipFormat</b></p>
                <p><b>类型：Function</b></p>
                <p><b>说明：</b>格式化tooltip的显示内容</p>
                <p><b>默认值：</b>value</p>
            </div>
            <div class="propItem">
                <p><b>属性：railColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义rail轨道的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：barColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义bar的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>switch event</h4>

            <div class="propItem">
                <p><b>事件名：change</b></p>
                <p><b>说明：</b>松开滑块并且值改变时触发，在滑动过程中不会触发</p>
                <p><b>返回值：</b>value</p>
            </div>
        </div>
    </div>
</template>

<script>
  import ClSlider from 'cl-ui/packages/components/slider/src/slider.vue'
  export default {
    name: "SliderView",
    data() {
      return {
        sliderValue: 10,
        sliderValueAlways: 10,
        sliderValueNever: 10,
        sliderValueStep: 10,
        sliderValueDis: 10,
        sliderValue1: 20,
        sliderValueFormat: 20,

        sliderValueVer: 10,
        sliderValueVerStep: 10
      }
    },
    computed: {},
    components: {
      ClSlider
    },
    created() {
    },
    mounted() {

    },
    methods: {
      tipFormat(value){
        return `${value}%`
      },
      handlerChange(value){
        console.log(value,'change')
      },
    }
  }
</script>

<style lang="scss" scoped>
    .SliderView{
        &>*{
            width: 500px;
        }
        .vertical{
            height: 200px;
            margin: 0 50px;
            display: flex;
            padding-bottom: 50px;
        }
    }

</style>
