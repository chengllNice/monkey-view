<template>
    <div class="TagView">
        <h4>default</h4>
        <ClTag size="small">标签</ClTag>
        <ClTag>标签</ClTag>
        <ClTag closable>标签</ClTag>
        <ClTag size="large">标签</ClTag>

        <h4>color=primary</h4>
        <ClTag color="primary" size="small">标签</ClTag>
        <ClTag color="primary">标签</ClTag>
        <ClTag color="primary" closable>标签</ClTag>
        <ClTag color="primary" size="large">标签</ClTag>

        <h4>color=danger</h4>
        <ClTag color="danger" size="small">标签</ClTag>
        <ClTag color="danger">标签</ClTag>
        <ClTag color="danger" closable>标签</ClTag>
        <ClTag color="danger" size="large">标签</ClTag>

        <h4>color=warning</h4>
        <ClTag color="warning" size="small">标签</ClTag>
        <ClTag color="warning">标签</ClTag>
        <ClTag color="warning" closable>标签</ClTag>
        <ClTag color="warning" size="large">标签</ClTag>

        <h4>color=success</h4>
        <ClTag color="success" size="small">标签</ClTag>
        <ClTag color="success">标签</ClTag>
        <ClTag color="success" closable>标签</ClTag>
        <ClTag color="success" size="large">标签</ClTag>

        <h4>color=info</h4>
        <ClTag color="info" size="small">标签</ClTag>
        <ClTag color="info">标签</ClTag>
        <ClTag color="info" closable>标签</ClTag>
        <ClTag color="info" size="large">标签</ClTag>

        <h4>color=primary-o</h4>
        <ClTag color="primary-o" size="small">标签</ClTag>
        <ClTag color="primary-o">标签</ClTag>
        <ClTag color="primary-o" closable>标签</ClTag>
        <ClTag color="primary-o" size="large">标签</ClTag>

        <h4>color=danger-o</h4>
        <ClTag color="danger-o" size="small">标签</ClTag>
        <ClTag color="danger-o">标签</ClTag>
        <ClTag color="danger-o" closable>标签</ClTag>
        <ClTag color="danger-o" size="large">标签</ClTag>

        <h4>color=warning-o</h4>
        <ClTag color="warning-o" size="small">标签</ClTag>
        <ClTag color="warning-o">标签</ClTag>
        <ClTag color="warning-o" closable>标签</ClTag>
        <ClTag color="warning-o" size="large">标签</ClTag>

        <h4>color=success-o</h4>
        <ClTag color="success-o" size="small">标签</ClTag>
        <ClTag color="success-o">标签</ClTag>
        <ClTag color="success-o" closable>标签</ClTag>
        <ClTag color="success-o" size="large">标签</ClTag>

        <h4>color=info-o</h4>
        <ClTag color="info-o" size="small">标签</ClTag>
        <ClTag color="info-o">标签</ClTag>
        <ClTag color="info-o" closable>标签</ClTag>
        <ClTag color="info-o" size="large">标签</ClTag>

        <h4>ghost</h4>
        <ClTag size="small" ghost>标签</ClTag>
        <ClTag ghost>标签</ClTag>
        <ClTag closable ghost>标签</ClTag>
        <ClTag size="large" ghost>标签</ClTag>

        <h4>ghost,color=primary</h4>
        <ClTag color="primary" ghost size="small">标签</ClTag>
        <ClTag color="primary" ghost>标签</ClTag>
        <ClTag color="primary" closable ghost>标签</ClTag>
        <ClTag color="primary" ghost size="large">标签</ClTag>

        <h4>ghost,color=danger</h4>
        <ClTag color="danger" ghost size="small">标签</ClTag>
        <ClTag color="danger" ghost>标签</ClTag>
        <ClTag color="danger" closable ghost>标签</ClTag>
        <ClTag color="danger" ghost size="large">标签</ClTag>

        <h4>ghost,color=warning</h4>
        <ClTag color="warning" ghost size="small">标签</ClTag>
        <ClTag color="warning" ghost>标签</ClTag>
        <ClTag color="warning" closable ghost>标签</ClTag>
        <ClTag color="warning" ghost size="large">标签</ClTag>

        <h4>ghost,color=success</h4>
        <ClTag color="success" ghost size="small">标签</ClTag>
        <ClTag color="success" ghost>标签</ClTag>
        <ClTag color="success" closable ghost>标签</ClTag>
        <ClTag color="success" ghost size="large">标签</ClTag>

        <h4>ghost,color=info</h4>
        <ClTag color="info" ghost size="small">标签</ClTag>
        <ClTag color="info" ghost>标签</ClTag>
        <ClTag color="info" closable ghost>标签</ClTag>
        <ClTag color="info" ghost size="large">标签</ClTag>

        <h4>自定义颜色 #000000</h4>
        <ClTag color="#000000">标签</ClTag>
        <ClTag color="#000000" closable>标签</ClTag>
        <ClTag color="#000000" ghost>标签</ClTag>
        <ClTag color="#000000" closable ghost>标签</ClTag>

        <h4>自定义颜色 #87d068</h4>
        <ClTag color="#87d068">标签</ClTag>
        <ClTag color="#87d068" closable>标签</ClTag>
        <ClTag color="#87d068" ghost>标签</ClTag>
        <ClTag color="#87d068" closable ghost>标签</ClTag>

        <h4>自定义颜色 #ffa2d3</h4>
        <ClTag color="#ffa2d3">标签</ClTag>
        <ClTag color="#ffa2d3" closable>标签</ClTag>
        <ClTag color="#ffa2d3" ghost>标签</ClTag>
        <ClTag color="#ffa2d3" closable ghost>标签</ClTag>


        <div class="viewDes">
            <h3>API</h3>
            <h4>tag props</h4>

            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值small/default/large</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：closable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可关闭</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：ghost</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>背景透明</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：color</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>tag颜色</p>
                <p><b>默认值：</b>default</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>tag event</h4>

            <div class="propItem">
                <p><b>事件名：close</b></p>
                <p><b>说明：</b>点击关闭时触发</p>
                <p><b>返回值：</b></p>
            </div>
        </div>
    </div>
</template>

<script>
  import ClTag from 'cl-ui/packages/components/tag/src/tag.vue'
  export default {
    name: "TagView",
    data() {
      return {}
    },
    computed: {},
    components: {
      ClTag
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>
