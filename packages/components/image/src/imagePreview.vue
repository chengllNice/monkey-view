<template>
    <transition name="fade">
        <div v-if="visible"
             class="cl-image-preview">
            <div class="cl-image-preview__wrap">
                <div class="cl-image-preview__close" @click="handlerClose">
                    <i class="cl-icon-close"></i>
                </div>
                <i class="cl-image-preview__left cl-icon-left" @click="handleChange('left')"></i>
                <i class="cl-image-preview__right cl-icon-right" @click="handleChange('right')"></i>
                <div class="cl-image-preview__body">
                    <template v-for="(item, index) in list" >
                        <img class="cl-image-preview__image"
                             v-if="index === selectedIndex"
                             :style="imageStyle"
                             :key="index"
                             :src="item"
                             @mousedown="handleImageMouseDown"
                             alt="">
                    </template>
                </div>
                <div class="cl-image-preview__footer">
                    <i class="cl-icon-circle-plus" @click="handleAction('zoomIn')"></i>
                    <i class="cl-icon-remove" @click="handleAction('zoomOut')"></i>
                    <i class="cl-icon-look-up" @click="handleAction('zoomToggle')"></i>
                    <i class="cl-icon-refresh" @click="handleAction('rotateLeft')"></i>
                    <i class="cl-icon-refresh" @click="handleAction('rotateRight')"></i>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Locale from '../../../mixins/locale'
    import {on, off} from "../../../utils/dom";

    export default {
        name: "ClImagePreview",
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
                zoomToggle: 'normal', //当前缩放 out缩小 nomral正常
            }
        },
        computed: {
            imageStyle(){
                let {scale, rotate, translateX, translateY} = this.transform;
                return {
                    transform: `scale(${scale}) rotate(${rotate}deg) translateX(${translateX}px) translateY(${translateY}px)`
                }
            }
        },
        components: {

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
                    case 'zoomToggle':
                        if(this.zoomToggle === 'out'){
                            scale = this.minScale;
                            this.zoomToggle = 'nomral';
                        }else{
                            scale = 1;
                            this.zoomToggle = 'out';
                        }
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
