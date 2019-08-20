<template>
    <div class="cl-checkbox-group">
        <span v-if="$slots.default"><slot></slot></span>
        <ClCheckbox v-else-if="options && options.length"
                 v-for="item in options"
                 :key="item.value"
                 :name="item.name"
                 :disabled="item.disabled"
                 :label="item.value">{{item.label}}</ClCheckbox>
    </div>
</template>

<script>
    import ClCheckbox from './checkbox.vue'
  export default {
    name: "ClCheckboxGroup",
    props: {
      value: Array,
      disabled: Boolean,
      size: String,
      options: Array
    },
    data() {
      return {
        componentName: 'ClCheckboxGroup',
      }
    },
    computed: {},
    components: {
      ClCheckbox
    },
    created() {
    },
    mounted() {
    },
    methods: {
      dispatch(type, label, value){
        let index = this.value.indexOf(label);
        index > -1 && this.value.splice(index, 1);
        value && this.value.push(label);
        type === 'input' && this.$emit('input', this.value);
        type === 'change' && this.$emit('change', this.value);
      }
    },
    // watch: {
    //   value: function (newVal) {
    //
    //   }
    // }
  }
</script>

<style scoped>

</style>
