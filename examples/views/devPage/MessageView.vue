<template>
    <div class="MessageView">
        <Button type="primary" @click="openMessage('info', 0)">不关闭，手动5s后关闭</Button>
        <Button type="info" @click="openMessage('info')">info</Button>
        <Button type="success" @click="openMessage('success')">success</Button>
        <Button type="warning" @click="openMessage('warning')">warning</Button>
        <Button type="danger" @click="openMessage('error')">error</Button>
        <Button @click="openMessage('loading')">loading</Button>


        <div class="views-dev">
            <h3>API</h3>
            <h4>message props</h4>
            <p>通过一下实例方法调用：</p>
            <ul>
                <li>this.$Message.config(config)</li>
                <li>this.$Message.info(config)</li>
                <li>this.$Message.success(config)</li>
                <li>this.$Message.warning(config)</li>
                <li>this.$Message.error(config)</li>
                <li>this.$Message.loading(config)</li>
            </ul>

            <p>参数config为字符串时，直接显示内容，并可指定第二个参数为duration时间。参数config为对象，具体配置如下：</p>
            <div class="views-dev-prop-item">
                <p><b>属性：message</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>提示内容</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：duration</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>自动关闭的延时，单位秒，值为0时不关闭</p>
                <p><b>默认值：</b>3000</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：top</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>距离顶部的距离，单位px</p>
                <p><b>默认值：</b>20</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onClose</b></p>
                <p><b>类型：Function</b></p>
                <p><b>说明：</b>关闭时的回调</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView",
        data() {
            return {}
        },
        computed: {},
        components: {
        },
        created() {
        },
        mounted() {
            this.$Message.config({
                top: 40,
                duration: 4000,
                messageItemDis: 30,
            })
        },
        methods: {
            openMessage(type, duration) {
                // this.$Message[type]('this is a message', 5000);
                let a = this.$Message[type]({
                    duration: duration === 0 ? 0 : 3000,
                    content: 'this is a config message',
                    onClose() {
                        console.log('close--')
                    }
                });
                if (duration === 0) {
                    setTimeout(() => {
                        a.close();
                    }, 5000)
                }
            }
        }
    }
</script>
<style lang="scss">
    .MessageView {
        text-align: left;
    }
</style>
