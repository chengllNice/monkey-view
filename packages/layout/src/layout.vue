<template>
    <div class="cl-layout" :class="{'cl-layout--hasSider': hasSider}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "Layout",
    data() {
      return {
        hasSider: false,
      }
    },
    computed: {

    },
    components: {},
    created() {
    },
    mounted() {
      this.hasSider = this.findSider();
    },
    methods: {
      findSider(){
        return this.$children.some(item=>{
          return item.componentName === 'Sider'
        })
      }
    }
  }
</script>
