<template>
    <transition name="MessageFade" @after-leave="handleAfterLeave">
        <div class="cl-message"
             :class="[
                type && `cl-message--${type}`,
                background && `cl-message--background`
             ]"
             :style="expandStyle"
             v-show="visible"
             @mouseenter="clearTimer"
             @mouseleave="startTimer">
            <i class="cl-message__icon" :class="iconClass" v-if="iconClass"></i>
            <span class="cl-message__content" v-html="content"></span>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ClMessage",
        data() {
            return {
                visible: false,
                type: 'info',
                content: '',
                duration: 3000,
                top: 20,
                currentPosition: 20,
                timer: null,
                closed: false,
                background: false,
            }
        },
        computed: {
            iconClass() {
                let result;
                switch (this.type) {
                    case 'info':
                        result = 'cl-icon-info-fill';
                        break;
                    case 'success':
                        result = 'cl-icon-success-fill';
                        break;
                    case 'warning':
                        result = 'cl-icon-warning-fill';
                        break;
                    case 'error':
                        result = 'cl-icon-remove-fill';
                        break;
                    case 'loading':
                        result = 'cl-rotate cl-icon-loading';
                        break;
                    default:
                        result = 'cl-icon-question-fill';
                        break;
                }
                return result;
            },
            expandStyle() {
                return {top: parseFloat(this.currentPosition) + 'px'}
            }
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {
            show() {
                this.visible = true;
                this.startTimer();
            },
            close() {
                this.closed = true;
                this.visible = false;
                this.onCloseComputed();
                this.onClose();
            },
            onClose() {
            },
            onCloseComputed() {
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
        },
        beforeDestroy() {

        }
    }
</script>
