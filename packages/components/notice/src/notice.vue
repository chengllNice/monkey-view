<template>
    <transition :name="transitionName" @after-leave="handleAfterLeave">
        <div class="cl-notice"
             :class="[
                type && type !== 'open' && `cl-notice--${type}`,
                type && type !== 'open' && `cl-notice--type`,
                isOnlyTitle && 'cl-notice--only-title',
                placement && `cl-notice--${placement}`,
                background && `cl-notice--background`,
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
                placement: '',//出现的位置
                type: 'open',//默认值
                isOnlyTitle: false,//是否只有标题
                title: '',
                content: '',
                duration: 0,
                background: false,
                closable: true,
                top: 85,
                currentPosition: 85,
                width: '350px',
                visible: false,
                closed: false,
                timer: null,
                onCloseComputed: function () {
                },
                onClose: function () {
                },
            }
        },
        computed: {
            noticeStyle() {
                let left = 0;
                let right = 0;
                let top = 0;
                let bottom = 0;
                let width = this.width;

                if(['topLeft', 'bottomLeft'].includes(this.placement)){
                    left = 0;
                    right = 'auto';
                }
                if(['topRight', 'bottomRight'].includes(this.placement)){
                    left = 'auto';
                    right = 0;
                }
                if(['bottomRight', 'bottomLeft'].includes(this.placement)){
                    bottom = this.currentPosition + 'px';
                    top = 'auto';
                }
                if(['topRight', 'topLeft'].includes(this.placement)){
                    top = this.currentPosition + 'px';
                    bottom = 'auto';
                }
                return {
                    top: top,
                    bottom: bottom,
                    left: left,
                    right: right,
                    width: width
                }
            },
            transitionName() {
                let name = '';
                if(['topLeft', 'bottomLeft'].includes(this.placement)){
                    name = 'DrawerMoveLeft'
                }else{
                    name = 'DrawerMoveRight'
                }
                return name;
            },
            iconClass() {
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
            handlerClose() {
                this.close();
            },
            show() {
                this.visible = true;
                this.startTimer();
            },
            close() {
                this.closed = true;
                this.visible = false;
                this.onCloseComputed(this.placement);
                this.onClose();
            },
            startTimer() {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        !this.closed && this.close();
                    }, this.duration)
                }
            },
            clearTimer() {
                this.timer && clearTimeout(this.timer);
            },
            handleAfterLeave() {
                this.clearTimer();
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
</script>
