<template>
    <div class="dev-message">
        <Button type="primary" @click="openMessage('info', 0)">不关闭，手动5s后关闭</Button>
        <Button type="info" @click="openMessage('info')">info</Button>
        <Button type="success" @click="openMessage('success')">success</Button>
        <Button type="warning" @click="openMessage('warning')">warning</Button>
        <Button type="danger" @click="openMessage('error')">error</Button>
        <Button @click="openMessage('loading')">loading</Button>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$Message.config({
                top: 40,
                duration: 4000,
                messageItemDis: 30
            })
        },
        methods: {
            openMessage(type, duration) {
                // this.$Message[type]('this is a message', 5000);
                const a = this.$Message[type]({
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
