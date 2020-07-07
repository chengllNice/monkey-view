<template>
    <div class="TimeView">
        <cl-time :time="baseTime" format="YYYY-MM hh:mm"></cl-time>
        <br>
        <cl-time :time="baseTime" type="date"></cl-time>
        <br>
        <cl-time :time="baseTime" type="datetime"></cl-time>
    </div>
</template>

<script>

  export default {
    name: "TimeView",
    data() {
        let nowDate = new Date();
        let yesterDate = new Date();
        yesterDate.setDate(nowDate.getDate() - 1);
      return {
        baseTime: nowDate.getTime() + 4 * 60 * 60 * 1000
      }
    },
    computed: {},
    components: {

    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
