<template>
    <transition name="fade">
        <div :class="[
                `${classPrefix}`,
                size && `${classPrefix}--${size}`,
                (fix || fullscreen) && `${classPrefix}--fix`,
                fullscreen && `${classPrefix}--fullscreen`,
             ]"
             v-if="showLoading">
            <div :class="[`${classPrefix}__content`]">
                <slot>
                    <Icon v-if="type === 'loading1'" type="loading" :class="[`animation-rotate`, `${classPrefix}__icon-font`]"></Icon>
                    <loading-svg :color="color" :type="type" :size="size" :class="[`${classPrefix}__icon-svg`]"
                                 v-else-if="showLoadingSvg"></loading-svg>
                    <div v-else :class="[`${classPrefix}__icon`]"></div>
                </slot>
                <div :class="[`${classPrefix}__text`]" v-if="text || $slots.text">
                    <slot name="text">{{text}}</slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config'
    import LoadingSvg from './loading-svg'
    import Icon from 'packages/icon'

    export default {
        name: "Loading",
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['default', 'loading1', 'loading2', 'loading3', 'loading4', 'loading5'].includes(value);
                }
            },
            color: String,
            text: String,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            fix: {
                type: Boolean,
                default: false,
            },//固定 此时会相对于最近的定位父及元素定位 如果没有定位父及元素则相对于body定位
            fullscreen: {
                type: Boolean,
                default: false,
            },//覆盖整个屏幕
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-loading',
                showLoading: this.visible
            }
        },
        computed: {
            showLoadingSvg() {
                return ['loading2', 'loading3', 'loading4', 'loading5'].includes(this.type)
            }
        },
        components: {
            LoadingSvg,
            Icon
        },
        methods: {
            show() {
                this.showLoading = true;
            },
            close() {
                this.showLoading = false;
            }
        },
        watch: {
            visible(newVal) {
                this.showLoading = newVal;
            }
        }
    }
</script>
