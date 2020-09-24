<template>
    <div class="AlterView">
        <Alter>alter</Alter>
        <Alter type="success">success</Alter>
        <Alter type="error">error</Alter>
        <Alter type="warning">warning</Alter>

        <p>含描述信息</p>
        <Alter>
            alter
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="success">
            success
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="error">
            error
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning">
            warning
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>带icon</p>
        <Alter type="info" show-icon>An info prompt</Alter>
        <Alter type="success" show-icon>An info prompt</Alter>
        <Alter type="error" show-icon>An info prompt</Alter>
        <Alter type="warning" show-icon>An info prompt</Alter>
        <Alter type="info" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="success" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="error" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning" show-icon>
            <Icon slot="icon" type="sound"></Icon>
            custom icon
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>可关闭</p>
        <Alter closable>An info prompt</Alter>
        <Alter closable show-icon>An info prompt</Alter>
        <Alter type="info" show-icon closable>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>自定义关闭内容</p>
        <Alter closable>
            An info prompt
            <span slot="close">close</span>
        </Alter>

        <p>主题dark</p>
        <Alter theme="dark">An info prompt</Alter>
        <Alter type="success" theme="dark">An info prompt</Alter>
        <Alter type="error" theme="dark">An info prompt</Alter>
        <Alter type="warning" theme="dark">An info prompt</Alter>
        <Alter show-icon closable theme="dark">
            An info prompt
            <span slot="close">close</span>
        </Alter>
        <Alter closable show-icon theme="dark">
            An info prompt
            <span slot="close">close</span>
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>


        <div class="views-dev">
            <h3>API</h3>
            <h4>alter props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：type</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>警告提示样式，可选值info/success/warning/error</p>
                <p><b>默认值：</b>info</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：transition</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>指定警告框关闭时的动画</p>
                <p><b>默认值：</b>AlterFade</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：showIcon</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否显示警告的icon图标，默认不显示</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：closable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否可关闭，默认不可关闭</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：theme</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>提供的主题，可选light/dark</p>
                <p><b>默认值：</b>light</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>alter event</h4>

            <div class="views-dev-prop-item">
                <p><b>事件名：close</b></p>
                <p><b>说明：</b>关闭时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>alter slot</h4>

            <div class="views-dev-prop-item">
                <p><b>名称：icon</b></p>
                <p><b>说明：</b>自定义警告框的icon图标</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：description</b></p>
                <p><b>说明：</b>定义描述信息</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：close</b></p>
                <p><b>说明：</b>自定义关闭按钮</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "AlterView",
    data() {
      return {}
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>
