<template>
    <div class="TabsView">
<!--        <cl-tabs>-->
<!--            <cl-tab-pane label="one" c-key="1">111</cl-tab-pane>-->
<!--            <cl-tab-pane label="two" c-key="2">222</cl-tab-pane>-->
<!--        </cl-tabs>-->

        <h4>尺寸</h4>
        <cl-tabs size="mini">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs size="small">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs>
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs size="large">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>


        <h4>card</h4>
        <cl-tabs size="mini" type="card">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs size="small" type="card">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs type="card">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <cl-tabs size="large" type="card">
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>


        <h4>extra and align</h4>
        <cl-tabs size="large" type="card" align="left">
            <div slot="extra">extra</div>
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>
        <cl-tabs size="large" type="card" align="center">
            <div slot="extra">extra</div>
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>
        <cl-tabs size="large" type="card" align="right">
            <div slot="extra">extra</div>
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>

        <h4>border</h4>
        <cl-tabs size="large" type="card" border>
            <div slot="extra">extra</div>
            <cl-tab-pane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </cl-tab-pane>
            <cl-tab-pane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </cl-tab-pane>
            <cl-tab-pane label="标签三" c-key="3">
                label333-content
            </cl-tab-pane>
            <cl-tab-pane label="标签四" c-key="4">
                label444-content
            </cl-tab-pane>
        </cl-tabs>
    </div>
</template>

<script>
  export default {
    name: "TabsView",
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
