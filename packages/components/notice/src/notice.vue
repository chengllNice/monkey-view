<template>
    <transition name="DrawerMoveRight" @after-leave="handleAfterLeave">
        <div class="cl-notice"
             :class="[
                type && type !== 'open' && 'cl-notice--icon',
                isOnlyTitle && 'cl-notice--only-title',
             ]"
             :style="noticeStyle"
             v-show="visible">
            <span class="cl-notice__icon" v-if="type && type !== 'open'"><i :class="iconClass"></i></span>
            <div class="cl-notice__title" v-if="title">
                {{title}}
            </div>
            <div class="cl-notice__content" v-if="content" v-html="content"></div>
            <div class="cl-notice__close" v-if="closable" @click="handlerClose">
                <slot name="close"><i class="cl-icon-close"></i></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ClNotice",
        data() {
            return {
                type: 'open',//默认值
                isOnlyTitle: false,//是否只有标题
                title: '',
                content: '',
                duration: 0,
                closable: true,
                top: 85,
                currentTop: 85,
                width: '350px',
                visible: false,
                closed: false,
                onCloseComputed: function () {},
                onClose: function () {},
            }
        },
        computed: {
            noticeStyle(){
                return {top: parseFloat(this.currentTop) + 'px', right: 0, width: parseFloat(this.width) + 'px'}
            },
            iconClass(){
                let icon = '';
                switch (this.type) {
                    case 'success':
                        icon = !this.isOnlyTitle ? 'cl-icon-circle-success' : 'cl-icon-circle-success-solid';
                        break;
                    case 'error':
                        icon = !this.isOnlyTitle ? 'cl-icon-circle-close' : 'cl-icon-circle-close-solid';
                        break;
                    case 'warning':
                        icon = !this.isOnlyTitle ? 'cl-icon-warning' : 'cl-icon-warning-solid';
                        break;
                    case 'info':
                        icon = !this.isOnlyTitle ? 'cl-icon-info' : 'cl-icon-info-solid';
                        break;
                }
                return icon
            }
        },
        components: {},
        created() {
        },
        mounted() {
            // this.$nextTick(()=>{
            //     this.show();
            // });
        },
        methods: {
            handlerClose(){
                this.close();
            },
            show(){
                this.visible = true;
                this.startTimer();
            },
            close(){
                this.closed = true;
                this.visible = false;
                this.onCloseComputed();
                this.onClose();
            },
            startTimer(){
                if(this.duration > 0){
                    this.timer = setTimeout(()=>{
                        !this.closed && this.close();
                    }, this.duration)
                }
            },
            clearTimer(){
                this.timer && clearTimeout(this.timer);
            },
            handleAfterLeave(){
                this.clearTimer();
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
</script>
