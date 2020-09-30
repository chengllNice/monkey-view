<template>
    <transition name="fade">
        <div v-show="visible" :class="[`${classPrefix}`]" :style="backTopStyle" @click="backTopClick">
            <slot>
                <div :class="[`${classPrefix}__inner`]">
                    <Icon type="up"></Icon>
                </div>
            </slot>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config';
    import Icon from 'packages/icon';
    import { on, off, scrollTop } from 'main/utils/dom';

    export default {
        name: 'BackTop',
        props: {
            // 设置需要监听滚动的元素的类名，此类名需要唯一
            target: {
                type: String,
                default: ''
            },
            // 设置触发显示的高度
            height: {
                type: [String, Number],
                default: 400
            },
            bottom: {
                type: [String, Number],
                default: 30
            },
            right: {
                type: [String, Number],
                default: 30
            },
            duration: {
                type: Number,
                default: 1000
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-back-top',
                visible: false,
                targetElement: null// 监听滚动的元素
            }
        },
        computed: {
            backTopStyle() {
                return {
                    bottom: parseInt(this.bottom) + 'px',
                    right: parseInt(this.right) + 'px'
                }
            }
        },
        components: {
            Icon
        },
        mounted() {
            this.$nextTick(() => {
                let target = window;
                if (this.target) {
                    target = document.getElementsByClassName(this.target)[0];
                }
                this.targetElement = target;
                on(target, 'scroll', this.handleScroll);
                on(target, 'size', this.handleScroll);
            });
        },
        destroyed() {
            this.targetElement && off(this.targetElement, 'scroll', this.handleScroll);
            this.targetElement && off(this.targetElement, 'size', this.handleScroll);
        },
        methods: {
            handleScroll() {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (this.target) {
                    scrollTop = this.targetElement.scrollTop;
                }
                this.visible = scrollTop >= parseInt(this.height);
            },
            backTopClick() {
                let scrollTopForm = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (this.target) {
                    scrollTopForm = this.targetElement.scrollTop;
                }
                scrollTop(this.targetElement, scrollTopForm, 0, this.duration);
                this.$emit('click');
            }
        }
    }
</script>
