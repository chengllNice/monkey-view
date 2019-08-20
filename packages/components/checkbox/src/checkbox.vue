<template>
    <label class="cl-checkbox" :class="[
        size && `cl-checkbox--${size}`,
        {
            'is-checked': isChecked,
            'is-indeterminate': !isChecked && indeterminate,
            'is-disabled': isDisabled,
        }
    ]">
        <span class="cl-checkbox__input">
            <span class="cl-checkbox__inner"></span>
            <input
                    hidden
                    class="cl-checkbox__source"
                    type="checkbox"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    :value="label"
                    v-model="model"
                    :name="name"
                    :disabled="isDisabled"
                    @change="handleChange"
                    >
        </span>

        <span class="cl-checkbox__label">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>

<script>
  export default {
    name: "ClCheckbox",
    props: {
      value: {
        type: [Number, String, Boolean],
        default: false
      },
      label: [Number, String, Boolean],
      indeterminate: Boolean,
      disabled: Boolean,
      name: String,
      trueValue: {
        type: [Number, String, Boolean],
        default: true
      },
      falseValue: {
        type: [Number, String, Boolean],
        default: false
      },
      size: String,
    },
    data() {
      return {
        model: false,
        isChecked: false,
      }
    },
    computed: {
      parentGroup(){
        let parent = this.$parent;
        while (parent){
          if(parent.componentName !== 'ClCheckboxGroup'){
            parent = parent.$parent;
          }else{
            return parent
          }
        }
        return false
      },
      isDisabled(){
        return this.parentGroup ? (this.parentGroup.disabled ? this.parentGroup.disabled : this.disabled) : this.disabled
      },
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handleChange(){
        if(this.isDisabled) return;
        this.$nextTick(()=>{
          let value;
          if(this.model === this.trueValue){
            value = this.trueValue;
          }else if(this.model === this.falseValue){
            value = this.falseValue;
          }else{
            throw 'Value should be trueValue or falseValue';
          }
          this.updateIsChecked(value);
          this.parentGroup ? this.parentGroup.dispatch('input', this.label, value) : this.$emit('input', value);
          this.parentGroup ? this.parentGroup.dispatch('change', this.label, value) : this.$emit('change', value);
        });
      },
      updateIsChecked(value){
        this.isChecked = value === this.trueValue ? true : false;
      }
    },
    watch: {
      value: function (newVal) {
        this.model = newVal;
        if(newVal === this.trueValue){
          this.model = this.trueValue;
        }else if(newVal === this.falseValue){
          this.model = this.falseValue;
        }else{
          throw 'Value should be trueValue or falseValue';
        }
      },
      'parentGroup.value': function (newVal) {
        this.model = newVal.includes(this.label);
        this.updateIsChecked(this.model);
      },
      model: function (newVal) {
        this.updateIsChecked(newVal);
      }
    }
  }
</script>

<style scoped>

</style>
