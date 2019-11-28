<template>
    <div>
        <transition :name="transition[0]">
            <div class="cl-modal__cover" v-if="coverShow" v-show="visible" @click="handlerCover"></div>
        </transition>
        <div class="cl-modal__wrap"
             :class="[
                !visible && 'cl-modal__hidden',
                (bodyScroll || fullscreen) && 'cl-modal__overhidden'
             ]"
             ref="modalWrap"
             @click="handlerWrapClick">
            <transition :name="transition[1]">
                <div v-show="visible"
                     ref="modal"
                     :style="modalStyle"
                     :class="[
                        fullscreen && 'cl-modal__fullscreen',
                     ]"
                     class="cl-modal">
                    <div class="cl-modal__content">
                        <div class="cl-modal__close" v-if="closable" @click="handlerClose">
                            <slot name="close"><i class="cl-icon-close"></i></slot>
                        </div>
                        <div class="cl-modal__header" ref="modalHeader" v-if="showHead">
                            <slot name="header">{{title}}</slot>
                        </div>
                        <div class="cl-modal__body" :style="bodyStyle">
                            <ClScroll size="small">
                                <div class="cl-modal__body-content">
                                    <slot></slot>
                                </div>
                            </ClScroll>
                        </div>
                        <div class="cl-modal__footer" ref="modalFooter" v-if="!footerHide">
                            <slot name="footer">
                                <ClButton @click="handlerButtonCancel" v-if="localCancelText">{{localCancelText}}
                                </ClButton>
                                <ClButton type="primary" :loading='okButtonLoading' @click="handlerButtonOk"
                                          v-if="localOkText">{{localOkText}}
                                </ClButton>
                            </slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import ClButton from '../../button/src/button.vue'
    import ClScroll from '../../scroll/src/scroll.vue'
    import elementResizeDetectorMaker from 'element-resize-detector';

    export default {
        name: "ClModal",
        props: {
            transition: {
                type: Array,
                default: function () {
                    return ['fade', 'slideUp']
                }
            },
            width: {
                type: [String, Number],
                default: 520
            },
            height: {
                type: [String, Number],
            },
            value: Boolean,
            fullscreen: Boolean,
            footerHide: Boolean,
            closable: {
                type: Boolean,
                default: true
            },//是否显示右上角关闭按钮
            cancelText: String,
            okText: String,
            styles: Object,
            title: String,
            loading: Boolean,
            coverClosable: {
                type: Boolean,
                default: true
            },
            coverShow: {
                type: Boolean,
                default: true
            },
            bodyScroll: Boolean,//body内容自动滚动,
            modalTop: {
                type: [String, Number],
                default: 100
            },//值为center时垂直居中（暂时没做居中）
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return document.body
                }
            }
        },
        data() {
            return {
                visible: this.value,
                showHead: true,
                okButtonLoading: false,
                observer: null,
                bodyStyle: {},
            }
        },
        computed: {
            localOkText() {
                return this.okText === null ? null : (this.okText ? this.okText : '确定');
            },
            localCancelText() {
                return this.cancelText === null ? null : (this.cancelText ? this.cancelText : '取消');
            },
            modalStyle() {
                let style = {};
                const widthPar = parseFloat(this.width);
                const modalTop = parseFloat(this.modalTop);
                const width = this.width.toString().includes('%') ? `${widthPar}%` : `${widthPar}px`;
                const top = this.modalTop.toString().includes('%') ? `${modalTop}%` : `${modalTop}px`;

                const styles = this.styles ? this.styles : {};

                Object.assign(style, styles, {width: width, top: top});
                return style;
            },
        },
        components: {
            ClButton,
            ClScroll
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.renderToHtml();
                this.setShowHead();
                if (this.bodyScroll || this.fullscreen) {
                    this.observer = elementResizeDetectorMaker();
                    this.observer.listenTo(this.$refs.modalWrap, this.modalBodyResize);
                }
            })
        },
        beforeDestroy() {
            this.observer && this.observer.removeListener(this.$refs.modalWrap, this.modalBodyResize);
        },
        watch: {
            value(newVal) {
                this.visible = newVal;
            }
        },
        methods: {
            renderToHtml() {
                if ((typeof this.renderHtml === 'boolean' && this.renderHtml === false) || !this.renderHtml) return;
                if ((typeof this.renderHtml === 'boolean' && this.renderHtml === true)) {
                    document.body.appendChild(this.$el);
                } else {
                    this.renderHtml.appendChild(this.$el);
                }
            },
            modalBodyResize() {
                if (!this.$refs.modal) return;
                let diffHeight = 20;
                let modalHeight = this.$refs.modal.offsetHeight;
                let modalTop = parseFloat(this.modalTop);

                let modalHeaderHeight = this.showHead && this.$refs.modalHeader.offsetHeight;

                let modalFooterHeight = !this.footerHide && this.$refs.modalFooter.offsetHeight;

                let modalWrapHeight = this.$refs.modalWrap.offsetHeight;

                let bodyHeight = 'auto';

                if (this.fullscreen) {
                    bodyHeight = (modalHeight - modalHeaderHeight - modalFooterHeight) + 'px';
                } else if (this.bodyScroll) {
                    if ((modalHeight + modalTop + diffHeight) > modalWrapHeight) {
                        bodyHeight = (modalWrapHeight - modalHeaderHeight - modalFooterHeight - modalTop - diffHeight) + 'px';
                    }
                    if (this.height && parseFloat(this.height) && parseFloat(bodyHeight) > parseFloat(this.height)) {
                        bodyHeight = parseFloat(this.height) + 'px';
                    }
                }
                console.log(modalWrapHeight,'====ddd', bodyHeight)


                this.bodyStyle = {
                    height: bodyHeight
                }
            },
            setShowHead() {
                this.showHead = true;
                if (!this.$slots.header && !this.title) {
                    this.showHead = false;
                }
            },
            handlerClose() {
                this.visible = false;
                this.$emit('input', false);
                this.$emit('cancel');
            },
            handlerButtonCancel() {
                this.handlerClose();
            },
            handlerButtonOk() {
                if (this.loading) {
                    this.okButtonLoading = true;
                } else {
                    this.visible = false;
                    this.$emit('input', false);
                }
                this.$emit('ok');
            },
            handlerWrapClick(event) {
                const className = event.target.getAttribute('class');
                className && (className.indexOf('cl-modal__wrap') > -1) && (this.handlerCover());
            },
            handlerCover() {
                if (this.coverClosable) {
                    this.handlerClose();
                }
            },
        }
    }
</script>
