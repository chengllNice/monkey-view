<template>
    <div class="cl-option-group"
         v-show="isShow"
         :class="[
            {
                'is-disabled': disabled,
                'is-selected': selected
            }
        ]">
        <div class="cl-option-group__title">
            <span v-if="!$slots.groupTitle">{{label}}</span>
            <slot name="groupTitle"></slot>
        </div>
        <div class="cl-option-group__wrap"><slot></slot></div>
    </div>
</template>

<script>
  export default {
    name: "OptionGroup",
    props: {
      label: {
        type: String,
        default: ''
      },
      disabled: Boolean,//暂时不用
      selected: Boolean,//暂时不用
      value: [String, Number],//暂时不用
    },
    data() {
      return {
        componentName: 'OptionGroup',
        isShow: true
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
      this.$nextTick(this.setIsShow);
    },
    methods: {
      setIsShow(){
        let result;
        if(this.$slots.default){
          let optionShowArr = [];
          for (let option of this.$slots.default){
            let cOption = option.componentInstance;
            let tag = cOption.componentName || option.componentOptions.tag;
            if(tag === 'ClOption'){
              optionShowArr.push(cOption.isShow);
            }
          }
          result = optionShowArr.includes(true)
        }else{
          result = true;
        }
        this.isShow = result;
      }
    },
    updated(){
      this.$nextTick(this.setIsShow);
    }
  }
</script>
