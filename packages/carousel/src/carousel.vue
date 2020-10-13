<template>
    <div :class="carouselClass"
         @mouseenter="handleCarouselMouseenter"
         @mouseleave="handleCarouselMouseleave">
        <div :class="[`${classPrefix}__inner`]" ref="carouselInner" :style="carouselInnerStyle">
            <slot></slot>
        </div>
        <div :class="[`${classPrefix}__indicator`]">
            <div :class="[
                    `${classPrefix}__indicator-item`,
                    activeIndex === index && `${classPrefix}__indicator-item-active`,
                ]"
                 v-for="(item, index) in childrenList"
                 :key="index" :style="indicatorItemStyle"
                 @click="handleArrowClick(index)"
                 @mouseenter="handleArrowMouseenter(index)"
                 @mouseleave="handleArrowMouseleave(index)">{{item.label}}</div>
        </div>
        <div :class="[`${classPrefix}__arrow`, `${classPrefix}__arrow-prev`]" :style="arrowStyle"><Icon type="left"></Icon></div>
        <div :class="[`${classPrefix}__arrow`, `${classPrefix}__arrow-next`]" :style="arrowStyle"><Icon type="right"></Icon></div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: "Carousel",
        props: {
            value: {
                type: Number,
                default: 0
            },
            height: {
                type: [String, Number],
            },
            type: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['vertical', 'horizontal'].includes(value);
                }
            },
            autoplay: {
                type: Boolean,
            },
            interval: {
                type: Number,
                default: 3000
            },
            loop: {
                type: Boolean,
            },
            indicator: {
                type: String,
                default: 'inside',
                validator(value){
                    return ['outside', 'inside', 'none'].includes(value)
                }
            },
            indicatorStyle: {
                type: Object,
            },
            indicatorActiveStyle: {
                type: Object,
            },
            arrow: {
                type: String,
                default: 'hover',
                validator(value){
                    return ['always', 'hover', 'never'].includes(value)
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value){
                    return ['click', 'hover'].includes(value)
                }
            },
            easing: {
                type: String,
                default: 'ease'
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-carousel',
                activeIndex: 0,
                timer: null,
                width: 0,
                childrenList: [],
            }
        },
        computed: {
            carouselClass(){
                const classPrefix = this.classPrefix;
                return [
                    `${classPrefix}`,
                    `${classPrefix}--indicator-${this.indicator}`,
                ]
            },
            indicatorItemStyle(){
                let style = {
                    transitionTimingFunction: this.easing,
                }
                if(this.activeIndex === this.index) style = {...(this.indicatorActiveStyle || {}), ...style}
                else style = {...(this.indicatorStyle || {}), ...style}
                return style;
            },
            carouselInnerStyle(){
                let translateX = this.width * this.activeIndex;
                return {
                    height: parseInt(this.height) + 'px',
                    width: ((this.childrenList.length - 1) * 100) + '%',
                    transform: `translateX(-${translateX}px)`
                }
            },
            arrowStyle(){
                return {
                    transitionTimingFunction: this.easing
                }
            }
        },
        components: {
            Icon
        },
        mounted() {
            this.$nextTick(() => {
                this.setChildrenIndex();
                this.width = this.$el.offsetWidth || 0;
            });
        },
        methods: {
            setChildrenIndex(){
                const childrenList = this.$refs.carouselInner.$children;
                this.childrenList = childrenList || [];
                if(childrenList && childrenList.length){
                    childrenList.forEach((item, index) => {
                        item.index = index;
                    })
                }
            },
            clearTimer(){
                this.timer && clearInterval(this.timer)
            },
            handleArrowClick(index){
                if(this.trigger !== 'click') return;
                this.goToIndex(index);
            },
            handleArrowMouseenter(index){
                if(this.trigger !== 'hover') return;
                this.goToIndex(index);
            },
            handleArrowMouseleave(index){
                if(this.trigger !== 'hover') return;

            },
            handleCarouselMouseenter(){
                this.clearTimer();
            },
            handleCarouselMouseleave(){

            },
            goToIndex(index){
                if(typeof index === 'undefined'){
                    index = this.activeIndex + 1;
                }
                if(index > this.childrenList.length){
                    index = 0;
                }
                if(index < 0){
                    index = this.childrenList.length - 1
                }
                console.log(index,'index')
                this.activeIndex = index;
            },
            play(){
                if(!this.autoplay) return;
                this.clearTimer();
                this.timer = setInterval(() => {
                    this.goToIndex();
                }, this.interval);
            }
        },
        destroyed() {
            this.timer && clearInterval(this.timer)
        }
    }
</script>
