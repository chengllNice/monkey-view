<template>
    <transition name="fade">
        <div v-show="visible" class="cl-back-top" :style="backTopStyle" @click="backTopClick">
            <slot>
                <div class="cl-back-top__inner"><i class="cl-icon-up"></i></div>
            </slot>
        </div>
    </transition>
</template>

<script>
    import {on, off} from "../../../utils/dom";

    export default {
        name: "ClBackTop",
        props: {
            target: {
              type: String,
              default: ''
            },//设置需要监听滚动的元素的类名，此类名需要唯一
            height: {
                type: Number,
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
                visible: false,
                targetElement: null,//监听滚动的元素
            }
        },
        computed: {
            backTopStyle(){
                return {
                    bottom: parseInt(this.bottom) + 'px',
                    right: parseInt(this.right) + 'px',
                }
            }
        },
        mounted() {
            this.$nextTick(()=>{
                let target = window;
                if(this.target){
                    target = document.getElementsByClassName(this.target)[0];
                }
                this.targetElement = target;
                on(target, 'scroll', this.scrollHandler);
                on(target, 'size', this.scrollHandler);
            });
        },
        destroyed() {
            this.targetElement && off(this.targetElement, 'scroll', this.scrollHandler);
            this.targetElement && off(this.targetElement, 'size', this.scrollHandler);
        },
        methods: {
            scrollHandler() {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;
                if(this.target){
                    scrollTop = this.targetElement.scrollTop;
                }
                this.visible = scrollTop >= this.height;
            },
            backTopClick(){


                // if (!window.requestAnimationFrame) {
                //     window.requestAnimationFrame = (
                //         window.webkitRequestAnimationFrame ||
                //         window.mozRequestAnimationFrame ||
                //         window.msRequestAnimationFrame ||
                //         function (callback) {
                //             return window.setTimeout(callback, 1000/60);
                //         }
                //     );
                // }

                clearInterval(time);

                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;
                if(this.target){
                    scrollTop = this.targetElement.scrollTop;
                }
                console.log(scrollTop,'scrollTop')
                let allDuration = 450;
                let step = Math.ceil(scrollTop / allDuration);
                let duration = Math.ceil(allDuration / scrollTop);
                let time = setInterval(()=>{
                    if(scrollTop > 0){
                        scrollTop = scrollTop - step;
                        this.targetElement.scrollTop = scrollTop;
                    }else{
                        clearInterval(time);
                    }
                }, duration);

                this.$emit('on-click');
            }
        }
    }
</script>