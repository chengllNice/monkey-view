<template>
    <div class="cl-badge" :class="[
        dot && 'cl-badge--dot',
        status && `cl-badge--status cl-badge--status-${status}`,
        alone && 'cl-badge--alone',
        isColor && `cl-badge--${color}`
    ]">
        <slot v-if="!status"></slot>
        <sup class="cl-badge__sup" :style="supStyle" v-if="supShow" :title="supTitle">{{supText}}</sup>
        <span class="cl-badge__status-text" v-if="status">{{statusText}}</span>
    </div>
</template>

<script>
  export default {
    name: "Badge",
    props:{
      dot: Boolean,
      count: [Number, String],
      overflowCount: {
        type: Number,
        default: 99
      },
      showZero: Boolean,//默认0时不展示
      text: String,
      status: {
        type: String,
        validator(value){
          return ['success', 'error', 'warning', 'processing', 'default'].includes(value)
        }
      },
      color: String,
      offset: Array,
      title: String
    },
    data() {
      return {}
    },
    computed: {
      supShow(){
        return this.showZero || parseFloat(this.count) !== 0;
      },
      supText(){
        let text = '';
        if(this.dot || this.status){
          text = ''
        }else if(this.text){
          text = this.text
        }else if(parseFloat(this.count) > this.overflowCount){
          text = this.overflowCount + '+'
        }else{
          text = parseFloat(this.count)
        }
        return text;
      },
      statusText(){
        return this.text
      },
      isColor(){
        if(this.status) return false;
        return ['primary', 'success', 'error', 'info', 'warning'].includes(this.color);
      },
      supStyle(){
        let style = {};
        if(!this.isColor) {
          style = {
            'background-color': this.color
          };
        }
        if(Array.isArray(this.offset) && this.offset.length){
          let x = parseFloat(this.offset[0]);
          let y = parseFloat(this.offset[1]);
          style = {
            ...style,
            'margin-top': y + 'px',
            'margin-right': x + 'px',
          }
        }
        return style;
      },
      alone(){
        return !this.$slots.default
      },
      supTitle(){
        if(this.dot || this.status) return '';
        return this.title || this.text || parseFloat(this.count)
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
