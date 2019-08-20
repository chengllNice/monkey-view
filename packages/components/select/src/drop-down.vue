<template>
    <div class="cl-drop-down" :style="expandStyle">
        <slot></slot>
    </div>
</template>

<script>
  import Vue from 'vue'
  const isServer = Vue.prototype.$isServer;
  const Popper = isServer ? function () {} : require('popper.js/dist/umd/popper.js');
  export default {
    name: "ClDropDown",
    props: {
      dropdownMatchSelectWidth: Boolean,
      placement: {
        type: String,
        default: 'bottom-start'
      },
      reference: {},//触发元素
      popper: {},
      value: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function () {
          return {
            modifiers: {
              computeStyle:{
                gpuAcceleration: false,
              },
              preventOverflow :{
                boundariesElement: 'window'
              }
            }
          }
        }
      }
    },
    data() {
      return {
        visible: false,
        expandStyle: {}
      }
    },
    watch: {
      value: function (newVal) {
        this.visible = newVal;
      },
      visible: function (newVal) {
        if(newVal){
          this.$nextTick(this.updatePopper());
          this.$emit('on-show')
        }else{
          this.$emit('on-hide')
        }
        this.$emit('input', newVal);
      }
    },
    computed: {
      selectParentEl(){
        let parent = this.$parent;
        while (parent){
          if(parent.componentName !== 'ClSelect'){
            parent = parent.$parent;
          }else{
            return parent
          }
        }
        return false
      },
    },
    components: {},
    created() {
    },
    mounted() {
      this.visible = this.value;
      this.$nextTick(()=>{
        this.setExpandStyle();
      });
    },
    methods: {
      setExpandStyle(){
        let width = this.selectParentEl && this.selectParentEl.$el && (this.selectParentEl.$el.offsetWidth || 0);
        this.expandStyle = {
          width: this.dropdownMatchSelectWidth ? (width + 'px') : 'auto',
        }
      },
      createPopper(){
        if(isServer) return;

        if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
          return;
        }


        const options = this.options;
        const clPopper = this.$el;
        const reference = this.reference || this.$parent.$refs.reference;

        if(!clPopper || !reference) return;

        if(this.popperJS && this.popperJS.hasOwnProperty('destroy')){
          this.popperJS.destroy();
        }

        options.placement = this.placement;
        !options.modifiers.offset && (options.modifiers.offset = {});
        options.onCreate = () => {
          this.$nextTick(this.updatePopper);
          // this.$emit('created', this);
        };

        this.popperJS = new Popper(reference, clPopper, options);
      },
      updatePopper(){
        if(isServer) return;
        // console.log('=====',this.popperJS)
        this.popperJS ? this.popperJS.update() : this.$nextTick(this.createPopper());
      }
    },
    updated (){
      this.$nextTick(()=>{
        // this.setExpandStyle();
        this.updatePopper();
      });
    },
    beforeDestroy(){
      if(isServer) return;
      if(this.popperJS && this.popperJS.hasOwnProperty('destroy')){
        this.popperJS.destroy();
      }
    }
  }
</script>
