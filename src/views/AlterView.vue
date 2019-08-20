<template>
    <div class="AlterView">
        <ClAlter>alter</ClAlter>
        <ClAlter type="success">success</ClAlter>
        <ClAlter type="error">error</ClAlter>
        <ClAlter type="warning">warning</ClAlter>

        <p>含描述信息</p>
        <ClAlter>
            alter
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="success">
            success
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="error">
            error
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="warning">
            warning
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>

        <p>带icon</p>
        <ClAlter type="info" show-icon>An info prompt</ClAlter>
        <ClAlter type="success" show-icon>An info prompt</ClAlter>
        <ClAlter type="error" show-icon>An info prompt</ClAlter>
        <ClAlter type="warning" show-icon>An info prompt</ClAlter>
        <ClAlter type="info" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="success" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="error" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="warning" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
        <ClAlter type="warning" show-icon>
            <i slot="icon" class="cl-icon-horn"></i>
            custom icon
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>

        <p>可关闭</p>
        <ClAlter closable>An info prompt</ClAlter>
        <ClAlter closable show-icon>An info prompt</ClAlter>
        <ClAlter type="info" show-icon closable>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>

        <p>自定义关闭内容</p>
        <ClAlter closable>
            An info prompt
            <span slot="close">close</span>
        </ClAlter>

        <p>主题dark</p>
        <ClAlter effect="dark">An info prompt</ClAlter>
        <ClAlter type="success" effect="dark">An info prompt</ClAlter>
        <ClAlter type="error" effect="dark">An info prompt</ClAlter>
        <ClAlter type="warning" effect="dark">An info prompt</ClAlter>
        <ClAlter show-icon closable effect="dark">
            An info prompt
            <span slot="close">close</span>
        </ClAlter>
        <ClAlter closable show-icon effect="dark">
            An info prompt
            <span slot="close">close</span>
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </ClAlter>
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
