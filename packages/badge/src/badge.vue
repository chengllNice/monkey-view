<template>
    <div :class="[
        `${classPrefix}`,
        dot && `${classPrefix}--dot`,
        status && `${classPrefix}--status ${classPrefix}--status-${status}`,
        alone && `${classPrefix}--alone`,
        isColor && `${classPrefix}--${color}`
    ]">
        <slot v-if="!status"></slot>
        <sup :class="[`${classPrefix}__sup`]" :style="supStyle" v-if="supShow" :title="supTitle">{{supText}}</sup>
        <span :class="[`${classPrefix}__status-text`]" v-if="status">{{text}}</span>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: 'Badge',
        props: {
            dot: Boolean,
            count: [Number, String],
            overflowCount: {
                type: Number,
                default: 99
            },
            showZero: Boolean, // 默认0时不展示
            text: String,
            status: {
                type: String,
                validator(value) {
                    return ['success', 'error', 'warning', 'processing', 'default'].includes(value)
                }
            },
            color: String,
            offset: Array,
            title: String
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-badge'
            }
        },
        computed: {
            // 状态点 或者 上标的显示
            supShow() {
                return !!this.status || this.showZero || parseFloat(this.count) !== 0
            },
            supText() {
                let text = this.count !== undefined && this.count;
                if (this.dot || this.status) text = ''
                else if (this.text) text = this.text
                else if (parseFloat(this.count) > this.overflowCount) text = this.overflowCount + '+'
                return text;
            },
            isColor() {
                if (this.status) return false;
                return ['primary', 'success', 'error', 'info', 'warning'].includes(this.color);
            },
            supStyle() {
                let style = {};
                if (!this.isColor) {
                    style = {
                        'background-color': this.color
                    };
                }
                if (Array.isArray(this.offset) && this.offset.length) {
                    const x = parseFloat(this.offset[0]);
                    const y = parseFloat(this.offset[1]);
                    style = {
                        ...style,
                        'margin-top': y + 'px',
                        'margin-right': x + 'px'
                    }
                }
                return style;
            },
            alone() {
                return !this.$slots.default
            },
            supTitle() {
                if (this.dot || this.status) return '';
                return this.title || this.text || parseFloat(this.count)
            }
        }
    }
</script>
