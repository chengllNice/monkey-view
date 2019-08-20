<template>
    <div>
        <transition name="fade">
            <div class="cl-drawer__cover" v-if="coverShow" v-show="visible" @click="handlerCover"></div>
        </transition>
        <div class="cl-drawer__wrap"
             :class="[
                !wrapShow && 'cl-drawer__hidden'
             ]"
             ref="drawerWrap"
             @click="handlerWrapClick">
            <transition :name="drawerTransition">
                <div v-show="visible"
                     ref="drawer"
                     :style="drawerStyle"
                     :class="[
                        placement && `cl-drawer__${placement}`
                     ]"
                     class="cl-drawer">
                    <div class="cl-drawer__content">
                        <div class="cl-drawer__close" v-if="closable" @click="handlerClose">
                            <slot name="close"><i class="cl-icon-close"></i></slot>
                        </div>
                        <div class="cl-drawer__header" ref="drawerHeader" v-if="showHead">
                            <slot name="header">{{title}}</slot>
                        </div>
                        <div class="cl-drawer__body" :style="bodyStyle">
                            <ClScroll size="small">
                                <div class="cl-drawer__body-content">
                                    <slot></slot>
                                </div>
                            </ClScroll>
                        </div>
                        <div class="cl-drawer__footer" ref="drawerFooter" v-if="!footerHide">
                            <slot name="footer">
                                <ClButton @click="handlerButtonCancel" v-if="localCancelText">{{localCancelText}}</ClButton>
                                <ClButton type="primary" :loading='okButtonLoading' @click="handlerButtonOk" v-if="localOkText">{{localOkText}}</ClButton>
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
    name: "ClDrawer",
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
        validator(value){
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
      localOkText(){
        return this.okText === null ? null : (this.okText ? this.okText : '确定');
      },
      localCancelText(){
        return this.cancelText === null ? null : (this.cancelText ? this.cancelText : '取消');
      },
      drawerStyle(){
        let style = {};
        const widthPar = parseFloat(this.width);
        let width = this.width.toString().includes('%') ? `${widthPar}%` : `${widthPar}px`;
        width = ['top', 'bottom'].includes(this.placement) ? '100%' : width;
        let height = ['top', 'bottom'].includes(this.placement) ? (parseFloat(this.height) + 'px') : '100%';

        const styles = this.styles ? this.styles : {};

        Object.assign(style, styles, {width: width, height: height});
        return style;
      },
      drawerTransition(){
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
      ClButton,
      ClScroll
    },
    created() {
    },
    mounted() {
      this.$nextTick(()=>{
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
      value(newVal){
        this.visible = newVal;
      },
      visible(newVal){
        if(!newVal){
          this.timer = setTimeout(()=>{
            this.wrapShow = false;
          }, 300)
        }else{
          this.timer && clearTimeout(this.timer);
          this.wrapShow = true;
        }
      }
    },
    methods: {
      renderToHtml(){
        if(typeof this.renderHtml === 'boolean' && !this.renderHtml) return;
        this.renderHtml.appendChild(this.$el);
      },
      drawerBodyResize(){
        if(!this.$refs.drawer) return;
        let drawerHeight =  this.$refs.drawer.offsetHeight;

        let drawerHeaderHeight =  this.showHead && this.$refs.drawerHeader.offsetHeight;

        let drawerFooterHeight =  !this.footerHide && this.$refs.drawerFooter.offsetHeight;

        let bodyHeigt = 'auto';

        bodyHeigt = (drawerHeight - drawerHeaderHeight - drawerFooterHeight) + 'px';

        this.bodyStyle = {
          height: bodyHeigt
        }
      },
      setShowHead(){
        this.showHead = true;
        if(!this.$slots.header && !this.title){
          this.showHead = false;
        }
      },
      handlerClose(){
        this.visible = false;
        this.$emit('input', false);
        this.$emit('cancel');
      },
      handlerButtonCancel(){
        this.handlerClose();
      },
      handlerButtonOk(){
        if(this.loading){
          this.okButtonLoading = true;
        }else{
          this.visible = false;
          this.$emit('input', false);
        }
        this.$emit('ok');
      },
      handlerWrapClick(event){
        const  className = event.target.getAttribute('class');
        className && (className.indexOf('cl-drawer__wrap') > -1) && (this.handlerCover());
      },
      handlerCover(){
        if(this.coverClosable){
          this.handlerClose();
        }
      },
    }
  }
</script>
