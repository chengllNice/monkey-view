<template>
    <transition :name="transitionName" @after-leave="handleAfterLeave">
        <div :class="[
                 `${classPrefix}`,
                  type && type !== 'open' && `${classPrefix}--${type}`,
                  type && type !== 'open' && `${classPrefix}--type`,
                  isOnlyTitle && `${classPrefix}--only-title`,
                  placement && `${classPrefix}--${placement}`,
                  background && `${classPrefix}--background`,
             ]"
             :style="noticeStyle"
             v-show="visible">
            <span :class="[`${classPrefix}__icon`]" v-if="type && type !== 'open'">
                <Icon :type="iconType"></Icon>
            </span>
            <div :class="[`${classPrefix}__title`]" v-if="title">
                {{title}}
            </div>
            <div :class="[`${classPrefix}__content`]" v-if="content" v-html="content"></div>
            <div :class="[`${classPrefix}__close`]" v-if="closable" @click="handleClose">
                <slot name="close">
                    <Icon type="close"></Icon>
                </slot>
            </div>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: 'Notice',
        data() {
            return {
                classPrefix: Config.classPrefix + '-notice',
                placement: '', // 出现的位置
                type: 'open', // 默认值
                isOnlyTitle: false, // 是否只有标题
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
                onCloseComputed: function () {},
                onClose: function () {}
            }
        },
        computed: {
            noticeStyle() {
                let left = 0;
                let right = 0;
                let top = 0;
                let bottom = 0;
                const width = this.width;

                if (['topLeft', 'bottomLeft'].includes(this.placement)) {
                    left = 0;
                    right = 'auto';
                }
                if (['topRight', 'bottomRight'].includes(this.placement)) {
                    left = 'auto';
                    right = 0;
                }
                if (['bottomRight', 'bottomLeft'].includes(this.placement)) {
                    bottom = this.currentPosition + 'px';
                    top = 'auto';
                }
                if (['topRight', 'topLeft'].includes(this.placement)) {
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
                if (['topLeft', 'bottomLeft'].includes(this.placement)) {
                    name = 'DrawerMoveLeft'
                } else {
                    name = 'DrawerMoveRight'
                }
                return name;
            },
            iconType() {
                let icon = '';
                switch (this.type) {
                    case 'success':
                        icon = !this.isOnlyTitle ? 'success' : 'success-fill';
                        break;
                    case 'error':
                        icon = !this.isOnlyTitle ? 'error' : 'error-fill';
                        break;
                    case 'warning':
                        icon = !this.isOnlyTitle ? 'warning' : 'warning-fill';
                        break;
                    case 'info':
                        icon = !this.isOnlyTitle ? 'info' : 'info-fill';
                        break;
                }
                return icon
            }
        },
        components: {
            Icon
        },
        methods: {
            handleClose() {
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
