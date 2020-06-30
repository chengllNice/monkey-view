<template>
    <div class="cl-image">
        <slot v-if="isLoading" name="loading">
            <div class="cl-image__loading">加载中</div>
        </slot>
        <slot v-else-if="isError" name="error">
            <div class="cl-image__error">加载失败</div>
        </slot>
        <img v-else :class="[
            'cl-image__inner',
            fit && `cl-image__${fit}`
            ]"
             :style="imageStyle"
             :src="src" alt="">
    </div>
</template>

<script>
    const isObjectFit = document.documentElement.style.objectFit !== undefined;
    export default {
        name: "ClImage",
        props: {
            fit: {
                type: String,
                default: 'none',
                validator(value){
                    return ['fill', 'none', 'contain', 'cover', 'scale-down'].includes(value)
                }
            },
            src: {
                type: String,
                default: ''
            }
        },
        computed: {
            imageStyle(){
                return isObjectFit ? {} : this.computedImageStyle();
            }
        },
        data(){
            return {
                isLoading: true,
                isError: false,
                imageWidth: 0,
                imageHeight: 0,
            }
        },
        mounted() {
            this.initImage();
        },
        methods: {
            initImage(){
                let img = new Image();
                img.onload = (e) => this.loadImage(e, img)
                img.onerror = (e) => this.errorLoadImage(e)
                img.src = this.src;
            },
            loadImage(e, img){
                setTimeout(()=>{
                    this.imageWidth = img.width;
                    this.imageHeight = img.height;
                    this.isLoading = false;
                    this.isError = false;
                },2000)

            },
            errorLoadImage(e){
                this.isLoading = false;
                this.isError = true;
                this.$emit('error', e)
            },
            computedImageStyle(){
                let style = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                };
                let clientWidth = this.$el && this.$el.clientWidth;
                let clientHeight = this.$el && this.$el.clientHeight;
                let imageWidth = this.imageWidth;
                let imageHeight = this.imageHeight;

                if(!imageHeight || !clientHeight || !imageWidth || !clientWidth){
                    return style;
                }

                const scaleVertical = imageWidth / imageHeight < 1;//图片的垂直比例

                let fit = this.fit;

                if(fit === 'scale-down'){
                    if(imageHeight < clientHeight && imageWidth < clientWidth){
                        fit = 'none'
                    }else{
                        fit = 'contain'
                    }
                }

                let c = {};
                switch (fit) {
                    case 'none':
                        style = {...style, width: 'auto', height: 'auto'}
                        break;
                    case 'contain':
                        c = scaleVertical ? { width: 'auto' } : { height: 'auto' };
                        style = {...style, ...c}
                        break;
                    case 'cover':
                        c = scaleVertical ? { height: 'auto' } : { width: 'auto' };
                        style = {...style, ...c}
                        break;
                }
                return style;
            }
        }
    }
</script>