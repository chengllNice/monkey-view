<template>
    <tr class="cl-table-row" :class="[]"><slot></slot></tr>
</template>

<script>
  export default {
    name: "ClTableTr",
    props:{
      row: {
        type: Object,
        default: function () {
          return {}
        }
      }
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
    methods: {}
  }
</script>
