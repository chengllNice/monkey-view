<template>
    <div class="cl-tooltip"
         @mouseenter="handlerMouseenter"
         @mouseleave="handlerMouseleave">
        <transition :name="transition">
            <div class="cl-tooltip__popper"
                 ref="popper"
                 @mouseenter="handlerPopperMouseenter"
                 @mouseleave="handlerPopperMouseleave"
                 v-show="!disabled && (visible || always)">
                <div class="cl-tooltip__content" :style="expandStyle">
                    <div class="cl-tooltip__arrow" :style="arrowStyle"></div>
                    <div class="cl-tooltip__inner">
                        <slot name="content">{{content}}</slot>
                    </div>
                </div>
            </div>
        </transition>
        <div class="cl-tooltip__target"
             ref="reference">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import Popper from '../../../mixins/cl-popper'
  export default {
    name: "ClTooltip",
    mixins: [Popper],
    props: {
      placement: {
        type: String,
        default: 'bottom'
      },
      content: String,
      backgroundColor: String,
      textColor: String,
      value: Boolean,
      disabled: Boolean,
      maxWidth: [String, Number],
      always: Boolean,
      renderHtml: {
        type: [HTMLElement, Boolean],
        default: function () {
          return document.body
        }
      }
    },
    data() {
      return {
        hoverTimer: null,
        popperHover: false,
        targetHover: false,
      }
    },
    computed: {
      expandStyle(){
        let style = {
          'background-color': this.backgroundColor,
          'border-color': this.backgroundColor,
          'color': this.textColor};
        if(this.maxWidth !== undefined){
          let maxWidth = parseFloat(this.maxWidth) + 'px';
          return {'max-width': maxWidth, ...style}
        }
        return style
      },
      arrowStyle(){
        return {'background-color': this.backgroundColor,}
      }
    },
    components: {},
    created() {
    },
    mounted() {
      if (this.always) {
        this.updatePopper();
      }
      this.renderToHtml();
    },
    beforeDestroy(){
      this.renderHtml && typeof this.renderHtml !== 'boolean' && this.renderHtml.removeChild(this.$refs.popper);
    },
    methods: {
      handlerMouseenter() {
        if (this.disabled) return;
        this.targetHover = true;
        if (this.hoverTimer) clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
          this.visible = true;
        }, 100);
      },

      handlerMouseleave() {
        if (this.disabled) return;
        this.targetHover = false;
        if (this.hoverTimer) {
          clearTimeout(this.hoverTimer);
          this.hoverTimer = setTimeout(() => {
            this.visible = this.popperHover;
          }, 100);
        }
      },

      handlerPopperMouseenter(){
        if (this.disabled) return;
        this.popperHover = true;
        if (this.hoverTimer) clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
          this.visible = true;
        }, 100);
      },

      handlerPopperMouseleave(){
        if (this.disabled) return;
        this.popperHover = false;
        if (this.hoverTimer) {
          clearTimeout(this.hoverTimer);
          this.hoverTimer = setTimeout(() => {
            this.visible = this.targetHover;
          }, 100);
        }
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
