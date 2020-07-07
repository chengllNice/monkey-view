<template>
    <div class="cl-sider"
         :class="[
            hideTrigger && 'cl-sider--hideTrigger',
            collapsed ? 'cl-sider--close' : 'cl-sider--open',
         ]"
         ref="sider"
         :style="sliderStyle">
        <div class="cl-sider__zero-trigger" v-if="showZeroTrigger" @click="triggerClick">
            <i class="cl-icon-arrow-right"></i>
        </div>
        <div class="cl-sider__header" ref="header" v-if="$slots.header"><slot name="header"></slot></div>
        <div class="cl-sider__content" :style="contentStyle">
            <cl-scroll size="small" :scroll-option="scrollOption">
                <slot></slot>
            </cl-scroll>
        </div>
        <div class="cl-sider__trigger" ref="trigger" v-if="!hideTrigger" @click="triggerClick">
            <slot name="trigger">
                <i class="cl-icon-left cl-sider__trigger-icon"></i>
            </slot>
        </div>
    </div>
</template>

<script>
  import elementResizeDetectorMaker from 'element-resize-detector';
  export default {
    name: "Sider",
    props: {
      value: Boolean,//展开收起
      width: {
        type: [Number, String],
        default: 200
      },
      height: [Number, String],
      collapsedWidth: {
        type: [Number, String],
        default: 60
      },
      hideTrigger: Boolean,
    },
    data() {
      return {
        componentName: 'Sider',
        observer: null,
        contentStyle: {},
        collapsed: this.value || false,
        scrollOption: {
          scrollPanel: {
            scrollingX: false,
          }
        }
      }
    },
    computed: {
      sliderStyle(){
        let width = parseFloat(this.width);
        if(this.collapsed){
          width = parseFloat(this.collapsedWidth);
        }
        let style = {
          'width': width + 'px',
        };
        return style
      },
      showZeroTrigger(){
        return parseFloat(this.collapsedWidth) === 0 && !this.hideTrigger && this.collapsed
      }
    },
    components: {},
    created() {
    },
    mounted() {
      this.observer = elementResizeDetectorMaker();
      this.observer.listenTo(this.$refs.sider, this.setContentStyle);
    },
    beforeDestroy() {
      this.observer && this.observer.removeListener(this.$refs.sider, this.setContentStyle);
    },
    methods: {
      triggerClick(){
        this.collapsed = !this.collapsed;
        this.$emit('input', this.collapsed)
      },
      setContentStyle(){
        let height = parseFloat(this.height) || this.$el.offsetHeight;
        let headerHeight = this.$refs.header ? this.$refs.header.offsetHeight : 0;
        let triggerHeight = this.$refs.trigger ? this.$refs.trigger.offsetHeight : 0;
        this.contentStyle = {
          height: (height - headerHeight - triggerHeight) + 'px'
        };
      },
    },
    watch: {
      value(newVal){
        this.collapsed = newVal;
        this.$emit('collapse', newVal);
      }
    }
  }
</script>
