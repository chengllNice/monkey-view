<template>
    <div :class="[
        `${classPrefix}`,
        (isLoading || isError) && `${classPrefix}--status`,
        !clientWidth && `${classPrefix}--no-clientwidth`,
    ]">
        <div v-if="isLoading" :class="[`${classPrefix}__loading`]">
            <slot name="loading">
                <loading type="loading5" size="large" fix color="#ccc" :visible="isLoading"/>
            </slot>
        </div>
        <div v-else-if="isError" :class="[`${classPrefix}__error`]">
            <slot name="error">{{t('m.image.errorText')}}</slot>
        </div>
        <img v-else
             :class="[
                 `${classPrefix}__inner`,
                 fit && `${classPrefix}__${fit}`
             ]"
             :style="imageStyle"
             :src="src"
             :alt="alt"
             @click="handleImageClick" />
        <template v-if="previewList.length">
            <image-preview :list="previewList" v-if="previewVisible" @close="previewVisible = false"
                           :style="previewStyle"></image-preview>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Loading from 'packages/loading'
    import Locale from "main/mixins/locale";
    import ImagePreview from './imagePreview.vue'

    const isObjectFit = document.documentElement.style.objectFit !== undefined;

    export default {
        name: `MImage`,
        mixins: [Locale],
        props: {
            fit: {
                type: String,
                default: 'none',
                validator(value) {
                    return ['fill', 'none', 'contain', 'cover', 'scale-down'].includes(value)
                }
            },
            src: {
                type: String,
                default: ''
            },
            alt: String,
            previewList: {
                type: Array,
                default() {
                    return []
                }
            },
            zIndex: {
                type: Number,
                default: 2000
            }
        },
        computed: {
            imageStyle() {
                // return this.computedImageStyle();
                return isObjectFit ? {} : this.computedImageStyle();
            },
            previewStyle() {
                return {
                    'z-index': this.zIndex
                }
            },
        },
        components: {
            ImagePreview,
            Loading
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-image',
                isLoading: true,
                isError: false,
                imageWidth: 0,
                imageHeight: 0,
                previewVisible: false,
                clientWidth: 0
            }
        },
        mounted() {
            this.initImage();
            this.$nextTick(() => {
                this.computedClientWidth();
            })
        },
        methods: {
            initImage() {
                let img = new Image();
                img.onload = (e) => this.loadImage(e, img)
                img.onerror = (e) => this.errorLoadImage(e)
                img.src = this.src;
            },
            loadImage(e, img) {
                this.imageWidth = img.width;
                this.imageHeight = img.height;
                this.isLoading = false;
                this.isError = false;
                this.$emit('load', e)
            },
            errorLoadImage(e) {
                this.isLoading = false;
                this.isError = true;
                this.$emit('error', e)
            },
            computedClientWidth() {
                this.clientWidth = this.$el && this.$el.clientWidth;
            },
            computedImageStyle() {
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

                if (!imageHeight || !clientHeight || !imageWidth || !clientWidth) {
                    return style;
                }

                const scaleVertical = imageWidth / imageHeight < 1;//图片的垂直比例

                let fit = this.fit;

                if (fit === 'scale-down') {
                    if (imageHeight < clientHeight && imageWidth < clientWidth) {
                        fit = 'none'
                    } else {
                        fit = 'contain'
                    }
                }

                let c = {};
                switch (fit) {
                    case 'none':
                        style = {...style, width: 'auto', height: 'auto'}
                        break;
                    case 'contain':
                        c = scaleVertical ? {width: 'auto'} : {height: 'auto'};
                        style = {...style, ...c}
                        break;
                    case 'cover':
                        c = scaleVertical ? {height: 'auto'} : {width: 'auto'};
                        style = {...style, ...c}
                        break;
                }
                return style;
            },
            handleImageClick() {
                if (!this.previewList.length) return;
                this.previewVisible = true;
            }
        }
    }
</script>