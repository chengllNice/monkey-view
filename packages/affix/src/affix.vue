<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__slot`]" ref="affixSlot" :style="slotStyle">
            <slot></slot>
        </div>
        <!--占位元素-->
        <div :class="[`${classPrefix}__seat`]" v-show="!fix && showSeat" :style="seatStyle"></div>
    </div>
</template>

<script>
    import {on, off} from "main/utils/dom";
    import Config from 'main/config/config'

    export default {
        name: "Affix",
        props: {
            //监听滚动元素的类名，需要给当前指定元素添加定位
            target: {
                type: String
            },
            top: {
                type: [String, Number],
                default: 0
            },
            bottom: String, Number,
            //是否固定在指定位置，不随滚动改变
            fix: Boolean,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-affix',
                defaultSlotStyle: {
                    width: 0,
                    height: 0,
                    top: 0,
                    position: 'fixed',//定位类型，默认为固定，如果设置了target元素则相对于target元素定位，类型为absolute
                },
                slotStyle: {},
                showSeat: false,//是否显示占位元素，如果监听对象为window时需要
                targetElement: null,//监听滚动的元素
                defaultAffixOnTargetPosition: null,//初始化时图钉距离滚动元素的位置
            }
        },
        computed: {
            seatStyle() {
                return {
                    width: parseFloat(this.slotStyle.width) + 'px',
                    height: parseFloat(this.slotStyle.height) + 'px',
                }
            },
            affixPositionType(){
                return this.bottom !== undefined ? 'bottom' : 'top'
            },
        },
        mounted() {
            this.$nextTick(() => {
                let target = window;
                if (this.target) {
                    target = document.getElementsByClassName(this.target)[0];
                }
                this.targetElement = target;
                this.setTargetElementPostion();
                this.getSlotStyle();
                if(!this.fix){
                    on(target, 'scroll', this.scrollHandler);
                    on(target, 'size', this.scrollHandler);
                }
                this.scrollHandler();
            });
        },
        destroyed() {
            !this.fix && this.targetElement && off(this.targetElement, 'scroll', this.scrollHandler);
            !this.fix && this.targetElement && off(this.targetElement, 'size', this.scrollHandler);
        },
        methods: {
            //设置target元素的定位属性
            setTargetElementPostion() {
                if (this.target) {
                    let targetElement = this.targetElement;
                    let targetPosition = window.getComputedStyle && window.getComputedStyle(targetElement, null)['position'];
                    targetPosition = targetElement.currentStyle && targetElement.currentStyle['position'];
                    if (!['relative', 'absolute'].includes(targetPosition)) targetElement.style.position = 'relative';
                }
            },
            //获取图钉的宽高
            getSlotStyle() {
                this.defaultSlotStyle.width = this.$refs.affixSlot.clientWidth;
                this.defaultSlotStyle.height = this.$refs.affixSlot.clientHeight;
            },
            //滚动事件
            scrollHandler() {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let innerHeight = window.innerHeight;
                let winInnerHeight = window.innerHeight;
                if(this.target){
                    scrollTop = this.targetElement.scrollTop;
                    innerHeight = this.targetElement.offsetHeight;
                }

                let affixOnTargetPosition = this.updateAffixOnTargetBoundingClientRect();
                let targetPosition = this.updateTargetBoundingClientRect();
                let top = targetPosition.top + parseInt(this.top);
                let bottom = winInnerHeight - targetPosition.bottom + parseInt(this.bottom);
                if(!this.defaultAffixOnTargetPosition){
                    this.defaultAffixOnTargetPosition = JSON.parse(JSON.stringify(affixOnTargetPosition));
                }


                if(this.affixPositionType === 'top'){
                    if(this.defaultAffixOnTargetPosition.top - scrollTop <= parseInt(this.top) || this.fix){
                        this.slotStyle = Object.assign({}, this.defaultSlotStyle);
                        this.slotStyle.top = top + 'px';
                        this.slotStyle.bottom = 'auto';
                        this.showSeat = true;
                    }else{
                        this.slotStyle = {};
                        this.showSeat = false;
                    }
                }else if(this.affixPositionType === 'bottom'){
                    let bottomFlag = Math.abs(this.defaultAffixOnTargetPosition.top - innerHeight) - scrollTop + this.defaultSlotStyle.height + parseInt(this.bottom);
                    if((affixOnTargetPosition.top > this.defaultAffixOnTargetPosition.top) || bottomFlag >= 0 || this.fix){
                        this.slotStyle = Object.assign({}, this.defaultSlotStyle);
                        this.slotStyle.top = 'auto';
                        this.slotStyle.bottom = bottom + 'px';
                        this.showSeat = true;
                    }else{
                        this.slotStyle = {};
                        this.showSeat = false;
                    }
                }
            },

            // 更新图钉在窗口中的位置
            updateAffixBoundingClientRect(){
                let rect = this.$refs.affixSlot.getBoundingClientRect();
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                return {
                    top: Math.round(rect.top) + scrollTop,
                    bottom: Math.round(rect.bottom) + scrollTop
                }
            },
            // 更新滚动元素在窗口中的位置
            updateTargetBoundingClientRect(){
                let top = 0;
                let bottom = 0;
                if(this.target){
                    let rect = this.targetElement.getBoundingClientRect();
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    top = Math.round(rect.top) + scrollTop;
                    bottom = Math.round(rect.bottom) + scrollTop;
                }
                return {
                    top: top,
                    bottom: bottom,
                }
            },
            // 更新图钉相对于滚动元素的位置
            updateAffixOnTargetBoundingClientRect(){
                let disTop = this.updateAffixBoundingClientRect().top - this.updateTargetBoundingClientRect().top;
                let disBottom = this.updateAffixBoundingClientRect().bottom - this.updateTargetBoundingClientRect().bottom;
                return {
                    top: disTop,
                    bottom: disBottom
                }
            },
        },
        watch: {
            showSeat(newVal){
                this.$emit('change', newVal);
            }
        }
    }
</script>
