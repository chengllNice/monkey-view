<template>
    <div class="cl-tag"
         :class="[
            size && 'cl-tag--' + size,
            noCustomColor && 'cl-tag--' + color,
            ghost && 'cl-tag--ghost',
            isChecked && 'is-checked'
        ]"
        :style="customStyle"
         @click.stop="handlerClick">
            <span class="cl-tag__text"><slot></slot></span>
            <i v-if="closable" :class="iconClass" :style="iconStyle" @click.stop="handlerClose"></i>
    </div>
</template>

<script>
  export default {
    name: "ClTag",
    props: {
      size: String,
      closable: Boolean,
      ghost: Boolean,
      checkable: Boolean,
      checked: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        isHover: false,
        isChecked: this.checked,
      }
    },
    computed: {
      iconClass(){
        return [
          'cl-tag__icon',
          this.isHover ? 'cl-icon-circle-close-solid' : 'cl-icon-close',
        ]
      },
      noCustomColor(){
        return ['primary', 'success', 'danger', 'warning', 'info', 'default', 'primary-o', 'success-o', 'danger-o', 'warning-o', 'info-o', 'default-o'].includes(this.color)
      },
      customStyle(){
        if(this.noCustomColor) return {};
        if(this.ghost) {
          return {
            'background-color': 'transparent',
            'color': this.color,
            'border-color': this.color,
          };
        }
        return {
          'background-color': this.color,
          'color': '#ffffff',
          'border-color': this.color,
        };
      },
      iconStyle(){
        if(this.noCustomColor) return {};
        if(this.ghost) {
          return {
            'color': this.color
          };
        }
        return {
          'color': '#ffffff'
        };
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClose(){
        this.$emit('close')
      },
      handlerClick(){
        if(this.checkable){
            this.isChecked = !this.isChecked;
        }
        this.$emit('click');
      }
    },
    watch: {
      checked: function (newVal) {
        this.isChecked = newVal;
      }
    }
  }
</script>
