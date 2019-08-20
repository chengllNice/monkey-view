<template>
    <transition name="MessageFade" @after-leave="handleAfterLeave">
        <div class="cl-message"
             :class="[
                type && `cl-message--${type}`
             ]"
             :style="expandStyle"
             v-show="visible"
             @mouseenter="clearTimer"
             @mouseleave="startTimer">
            <i class="cl-message__icon" :class="iconClass" v-if="iconClass"></i>
            <span class="cl-message__content">{{message}}</span>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "ClMessage",
    data() {
      return {
        visible: false,
        type: 'info',
        message: '',
        duration: 3000,
        top: 20,
        currentTop: 20,
        timer: null,
        closed: false,
      }
    },
    computed: {
      iconClass(){
        let result;
        switch (this.type) {
          case 'info':
            result = 'cl-icon-info-solid';
            break;
          case 'success':
            result = 'cl-icon-circle-success-solid';
            break;
          case 'warning':
            result = 'cl-icon-warning-solid';
            break;
          case 'error':
            result = 'cl-icon-circle-close-solid';
            break;
          case 'loading':
            result = 'cl-rotate cl-icon-loading1';
            break;
          default:
            result = 'cl-icon-question-solid';
            break;
        }
        return result;
      },
      expandStyle(){
        return {top: parseFloat(this.currentTop) + 'px'}
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      show(){
        this.visible = true;
        this.startTimer();
      },
      close(){
        this.closed = true;
        this.visible = false;
        this.onCloseComputed();
        this.onClose();
      },
      onClose(){},
      onCloseComputed(){},
      startTimer(){
        if(this.duration > 0){
          this.timer = setTimeout(()=>{
            !this.closed && this.close();
          }, this.duration)
        }
      },
      clearTimer(){
        this.timer && clearTimeout(this.timer);
      },
      handleAfterLeave(){
        this.clearTimer();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    beforeDestroy(){

    }
  }
</script>
