<template>
    <div>
        <transition name="fade">
            <div :class="[`${classPrefix}__cover`]" v-if="coverShow" v-show="visible" @click="handlerCover"></div>
        </transition>
        <div :class="[
                 `${classPrefix}__wrap`,
                 !wrapShow && `${classPrefix}__hidden`
             ]"
             ref="drawerWrap"
             @click="handlerWrapClick">
            <transition :name="drawerTransition">
                <div v-show="visible"
                     ref="drawer"
                     :style="drawerStyle"
                     :class="[
                         `${classPrefix}`,
                         placement && `cl-drawer__${placement}`
                     ]">
                    <div :class="[`${classPrefix}__content`]">
                        <div :class="[`${classPrefix}__close`]" v-if="closable" @click="handlerClose">
                            <slot name="close">
                                <Icon type="close"></Icon>
                            </slot>
                        </div>
                        <div :class="[`${classPrefix}__header`]" ref="drawerHeader" v-if="showHead">
                            <slot name="header">{{title}}</slot>
                        </div>
                        <div :class="[`${classPrefix}__body`]" :style="bodyStyle">
                            <scroll size="small">
                                <div :class="[`${classPrefix}__body-content`]">
                                    <slot></slot>
                                </div>
                            </scroll>
                        </div>
                        <div :class="[`${classPrefix}__footer`]" ref="drawerFooter" v-if="!footerHide">
                            <slot name="footer">
                                <Button @click="handlerButtonCancel"
                                        v-if="localCancelText">{{localCancelText}}
                                </Button>
                                <Button type="primary"
                                        :loading='okButtonLoading'
                                        @click="handlerButtonOk"
                                        v-if="localOkText">{{localOkText}}
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
        name: "Drawer",
        mixins: [Locale],
        props: {
            width: {
                type: [String, Number],
                default: 260
            },
            height: {
                type: [String, Number],
                default: 260
            },//只在top bottom时有效
            placement: {
                type: String,
                default: 'right',
                validator(value) {
                    return ['left', 'right', 'bottom', 'top'].includes(value)
                }
            },
            value: Boolean,
            footerHide: Boolean,
            closable: {
                type: Boolean,
                default: true
            },//是否显示右上角关闭按钮
            cancelText: String,
            okText: String,
            styles: Object,//中间层的样式
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
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return document.body
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-drawer',
                visible: this.value,
                showHead: true,
                wrapShow: false,
                okButtonLoading: false,
                observer: null,
                bodyStyle: {},
                timer: null,
            }
        },
        computed: {
            localOkText() {
                return this.okText === null ? null : (this.okText ? this.okText : this.t('cl.drawer.okText'));
            },
            localCancelText() {
                return this.cancelText === null ? null : (this.cancelText ? this.cancelText : this.t('cl.drawer.cancelText'));
            },
            drawerStyle() {
                let style = {};
                const widthPar = parseFloat(this.width);
                let width = this.width.toString().includes('%') ? `${widthPar}%` : `${widthPar}px`;
                width = ['top', 'bottom'].includes(this.placement) ? '100%' : width;
                let height = ['top', 'bottom'].includes(this.placement) ? (parseFloat(this.height) + 'px') : '100%';

                const styles = this.styles ? this.styles : {};

                Object.assign(style, styles, {width: width, height: height});
                return style;
            },
            drawerTransition() {
                let transition;
                switch (this.placement) {
                    case 'left':
                        transition = 'DrawerMoveLeft';
                        break;
                    case 'top':
                        transition = 'DrawerMoveTop';
                        break;
                    case 'bottom':
                        transition = 'DrawerMoveBottom';
                        break;
                    default:
                        transition = 'DrawerMoveRight';
                        break;
                }
                return transition;
            }
        },
        components: {
            Button,
            Scroll,
            Icon
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.renderToHtml();
                this.setShowHead();
                this.observer = elementResizeDetectorMaker();
                this.observer.listenTo(this.$refs.drawerWrap, this.drawerBodyResize);
            })
        },
        beforeDestroy() {
            this.observer && this.observer.removeListener(this.$refs.drawerWrap, this.drawerBodyResize);
            this.timer && clearTimeout(this.timer);
        },
        watch: {
            value(newVal) {
                this.visible = newVal;
            },
            visible(newVal) {
                if (!newVal) {
                    this.timer = setTimeout(() => {
                        this.wrapShow = false;
                    }, 300)
                } else {
                    this.timer && clearTimeout(this.timer);
                    this.wrapShow = true;
                    this.$nextTick(() => {
                        this.drawerBodyResize();
                    })
                }
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

            drawerBodyResize() {
                if (!this.$refs.drawer) return;
                let drawerHeight = this.$refs.drawer.offsetHeight;

                let drawerHeaderHeight = this.showHead && this.$refs.drawerHeader.offsetHeight;

                let drawerFooterHeight = !this.footerHide && this.$refs.drawerFooter.offsetHeight;

                let bodyHeight = 'auto';

                bodyHeight = (drawerHeight - drawerHeaderHeight - drawerFooterHeight) + 'px';

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
                className && (className.indexOf(`${this.classPrefix}__wrap`) > -1) && (this.handlerCover());
            },
            handlerCover() {
                if (this.coverClosable) {
                    this.handlerClose();
                }
            },
        }
    }
</script>
