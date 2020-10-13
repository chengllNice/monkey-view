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
                 @click="handleIndicatorClick(index)"
                 @mouseenter="handleIndicatorMouseenter(index)"
                 @mouseleave="handleIndicatorMouseleave(index)">{{item.label}}</div>
        </div>
        <div :class="[`${classPrefix}__arrow`, `${classPrefix}__arrow-prev`]"
             :style="arrowStyle"
             @click="handleArrowClick('prev')">
            <Icon type="left"></Icon></div>
        <div :class="[`${classPrefix}__arrow`, `${classPrefix}__arrow-next`]"
             :style="arrowStyle"
             @click="handleArrowClick('next')">
            <Icon type="right"></Icon></div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'
    import { findComponentDirectChildrens} from "main/utils/tool";

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
                observer: null,
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
                let translateX = this.itemWidth * this.activeIndex;
                return {
                    height: parseInt(this.height) + 'px',
                    width: (this.childrenList.length * 100) + '%',
                    transform: `translateX(-${translateX}%)`
                }
            },
            itemWidth(){
                return 100 / this.childrenList.length
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
            });
        },
        methods: {
            setChildrenIndex(){
                const childrenList = findComponentDirectChildrens(this, 'CarouselItem');
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
            handleIndicatorClick(index){
                if(this.trigger !== 'click') return;
                this.goToIndex(index);
            },
            handleIndicatorMouseenter(index){
                if(this.trigger !== 'hover') return;
                this.goToIndex(index);
            },
            handleIndicatorMouseleave(index){
                if(this.trigger !== 'hover') return;

            },
            handleArrowClick(type){
                if(type === 'prev') this.goToIndex(this.activeIndex - 1)
                if(type === 'next') this.goToIndex(this.activeIndex + 1)
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
                if(index > this.childrenList.length - 1){
                    index = 0;
                }
                if(index < 0){
                    index = this.childrenList.length - 1
                }
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
            this.timer && clearInterval(this.timer);
        }
    }
</script>
