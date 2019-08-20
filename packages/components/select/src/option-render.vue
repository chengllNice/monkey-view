<!--暂时无用-->
<script>
  const getOptionLabel = option => {
    if (option.componentOptions.propsData.label) return option.componentOptions.propsData.label;

    if(option.componentOptions.children && option.componentOptions.children.length === 1 && !option.componentOptions.children[0].tag){
      return option.componentOptions.children[0].text.replace(/\n/g, '').trim();
    }

    return option.componentOptions.propsData.value;
  };

  const getOptionGroupChildren = (optionGroup) => {
    let optionGroupObj = {};
    if(optionGroup.componentOptions) {
      let componentOptions = (optionGroup.componentOptions && optionGroup.componentOptions.children) || [];
      optionGroupObj = {
        label: optionGroup.componentOptions.propsData.label,
        selected: false,
        disabled: false,
        ...optionGroup.componentOptions.propsData,
        option: []
      };
      for (let option of componentOptions) {
        const cOption = option.componentOptions;
        if (!cOption) continue;
        if(cOption.tag && cOption.tag === 'ClOption'){
          optionGroupObj.option.push({
            label: getOptionLabel(option),
            selected: false,
            disabled: false,
            children: cOption.children,
            ...cOption.propsData
          })
        }
      }
    }
    return optionGroupObj;
  };
  export default {
    props: {
      children: {}
    },
    data() {
      return {}
    },
    computed: {
      selectOptionsData(){
        if(this.option){
          return this.option || []
        }
        let resultOption = [];
        let slotOptions = this.children || [];
        for (let option of slotOptions) {
          const cOption = option.componentOptions;
          if (!cOption) continue;
          if(cOption.tag && cOption.tag === 'ClOption'){
            resultOption.push({
              label: getOptionLabel(option),
              selected: false,
              disabled: false,
              children: cOption.children,
              ...cOption.propsData
            })
          }else if(cOption.tag && cOption.tag === 'ClOptionGroup'){
            resultOption.push(getOptionGroupChildren(option));
          }
        }
        return resultOption;
      },
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {},
    render(h){
      return h('div', this.children)
    },
    watch: {
      selectOptionsData(newVal){
        this.$emit('option-data-change', newVal)
      }
    }
  }
</script>
