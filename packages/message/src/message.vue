<template>
    <transition name="MessageFade" 1>
        <div :class="[
                 `${classPrefix}`,
                 type && `${classPrefix}--${type}`,
                 background && `${classPrefix}--background`
             ]"
             :style="expandStyle"
             v-show="visible"
             @mouseenter="clearTimer"
             @mouseleave="startTimer">
            <Icon v-if="iconType"
                  :type="iconType"
                  :class="[
                      `${classPrefix}__icon`,
                      type === 'loading' && `animation-rotate`,
                  ]">
            </Icon>
            <span :class="[`${classPrefix}__content`]" v-html="content"></span>
            <Icon v-if="closable"
                  type="close"
                  :class="[`${classPrefix}__icon-closable`]" @click="close">
            </Icon>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: 'Message',
        data() {
            return {
                classPrefix: Config.classPrefix + '-message',
                visible: false,
                type: 'info',
                content: '',
                duration: 3000,
                top: 20,
                currentPosition: 20,
                timer: null,
                closed: false,
                background: false,
                closable: false
            }
        },
        computed: {
            iconType() {
                let result;
                switch (this.type) {
                    case 'info':
                        result = 'info-fill';
                        break;
                    case 'success':
                        result = 'success-fill';
                        break;
                    case 'warning':
                        result = 'warning-fill';
                        break;
                    case 'error':
                        result = 'error-fill';
                        break;
                    case 'loading':
                        result = 'loading';
                        break;
                    default:
                        result = 'question-fill';
                        break;
                }
                return result;
            },
            expandStyle() {
                return { top: parseFloat(this.currentPosition) + 'px' }
            }
        },
        components: {
            Icon
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
            onClose() {},
            onCloseComputed() {},
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
