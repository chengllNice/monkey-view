<template>
    <div class="cl-radio-group">
        <span v-if="$slots.default"><slot></slot></span>
        <ClRadio v-else-if="options && options.length"
                 v-for="(item, index) in options"
                 :key="item.value"
                 :name="item.name"
                 :disabled="item.disabled"
                 :label="item.value">{{item.label}}</ClRadio>
    </div>
</template>

<script>
    import ClRadio from './radio.vue'
  export default {
    name: "ClRadioGroup",
    props: {
      value: [String, Number, Boolean],
      disabled: Boolean,
      size: String,
      options: Array
    },
    data() {
      return {
        componentName: 'ClRadioGroup',
      }
    },
    computed: {},
    components: {
      ClRadio
    },
    created() {
    },
    mounted() {
    },
    methods: {
      dispatch(type, value){
        type === 'input' && this.$emit('input', value);
        type === 'change' && this.$emit('change', value);
      }
    }
  }
</script>

<style scoped>

</style>
