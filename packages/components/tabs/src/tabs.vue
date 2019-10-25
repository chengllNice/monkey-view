<template>
    <div class="cl-tabs">
        <div :class="[
            'cl-tabs__header',
            align && `cl-tabs__header-${align}`
        ]">
            <div class="cl-tabs__container">
                <cl-scroll size="small">
                    <div class="cl-tabs__nav">
                        <span class="cl-tabs__nav-item" v-for="item in labelList" :key="item.cKey">
                            <span>{{item.label}}</span>
                            <i class="cl-tabs__close cl-icon-close"></i>
                        </span>
                    </div>
                </cl-scroll>
            </div>
            <div class="cl-tabs__extra"><slot name="extra"></slot></div>
        </div>
        <div class="cl-tabs__content"><slot></slot></div>
    </div>
</template>

<script>
    import { findComponentDirectChildrens} from "../../../utils/tool";

    export default {
    name: "ClTabs",
    props: {
      value: String,
      type: {
        type: String,
      },
      closable: Boolean,
      align: {
        type: String,
        default: 'left',
        validator(value){
          return ['left', 'center', 'right'].includes(value)
        }
      }
    },
    data() {
      return {
        labelList: [],
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
      this.updateLabelList();
    },
    methods: {
      getTabs(){
        const labelList = findComponentDirectChildrens(this, 'ClTabPane');
        console.log(labelList,'labelList')
        // labelList.forEach(item=>{
        //
        // })
        return labelList;
      },
      updateLabelList(){
        this.labelList = [];
        this.getTabs().forEach(item=>{
          this.labelList.push({
            cKey: item.cKey,
            label: item.label,
            disabled: item.disabled,
          })
        });
      },
    }
  }
</script>
