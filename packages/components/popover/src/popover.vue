<template>
    <div class="cl-popover"
         @mouseenter="handlerMouseenter"
         @mouseleave="handlerMouseleave"
         v-click-outside="handleClose">
        <transition :name="transition">
            <div class="cl-popover__popper"
                 ref="popper"
                 @mouseenter="handlerMouseenter"
                 @mouseleave="handlerMouseleave"
                 v-show="visible">
                <div class="cl-popover__content" :style="expandStyle">
                    <div class="cl-popover__arrow"></div>
                    <div class="cl-popover__inner cl-popover__confirm" v-if="confirm">
                        <div class="cl-popover__title" v-if="showTitle">
                            <slot name="title"><i class="cl-icon-question-solid"></i>{{title}}</slot>
                        </div>
                        <div class="cl-popover__body">
                            <cl-button size="mini" type="text" @click="cancelClick">{{cancelText}}</cl-button>
                            <cl-button size="mini" type="primary" @click="okClick">{{okText}}</cl-button>
                        </div>
                    </div>
                    <div class="cl-popover__inner" v-else>
                        <div class="cl-popover__title" v-if="showTitle">
                            <slot name="title">{{title}}</slot>
                        </div>
                        <div :class="[
                            `cl-popover__body`,
                            wordWrap && `cl-popover__body-wrap`
                        ]">
                            <div v-if="!$slots.content">{{content}}</div>
                            <slot name="content"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="cl-popover__target"
             @click="handlerClick"
             ref="reference">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import Popper from '../../../mixins/cl-popper'
  import {directive as clickOutside} from 'v-click-outside-x';
  import {on, off} from "../../../utils/dom";

  export default {
    name: "ClPopover",
    mixins: [Popper],
    directives: {clickOutside},
    props: {
      placement: {
        type: String,
        default: 'top'
      },
      trigger: {
        type: String,
        default: 'click',
        validator(value) {
          return ['hover', 'click', 'focus'].includes(value)
        }
      },
      title: String,
      content: String,
      width: [String, Number],
      wordWrap: Boolean,
      disabled: Boolean,
      transition: {
        type: String,
        default: 'fade'
      },
      confirm: Boolean,
      cancelText: {
        type: String,
        default: '取消'
      },
      okText: {
        type: String,
        default: '确定'
      },
      renderHtml: {
        type: [HTMLElement, Boolean],
        default: function () {
          return false
        }
      }
    },
    data() {
      return {
        hoverTimer: null,//hover延时
        isInput: false,
        popperHover: false,
      }
    },
    computed: {
      showTitle() {
        return this.title || this.$slots.title;
      },
      expandStyle() {
        if (this.width === undefined) return {};
        let width = this.width.toString().includes('px') ? this.width : this.width + 'px';
        return Object.assign({}, {width: width})
      }
    },
    components: {},
    created() {
    },
    mounted() {
      if (this.trigger === 'focus') {
        this.$nextTick(() => {
          const $children = this.getReferenceInputChildren();
          if ($children) {
            this.isInput = true;
            on($children, 'focus', this.handlerFocus);
            on($children, 'blur', this.handlerBlur);
          } else {
            on(this.$refs.reference, 'mousedown', () => this.handlerFocus(false));
            on(document, 'mouseup', () => this.handlerBlur(false));
          }
        });
      }
      this.renderToHtml();
    },
    beforeDestroy() {
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      const $children = this.getReferenceInputChildren();
      if ($children) {
        off($children, 'focus', this.handlerFocus);
        off($children, 'blur', this.handlerBlur);
      } else {
        off(this.$refs.reference, 'mousedown', () => this.handlerFocus(false));
        off(document, 'mouseup', () => this.handlerBlur(false));
      }
      this.renderHtml && typeof this.renderHtml !== 'boolean' && this.renderHtml.removeChild(this.$refs.popper);
    },
    methods: {
      handlerClick() {
        if (this.disabled) return;
        if (this.trigger !== 'click') {
          return false;
        }
        this.visible = !this.visible;
      },

      handlerMouseenter() {
        if (this.disabled) return;
        this.popperHover = true;
        if (this.trigger !== 'hover') {
          return false;
        }
        if (this.hoverTimer) clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
          this.visible = true;
        }, 100);
      },

      handlerMouseleave() {
        if (this.disabled) return;
        this.popperHover = false;
        if (this.trigger !== 'hover') {
          return false;
        }
        if (this.hoverTimer) {
          clearTimeout(this.hoverTimer);
          this.hoverTimer = setTimeout(() => {
            this.visible = false;
          }, 100);
        }
      },

      handleClose() {
        if (this.disabled) return;
        if (this.trigger !== 'click') {
          return false;
        }
        if(this.popperHover){
          return false;
        }
        this.visible = false;
      },

      cancelClick(){
        this.visible = false;
        this.$emit('cancel')
      },

      okClick(){
        this.visible = false;
        this.$emit('ok')
      },

      getReferenceInputChildren() {
        const $input = this.$refs.reference.querySelectorAll('input');
        const $textarea = this.$refs.reference.querySelectorAll('textarea');
        let $children = null;

        if ($input.length) {
          $children = $input[0];
        } else if ($textarea.length) {
          $children = $textarea[0]
        }
        return $children;
      },

      handlerFocus(isInput = true) {
        if (this.disabled) return;
        if (this.trigger !== 'focus' || (this.isInput && !isInput)) {
          return false;
        }
        this.visible = true;
      },

      handlerBlur(isInput = true) {
        if (this.trigger !== 'focus' || (this.isInput && !isInput)) {
          return false;
        }
        this.visible = false;
      },

      renderToHtml(){
        if((typeof this.renderHtml === 'boolean' && this.renderHtml === false) || !this.renderHtml) return;
        if((typeof this.renderHtml === 'boolean' && this.renderHtml === true)){
          document.body.appendChild(this.$refs.popper);
        }else{
          this.renderHtml.appendChild(this.$refs.popper);
        }
      },
    }
  }
</script>
