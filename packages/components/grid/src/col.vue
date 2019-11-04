<template>
    <div :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
    import {findBrothersComponents, findComponent} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'

    const responseSize = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    export default {
        name: "ClCol",
        mixins: [Emitter],
        props: {
            span: [Number, String],
            order: [Number, String],
            offset: [Number, String],
            push: [Number, String],
            pull: [Number, String],
            xs: [Number, Object],
            sm: [Number, Object],
            md: [Number, Object],
            lg: [Number, Object],
            xl: [Number, Object],
            xxl: [Number, Object],
        },
        data() {
            const currentSpan = (!this.span && this.span !== 0 || parseFloat(this.span) < 0) ? -1 : Math.floor(this.span);

            return {
                componentName: 'ClCol',
                currentSpan: currentSpan,
                parentRow: findComponent(this, 'ClRow'),
                gutter: 0,
            }
        },
        computed: {
            colClass() {
                let classList = [
                    'cl-col',
                    {
                        [`cl-col--span-${this.currentSpan}`]: this.currentSpan !== -1,
                        [`cl-col--order-${this.order}`]: this.order,
                        [`cl-col--offset-${this.offset}`]: this.offset,
                        [`cl-col--push-${this.push}`]: this.push,
                        [`cl-col--pull-${this.pull}`]: this.pull,
                    }
                ];
                responseSize.forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`cl-col--span-${size}-${this[size]}`);
                    } else if (typeof this[size] === 'object') {
                        let sizeObj = this[size];
                        Object.keys(sizeObj).forEach(key => {
                            classList.push(`cl-col--${key}-${size}-${sizeObj[key]}`)
                        })
                    }
                });
                return classList;
            },
            colStyle() {
                let style = {};
                if (this.gutter) {
                    style = {
                        paddingLeft: this.gutter / 2 + 'px',
                        paddingRight: this.gutter / 2 + 'px',
                    }
                }
                return style;
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.updateGutter(this.parentRow && this.parentRow.gutter);
                this.parentEmit('ClRow', 'on-update-span');
            })
        },
        methods: {
            updateGutter(value) {
                this.gutter = value;
            }
        },
        watch: {
            'parentRow.gutter': function (newVal) {
                this.updateGutter(newVal);
            }
        }
    }
</script>
