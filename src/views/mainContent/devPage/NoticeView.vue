<template>
    <div class="NoticeView">
        <cl-button @click="openNotice('open')">open notice</cl-button>
        <cl-button @click="openNotice('open', true, 0)">open notice 0ms</cl-button>
        <cl-button @click="openNotice('success', true)">success</cl-button>
        <cl-button @click="openNotice('error', true)">error</cl-button>
        <cl-button @click="openNotice('warning', true)">warning</cl-button>
        <cl-button @click="openNotice('info', true)">info</cl-button>

        <cl-button @click="openNotice('open')">only title</cl-button>
        <cl-button @click="openNotice('success')">success only title</cl-button>
        <cl-button @click="openNotice('error')">error only title</cl-button>
        <cl-button @click="openNotice('warning')">warning only title</cl-button>
        <cl-button @click="openNotice('info')">info only title</cl-button>
    </div>
</template>

<script>
  export default {
    name: "NoticeView",
    data() {
      return {
          num: 0
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
        openNotice(type, isContent, duration){
            this.$Notice[type]({
                title: `通知标题--title--${this.num++}`,
                content: isContent ? '通知内容--content' : '',
                duration: duration || 4500
            })
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>
