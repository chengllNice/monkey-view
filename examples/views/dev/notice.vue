<template>
    <div class="dev-notice">
        <Button @click="openNotice('open')">open notice</Button>
        <Button @click="openNotice('open', true, 0)">open notice 0ms</Button>
        <Button type="success" @click="openNotice('success', true)">success</Button>
        <Button type="danger" @click="openNotice('error', true)">error</Button>
        <Button type="warning" @click="openNotice('warning', true)">warning</Button>
        <Button type="info" @click="openNotice('info', true)">info</Button>

        <Button @click="openNotice('open')">only title</Button>
        <Button type="success" @click="openNotice('success')">success only title</Button>
        <Button type="danger" @click="openNotice('error')">error only title</Button>
        <Button type="warning" @click="openNotice('warning')">warning only title</Button>
        <Button type="info" @click="openNotice('info')">info only title</Button>

        <Button type="success" @click="openNotice('success', true, 5000, true)">success background</Button>
        <Button type="danger" @click="openNotice('error', true, 5000, true)">error background</Button>
        <Button type="warning" @click="openNotice('warning', true, 5000, true)">warning background</Button>
        <Button type="info" @click="openNotice('info', true, 5000, true)">info background</Button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 0
            }
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
            openNotice(type, isContent, duration, background) {
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
