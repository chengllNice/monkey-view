<template>
    <div class="NoticeView">
        <cl-button @click="openNotice('open')">open notice</cl-button>
        <cl-button @click="openNotice('open', true, 0)">open notice 0ms</cl-button>
        <cl-button type="success" @click="openNotice('success', true)">success</cl-button>
        <cl-button type="danger" @click="openNotice('error', true)">error</cl-button>
        <cl-button type="warning" @click="openNotice('warning', true)">warning</cl-button>
        <cl-button type="info" @click="openNotice('info', true)">info</cl-button>

        <cl-button @click="openNotice('open')">only title</cl-button>
        <cl-button type="success" @click="openNotice('success')">success only title</cl-button>
        <cl-button type="danger" @click="openNotice('error')">error only title</cl-button>
        <cl-button type="warning" @click="openNotice('warning')">warning only title</cl-button>
        <cl-button type="info" @click="openNotice('info')">info only title</cl-button>


        <cl-button type="success" @click="openNotice('success', true, 5000, true)">success background</cl-button>
        <cl-button type="danger" @click="openNotice('error', true, 5000, true)">error background</cl-button>
        <cl-button type="warning" @click="openNotice('warning', true, 5000, true)">warning background</cl-button>
        <cl-button type="info" @click="openNotice('info', true, 5000, true)">info background</cl-button>
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
        this.$Notice.config({
            top: 40,
            duration: 1000,
            noticeItemDis: 30,
            placement: 'topRight'
        })
    },
    methods: {
        openNotice(type, isContent, duration, background){
            this.$Notice[type]({
                title: `通知标题--title--${this.num++}`,
                content: isContent ? '通知内容--content' : '',
                duration: duration !== undefined ? duration : 4500,
                background: background
            })
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>
