<template>
    <div class="cl-header" :style="expandStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "Header",
    props: {
      height: [String, Number]
    },
    data() {
      return {}
    },
    computed: {
      expandStyle(){
        return {
          'height': parseFloat(this.height) + 'px',
          'line-height': parseFloat(this.height) + 'px',
        }
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
