<template>
    <transition :appear="appear"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"

                v-on:before-leave="beforeLeave"
                v-on:leave="leave"
                v-on:after-leave="afterLeave">
        <slot></slot>
    </transition>
</template>

<script>
  export default {
    name: "SlideTransition",
    props: {
      appear: Boolean
    },
    data() {
      return {}
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      // --------
      // 进入中
      // --------
      beforeEnter(el){
        el.classList.add('slide-transition');
        el.style.height = '0px';

      },
      enter(el){
        if(el.scrollHeight){
          el.style.height = el.scrollHeight + 'px';
        }else{
          el.style.height = '';
        }
        el.style.overflow = 'hidden';
      },
      afterEnter(el){
        el.classList.remove('slide-transition');
        el.style.height = '';
      },
      // --------
      // 离开时
      // --------
      beforeLeave(el){
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },
      leave(el){
        if(el.scrollHeight !== 0){
          el.classList.add('slide-transition');
          el.style.height = '0px';
        }
      },
      afterLeave(el){
        el.classList.remove('slide-transition');
        el.style.height = '';
      },
    }
  }
</script>
