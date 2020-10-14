<template>
    <div :class="carouselClass"
         @mouseenter="handleCarouselMouseenter"
         @mouseleave="handleCarouselMouseleave">
        <div :class="[`${classPrefix}__container`]" :style="carouselContainerStyle">
            <template v-for="index in 2">
                <div :class="[`${classPrefix}__inner`, `${classPrefix}__inner-${index}`]"
                     :key="index"
                     :style="carouselInnerStyle(index)">
                    <slot></slot>
                </div>
            </template>
        </div>
        <div :class="[`${classPrefix}__indicator`]">
            <div :class="[
                    `${classPrefix}__indicator-item`,
                    activeIndex === index && `${classPrefix}__indicator-item-active`,
                ]"
                 v-for="(item, index) in childrenList"
                 :key="index"
                 :style="indicatorItemStyle"
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
            direction: {
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
                arrowClickType: false,
                currentInnerIndex: 1,
                timer: null,
                childrenList: [],
            }
        },
        computed: {
            carouselClass(){
                const classPrefix = this.classPrefix;
                return [
                    `${classPrefix}`,
                    `${classPrefix}--indicator-${this.indicator}`,
                    `${classPrefix}--arrow-${this.arrow}`,
                    `${classPrefix}--${this.direction}`,
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
            carouselContainerStyle(){
                let style = {
                    height: parseInt(this.height) + 'px',
                }
                if(this.direction === 'horizontal'){
                    style = {
                        ...style,
                        width: (this.childrenList.length * 200) + '%',
                    }
                }
                return style;
            },
            carouselInnerStyle(){
                return function (index) {
                    const len = this.childrenList.length;
                    const activeIndex = this.activeIndex;
                    let zIndex = index === this.currentInnerIndex ? 2 : 0;
                    let translate = 0;

                    if(this.direction === 'horizontal'){
                        if(this.arrowClickType === 'prev'){
                            if(index === this.currentInnerIndex){
                                translate = -(this.itemWidth * this.activeIndex);
                            }else {
                                translate = this.itemWidth * (len - this.activeIndex);
                            }
                        }
                        if(this.arrowClickType === 'next'){
                            if(index === this.currentInnerIndex){
                                translate = -(this.itemWidth * this.activeIndex);
                            }else {
                                translate = this.itemWidth * (len - this.activeIndex);
                            }
                        }
                    }

                    if(!this.arrowClickType){
                        translate = -(this.itemWidth * activeIndex)
                    }

                    if(activeIndex === 0 && index !== this.currentInnerIndex){
                        translate = -100;
                    }
                    if(activeIndex === len - 1 && index !== this.currentInnerIndex){
                        translate = this.itemWidth;
                    }

                    if(this.direction === 'horizontal'){
                        translate = `translateX(${translate}%)`;
                    }
                    if(this.direction === 'vertical'){
                        translate = `translateY(${translate}%)`;
                    }
                    return {
                        zIndex,
                        transform: translate
                    }
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
                this.play();
            });
        },
        methods: {
            setChildrenIndex(){
                const childrenList = findComponentDirectChildrens(this, 'CarouselItem');
                if(childrenList && childrenList.length){
                    this.childrenList = (childrenList || []).slice(0, childrenList.length / 2);
                    this.childrenList.forEach((item, index) => {
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
                this.play();
            },
            handleArrowClick(type){
                if(this.loop) {
                    this.arrowClickType = type
                }
                if(type === 'prev') {
                    if(this.activeIndex === 0 && this.loop){
                        this.currentInnerIndex = this.currentInnerIndex === 1 ? 2 : 1;
                    }
                    this.goToIndex(this.activeIndex - 1);
                }
                if(type === 'next') {
                    if(this.activeIndex === this.childrenList.length - 1 && this.loop){
                        this.currentInnerIndex = this.currentInnerIndex === 1 ? 2 : 1;
                    }
                    this.goToIndex(this.activeIndex + 1)
                }
                // this.arrowClickType = false;
            },
            handleCarouselMouseenter(){
                this.clearTimer();
            },
            handleCarouselMouseleave(){
                this.play();
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
                    this.handleArrowClick('next');
                }, this.interval);
            }
        },
        destroyed() {
            this.timer && clearInterval(this.timer);
        },
        watch: {
            value(newVal){
                this.activeIndex = newVal;
            },
            activeIndex(newVal){
                this.$emit('input', newVal);
            }
        }
    }
</script>
