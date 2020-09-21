<template>
    <vuescroll :class="[`${classPrefix}`]" :ops="options" ref="vuescroll">
        <slot></slot>
    </vuescroll>
</template>

<script>
    import Config from 'main/config/config'
    import vuescroll from 'vuescroll';

    export default {
        name: "Scroll",
        props: {
            size: String,
            scrollOption: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-scroll',
                ops: {
                    vuescroll: {
                        mode: 'native',
                        sizeStrategy: 'percent',
                        detectResize: true,
                    },
                    scrollPanel: {
                        initialScrollY: false,//只要组件mounted之后自动滚动的距离
                        initialScrollX: false,
                        scrollingX: true,//是否启用 x 或者 y 方向上的滚动
                        scrollingY: true,
                        speed: 300,
                        easing: undefined,
                        verticalNativeBarPos: 'right'
                    },
                    rail: {
                        background: '#cecece',//轨道的背景色
                        opacity: 0,//轨道的透明度
                        size: '6px',//轨道的尺寸
                        specifyBorderRadius: false,//是否指定轨道的 borderRadius， 如果不那么将会自动设置
                        gutterOfEnds: null,//轨道距 x 和 y 轴两端的距离
                        gutterOfSide: '1px',//距离容器的距离
                        keepShow: false,//是否即使 bar 不存在的情况下也保持显示
                    },
                    bar: {
                        showDelay: 500,//在鼠标离开容器后多长时间隐藏滚动条
                        onlyShowBarOnScroll: true,//是否只在滚动时显示 bar
                        keepShow: false,//滚动条是否保持显示
                        background: '#c1c1c1',//滚动条背景色
                        opacity: 1,//滚动条透明度
                        hoverStyle: false,
                        specifyBorderRadius: false,//是否指定滚动条的 borderRadius， 如果不那么和轨道的保持一致
                        minSize: false,
                        size: '6px',
                        disable: false,//是否禁用滚动条
                    }
                }
            }
        },
        computed: {
            options() {
                let ops = JSON.parse(JSON.stringify(this.ops));
                if (this.size === 'small') {
                    ops.bar.size = '4px'
                }
                Object.keys(this.scrollOption).forEach(key => {
                    Object.keys(this.scrollOption[key]).forEach(_key => {
                        ops[key][_key] = this.scrollOption[key][_key]
                    })
                });
                return Object.assign({}, ops);
            }
        },
        components: {
            vuescroll
        },
        methods: {
            scrollTo(position, speed = 500) {
                this.$refs.vuescroll.scrollTo(position, speed)
            }
        }
    }
</script>
