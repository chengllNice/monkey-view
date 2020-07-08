<template>
    <div :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'

    const responseSize = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    export default {
        name: "Col",
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
                classPrefix: Config.classPrefix + '-col',
                componentName: 'Col',
                currentSpan: currentSpan,
                parentRow: findComponent(this, 'Row'),
                gutter: 0,
            }
        },
        computed: {
            colClass() {
                let classList = [
                    `${this.classPrefix}`,
                    {
                        [`${this.classPrefix}--span-${this.currentSpan}`]: this.currentSpan !== -1,
                        [`${this.classPrefix}--order-${this.order}`]: this.order,
                        [`${this.classPrefix}--offset-${this.offset}`]: this.offset,
                        [`${this.classPrefix}--push-${this.push}`]: this.push,
                        [`${this.classPrefix}--pull-${this.pull}`]: this.pull,
                    }
                ];
                responseSize.forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`${this.classPrefix}--span-${size}-${this[size]}`);
                    } else if (typeof this[size] === 'object') {
                        let sizeObj = this[size];
                        Object.keys(sizeObj).forEach(key => {
                            classList.push(`${this.classPrefix}--${key}-${size}-${sizeObj[key]}`)
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
                this.parentEmit('Row', 'on-update-span');
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
