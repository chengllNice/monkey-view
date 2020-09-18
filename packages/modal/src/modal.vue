<template>
    <div>
        <transition :name="transition[1]">
            <div :class="[`${classPrefix}__cover`]" v-if="coverShow" v-show="visible" @click="handleCover"></div>
        </transition>
        <div :class="[
                 `${classPrefix}__wrap`,
                 wrapHidden && `${classPrefix}__hidden`,
                 (bodyScroll || fullscreen) && `${classPrefix}__overhidden`
             ]"
             ref="modalWrap"
             @click="handleWrapClick">
            <transition :name="transition[0]" @after-leave="handleAfterLeave">
                <div v-show="visible"
                     ref="modal"
                     :style="modalStyle"
                     :class="[
                         `${classPrefix}`,
                         fullscreen && `${classPrefix}__fullscreen`
                     ]">
                    <div :class="[`${classPrefix}__content`]">
                        <div :class="[`${classPrefix}__close`]" v-if="closable" @click="handleClose">
                            <slot name="close"><Icon type="close"></Icon></slot>
                        </div>
                        <div :class="[`${classPrefix}__header`]" ref="modalHeader" v-if="showHead">
                            <slot name="header">{{title}}</slot>
                        </div>
                        <div :class="[`${classPrefix}__body`]" :style="bodyStyle">
                            <scroll size="small">
                                <div :class="[`${classPrefix}__body-content`]">
                                    <slot></slot>
                                </div>
                            </scroll>
                        </div>
                        <div :class="[`${classPrefix}__footer`]" ref="modalFooter" v-if="!footerHide">
                            <slot name="footer">
                                <Button @click="handleButtonCancel" v-if="localCancelText">{{localCancelText}}</Button>
                                <Button type="primary"
                                        :loading='okButtonLoading'
                                        @click="handleButtonOk"
                                        v-if="localOkText">
                                    {{localOkText}}
                                </Button>
                            </slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Button from 'packages/button'
    import Scroll from 'packages/scroll'
    import Icon from 'packages/icon'
    import elementResizeDetectorMaker from 'element-resize-detector';
    import Locale from 'main/mixins/locale'

    export default {
        name: "Modal",
        mixins: [Locale],
        props: {
            transition: {
                type: Array,
                default: function () {
                    return ['scale', 'fade']
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
                    return true
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-modal',
                visible: this.value,
                wrapHidden: !this.value,
                showHead: true,
                okButtonLoading: false,
                observer: null,
                bodyStyle: {},
            }
        },
        computed: {
            localOkText() {
                return this.okText === null ? null : (this.okText ? this.okText : this.t('cl.modal.okText'));
            },
            localCancelText() {
                return this.cancelText === null ? null : (this.cancelText ? this.cancelText : this.t('cl.modal.cancelText'));
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
            Button,
            Scroll,
            Icon
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
                if(newVal) this.wrapHidden = !newVal;
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
            handleClose() {
                this.visible = false;
                this.$emit('input', false);
                this.$emit('cancel');
            },
            handleButtonCancel() {
                this.handleClose();
            },
            handleButtonOk() {
                if (this.loading) {
                    this.okButtonLoading = true;
                } else {
                    this.visible = false;
                    this.$emit('input', false);
                }
                this.$emit('ok');
            },
            handleWrapClick(event) {
                const className = event.target.getAttribute('class');
                className && (className.indexOf(`${this.classPrefix}__wrap`) > -1) && (this.handleCover());
            },
            handleCover() {
                if (this.coverClosable) {
                    this.handleClose();
                }
            },
            handleAfterLeave(){
                this.wrapHidden = true;
            }
        }
    }
</script>
