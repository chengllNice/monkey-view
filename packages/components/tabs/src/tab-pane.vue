<template>
    <div class="cl-tab-pane">
        <slot v-show="false" name="label"></slot>
        <slot></slot>
    </div>
</template>

<script>
    import {findComponent} from "../../../utils/tool";

    export default {
    name: "ClTabPane",
    props: {
      label: {
        type: String,
        default: ''
      },
      cKey: String,
      disabled: Boolean
    },
    data() {
      return {
        componentName: 'ClTabPane'
      }
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
