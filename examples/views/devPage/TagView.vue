<template>
    <div class="TagView">
        <h4>default</h4>
        <Tag size="mini">标签</Tag>
        <Tag size="mini" closable>标签</Tag>
        <Tag size="small">标签</Tag>
        <Tag size="small" closable>标签</Tag>
        <Tag>标签</Tag>
        <Tag closable>标签</Tag>
        <Tag size="large">标签</Tag>
        <Tag size="large" closable>标签</Tag>

        <h4>color=primary</h4>
        <Tag color="primary" size="mini">标签</Tag>
        <Tag color="primary" size="small">标签</Tag>
        <Tag color="primary">标签</Tag>
        <Tag color="primary" closable>标签</Tag>
        <Tag color="primary" size="large">标签</Tag>

        <h4>color=danger</h4>
        <Tag color="danger" size="mini">标签</Tag>
        <Tag color="danger" size="small">标签</Tag>
        <Tag color="danger">标签</Tag>
        <Tag color="danger" closable>标签</Tag>
        <Tag color="danger" size="large">标签</Tag>

        <h4>color=warning</h4>
        <Tag color="warning" size="mini">标签</Tag>
        <Tag color="warning" size="small">标签</Tag>
        <Tag color="warning">标签</Tag>
        <Tag color="warning" closable>标签</Tag>
        <Tag color="warning" size="large">标签</Tag>

        <h4>color=success</h4>
        <Tag color="success" size="mini">标签</Tag>
        <Tag color="success" size="small">标签</Tag>
        <Tag color="success">标签</Tag>
        <Tag color="success" closable>标签</Tag>
        <Tag color="success" size="large">标签</Tag>

        <h4>color=info</h4>
        <Tag color="info" size="mini">标签</Tag>
        <Tag color="info" size="small">标签</Tag>
        <Tag color="info">标签</Tag>
        <Tag color="info" closable>标签</Tag>
        <Tag color="info" size="large">标签</Tag>

        <h4>color=primary-o</h4>
        <Tag color="primary-o" size="mini">标签</Tag>
        <Tag color="primary-o" size="small">标签</Tag>
        <Tag color="primary-o">标签</Tag>
        <Tag color="primary-o" closable>标签</Tag>
        <Tag color="primary-o" size="large">标签</Tag>

        <h4>color=danger-o</h4>
        <Tag color="danger-o" size="mini">标签</Tag>
        <Tag color="danger-o" size="small">标签</Tag>
        <Tag color="danger-o">标签</Tag>
        <Tag color="danger-o" closable>标签</Tag>
        <Tag color="danger-o" size="large">标签</Tag>

        <h4>color=warning-o</h4>
        <Tag color="warning-o" size="mini">标签</Tag>
        <Tag color="warning-o" size="small">标签</Tag>
        <Tag color="warning-o">标签</Tag>
        <Tag color="warning-o" closable>标签</Tag>
        <Tag color="warning-o" size="large">标签</Tag>

        <h4>color=success-o</h4>
        <Tag color="success-o" size="mini">标签</Tag>
        <Tag color="success-o" size="small">标签</Tag>
        <Tag color="success-o">标签</Tag>
        <Tag color="success-o" closable>标签</Tag>
        <Tag color="success-o" size="large">标签</Tag>

        <h4>color=info-o</h4>
        <Tag color="info-o" size="mini">标签</Tag>
        <Tag color="info-o" size="small">标签</Tag>
        <Tag color="info-o">标签</Tag>
        <Tag color="info-o" closable>标签</Tag>
        <Tag color="info-o" size="large">标签</Tag>

        <h4>ghost</h4>
        <Tag size="mini" ghost>标签</Tag>
        <Tag size="small" ghost>标签</Tag>
        <Tag ghost>标签</Tag>
        <Tag closable ghost>标签</Tag>
        <Tag size="large" ghost>标签</Tag>

        <h4>ghost,color=primary</h4>
        <Tag color="primary" ghost size="mini">标签</Tag>
        <Tag color="primary" ghost size="small">标签</Tag>
        <Tag color="primary" ghost>标签</Tag>
        <Tag color="primary" closable ghost>标签</Tag>
        <Tag color="primary" ghost size="large">标签</Tag>

        <h4>ghost,color=danger</h4>
        <Tag color="danger" ghost size="mini">标签</Tag>
        <Tag color="danger" ghost size="small">标签</Tag>
        <Tag color="danger" ghost>标签</Tag>
        <Tag color="danger" closable ghost>标签</Tag>
        <Tag color="danger" ghost size="large">标签</Tag>

        <h4>ghost,color=warning</h4>
        <Tag color="warning" ghost size="mini">标签</Tag>
        <Tag color="warning" ghost size="small">标签</Tag>
        <Tag color="warning" ghost>标签</Tag>
        <Tag color="warning" closable ghost>标签</Tag>
        <Tag color="warning" ghost size="large">标签</Tag>

        <h4>ghost,color=success</h4>
        <Tag color="success" ghost size="mini">标签</Tag>
        <Tag color="success" ghost size="small">标签</Tag>
        <Tag color="success" ghost>标签</Tag>
        <Tag color="success" closable ghost>标签</Tag>
        <Tag color="success" ghost size="large">标签</Tag>

        <h4>ghost,color=info</h4>
        <Tag color="info" ghost size="mini">标签</Tag>
        <Tag color="info" ghost size="small">标签</Tag>
        <Tag color="info" ghost>标签</Tag>
        <Tag color="info" closable ghost>标签</Tag>
        <Tag color="info" ghost size="large">标签</Tag>

        <h4>自定义颜色 #000000</h4>
        <Tag color="#000000">标签</Tag>
        <Tag color="#000000" closable>标签</Tag>
        <Tag color="#000000" ghost>标签</Tag>
        <Tag color="#000000" closable ghost>标签</Tag>

        <h4>自定义颜色 #87d068</h4>
        <Tag color="#87d068">标签</Tag>
        <Tag color="#87d068" closable>标签</Tag>
        <Tag color="#87d068" ghost>标签</Tag>
        <Tag color="#87d068" closable ghost>标签</Tag>

        <h4>自定义颜色 #ffa2d3</h4>
        <Tag color="#ffa2d3">标签</Tag>
        <Tag color="#ffa2d3" closable>标签</Tag>
        <Tag color="#ffa2d3" ghost>标签</Tag>
        <Tag color="#ffa2d3" closable ghost>标签</Tag>

        <h4>可选择</h4>
        <Tag color="primary" checkable>标签</Tag>
        <Tag color="warning" :checked="false">标签</Tag>
        <Tag color="info">标签</Tag>


        <div class="views-dev">
            <h3>API</h3>
            <h4>tag props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值small/default/large</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：closable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可关闭</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：ghost</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>背景透明</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：color</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>tag颜色</p>
                <p><b>默认值：</b>default</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>tag event</h4>

            <div class="views-dev-prop-item">
                <p><b>事件名：close</b></p>
                <p><b>说明：</b>点击关闭时触发</p>
                <p><b>返回值：</b></p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TagView",
    data() {
      return {}
    },
    computed: {},
    components: {
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
