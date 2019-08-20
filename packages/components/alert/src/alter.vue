<template>
    <transition :name="transition">
        <div class="cl-alter"
             v-if="!closed"
             :class="[
                type && `cl-alter--${type}`,
                isDescription && `cl-alter--with-des`,
                showIcon && `cl-alter--with-icon`,
                effect && `cl-alter--${effect}`
             ]">
            <span class="cl-alter__icon" v-if="showIcon">
                <slot name="icon">
                    <i :class="iconClass"></i>
                </slot>
            </span>
            <span class="cl-alter__message"><slot></slot></span>
            <span class="cl-alter__description"><slot name="description"></slot></span>
            <span class="cl-alter__close" v-if="closable" @click="handlerClose">
                <slot name="close">
                    <i class="cl-icon-close"></i>
                </slot>
            </span>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "ClAlter",
    props: {
      type: {
        type: String,
        default: 'info',
        validator (value) {
          return ['success', 'info', 'warning', 'error'].includes(value);
        },
      },
      transition: {
        type: String,
        default: 'AlterFade'
      },
      showIcon: Boolean,
      closable: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator(value){
          return ['light', 'dark'].includes(value)
        }
      }
    },
    data() {
      return {
        closed: false,
      }
    },
    computed: {
      isDescription(){
        return this.$slots.description
      },
      iconClass(){
        let icon = '';
        switch (this.type) {
          case 'success':
            icon = this.isDescription ? 'cl-icon-circle-success' : 'cl-icon-circle-success-solid';
            break;
          case 'error':
            icon = this.isDescription ? 'cl-icon-circle-close' : 'cl-icon-circle-close-solid';
            break;
          case 'warning':
            icon = this.isDescription ? 'cl-icon-warning' : 'cl-icon-warning-solid';
            break;
          default:
            icon = this.isDescription ? 'cl-icon-info' : 'cl-icon-info-solid';
            break;
        }
        return icon
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClose(){
        this.closed = true;
        this.$emit('close')
      }
    }
  }
</script>
