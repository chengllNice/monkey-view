<template>
    <div class="TimeView">
        <Time :time="baseTime" format="yyyy-MM hh:mm"></Time>
        <br>
        <Time :time="baseTime" type="date"></Time>
        <br>
        <Time :time="baseTime" type="datetime"></Time>
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
