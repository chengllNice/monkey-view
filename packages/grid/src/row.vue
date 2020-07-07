<template>
    <div :class="rowClass" :style="rowStyle">
        <slot></slot>
        <!--<div style="clear: both;"></div>-->
    </div>
</template>

<script>
    import {findComponentDirectChildrens} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'

    export default {
        name: "Row",
        mixins: [Emitter],
        props: {
            type: {
                type: String,
                validator(value) {
                    return ['flex'].includes(value)
                }
            },
            align: {
                type: String,
                validator(value) {
                    return ['top', 'middle', 'bottom'].includes(value)
                }
            },
            justify: {
                type: String,
                validator(value) {
                    return ['start', 'end', 'center', 'space-around', 'space-between'].includes(value)
                }
            },
            gutter: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                componentName: 'Row',
            }
        },
        computed: {
            rowClass() {
                let classList = [
                    'cl-row',
                    {
                        [`cl-row--${this.type}`]: this.type,
                        [`cl-row--flex-${this.align}`]: this.align,
                        [`cl-row--flex-${this.justify}`]: this.justify,
                    },
                ];
                if ((this.align || this.justify) && !this.type) {
                    classList.push(`cl-row--flex`)
                }
                return classList;
            },
            rowStyle() {
                let style = {};
                if (this.gutter) {
                    style = {
                        marginLeft: -(this.gutter / 2) + 'px',
                        marginRight: -(this.gutter / 2) + 'px',
                    }
                }
                return style;
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$on('on-update-span', () => {
                this.initNoSetColChildrenSpan();//设置没有设置span的col
            })
        },
        methods: {
            initNoSetColChildrenSpan() {
                let colChildren = findComponentDirectChildrens(this, 'ClCol');
                let allSpan = 0;//所有span之和
                let noSpanComponents = [];//没有设置span的元素（不包括设置为0的）
                let noSpanComponentsNum = 0;
                colChildren.forEach(item => {
                    if (item.currentSpan !== -1) allSpan += parseFloat(item.currentSpan);
                    else noSpanComponents.push(item);
                });
                noSpanComponentsNum = noSpanComponents.length;

                // 还有剩余空间可分配
                let freeSpace = 24 - parseFloat(allSpan);//剩余空间量
                if (freeSpace >= 1) {
                    let average = Math.floor(freeSpace / noSpanComponentsNum);
                    let _average = Math.floor(freeSpace % noSpanComponentsNum);//求余数，把余数的剩余量全部给最后一个元素
                    // 如果剩余空间按平均分配不足，则全局分配给第一个元素
                    if (average < 1) {
                        noSpanComponents[0].currentSpan = freeSpace;
                    } else {
                        noSpanComponents.forEach((item, index) => {
                            if (index === noSpanComponentsNum - 1 && _average >= 1) {
                                item.currentSpan = average + _average;
                            } else {
                                item.currentSpan = average;
                            }
                        })
                    }
                }
            }
        }
    }
</script>
