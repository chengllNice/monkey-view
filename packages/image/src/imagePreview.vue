<template>
    <transition name="fade">
        <div v-if="visible"
             :class="[`${classPrefix}`]">
            <div :class="[`${classPrefix}__wrap`]">
                <div :class="[`${classPrefix}__close`]" @click="handlerClose">
                    <Icon type="close"></Icon>
                </div>
                <Icon type="left" :class="[`${classPrefix}__left`]" @click="handleChange('left')"></Icon>
                <Icon type="right" :class="[`${classPrefix}__right`]" @click="handleChange('right')"></Icon>
                <div :class="[`${classPrefix}__body`]">
                    <template v-for="(item, index) in list" >
                        <img :class="[`${classPrefix}__image`]"
                             v-if="index === selectedIndex"
                             :style="imageStyle"
                             :key="index"
                             :src="item"
                             @mousedown="handleImageMouseDown"
                             alt="">
                    </template>
                </div>
                <div :class="[`${classPrefix}__footer`]">
                    <Icon type="circle-plus" @click="handleAction('zoomIn')"></Icon>
                    <Icon type="remove" @click="handleAction('zoomOut')"></Icon>
                    <Icon type="look-up" @click="handleAction('toggle')"></Icon>
                    <Icon type="refresh" @click="handleAction('rotateLeft')"></Icon>
                    <Icon type="refresh" @click="handleAction('rotateRight')"></Icon>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'
    import Locale from 'main/mixins/locale'
    import {on, off} from "main/utils/dom";

    export default {
        name: "ImagePreview",
        mixins: [Locale],
        props: {
            list: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-image-preview',
                visible: false,
                selectedIndex: 0,
                minScale: 0.1,//最小缩小
                maxScale: 10,//最大放大
                everyScale: 0.1,//每次缩放的倍数
                everyRotate: 90,//每次旋转角度
                transform: {
                    scale: 1,
                    rotate: 0,
                    translateX: 0,
                    translateY: 0,
                },
                actionToggle: 'limit', //nomral正常 limit限制最大宽高
            }
        },
        computed: {
            imageStyle(){
                let {scale, rotate, translateX, translateY} = this.transform;
                let style = {};
                if(this.actionToggle === 'limit'){
                    style = {
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }
                }
                return {
                    ...style,
                    transform: `scale(${scale}) rotate(${rotate}deg) translateX(${translateX}px) translateY(${translateY}px)`,
                }
            }
        },
        components: {
            Icon
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.visible = true;
                this.renderToHtml();
                this.listener();
            })
        },
        beforeDestroy() {
            off(document, 'mousewheel', this.handleMouseWheel);
            off(document, 'DOMMouseScroll', this.handleMouseWheel);
        },
        watch: {

        },
        methods: {
            renderToHtml() {
                document.body.appendChild(this.$el);
            },
            listener(){
                on(document, 'mousewheel', this.handleMouseWheel);
                on(document, 'DOMMouseScroll', this.handleMouseWheel);
            },
            handleMouseWheel(e){
                const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
                if (delta > 0) {
                    this.handleAction('zoomIn');
                } else {
                    this.handleAction('zoomOut');
                }
            },
            handlerClose() {
                this.visible = false;
                this.$emit('input', false);
                this.$emit('close');
            },
            handleAction(action){
                let {scale, rotate} = this.transform;
                switch (action) {
                    case 'zoomIn':
                        scale = scale + this.everyScale;
                        break;
                    case 'zoomOut':
                        scale = scale - this.everyScale;
                        break;
                    case 'toggle':
                        this.actionToggle = this.actionToggle === 'limit' ? 'normal' : 'limit';
                        break;
                    case 'rotateLeft':
                        rotate = rotate + this.everyRotate;
                        break;
                    case 'rotateRight':
                        rotate = rotate - this.everyRotate;
                        break;
                }
                if(scale <= this.minScale){
                    scale = this.minScale;
                }
                if(scale >= this.maxScale){
                    scale = this.maxScale;
                }
                this.transform.scale = scale;
                this.transform.rotate = rotate;
            },
            handleImageMouseDown(e){
                e.preventDefault();
                let {translateX, translateY} = this.transform;
                let x = e.pageX;
                let y = e.pageY;
                let handleDrag = (ev) => {
                    this.transform.translateX = translateX + ev.pageX - x;
                    this.transform.translateY = translateY + ev.pageY - y;
                };
                on(document, 'mousemove', handleDrag);
                on(document, 'mouseup', () => {
                    off(document, 'mousemove', handleDrag);
                });
            },
            handleChange(type){
                let len = this.list.length;
                if(type === 'left'){
                    this.selectedIndex--;
                    if(this.selectedIndex < 0){
                        this.selectedIndex = len - 1;
                    }
                }else{
                    this.selectedIndex++;
                    if(this.selectedIndex > len - 1){
                        this.selectedIndex = 0;
                    }
                }
            }
        }
    }
</script>
