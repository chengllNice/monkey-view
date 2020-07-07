<template>
    <div :class="[
        'cl-collapse-item',
        opened && 'cl-collapse-item--opened',
        disabled && 'is-disabled'
    ]">
        <div class="cl-collapse-item__header" @click="handlerClick">
            <i v-if="!hideArrow" class="cl-icon-right cl-collapse-item__header-icon"></i>
            <div class="cl-collapse-item__header-name">
                <slot name="title">
                    {{name}}
                </slot>
            </div>
            <slot name="extra"></slot>
        </div>
        <SlideTransition>
            <div v-show="opened" class="cl-collapse-item__content">
                <div class="cl-collapse-item__content-inner">
                    <slot></slot>
                </div>
            </div>
        </SlideTransition>
    </div>
</template>

<script>
  import Emitter from 'main/mixins/emitter'
  import {findComponent} from "main/utils/tool";
  import SlideTransition from '../../base/slide-transition.vue'

  export default {
    name: "ClCollapseItem",
    mixins: [Emitter],
    props: {
      cKey: {
        type: String,
        required: true
      },
      name: String,
      disabled: Boolean,
      hideArrow: Boolean,
    },
    data() {
      return {
        componentName: 'ClCollapseItem',
        opened: false,
        collapseComponent: findComponent(this, 'ClCollapse')
      }
    },
    computed: {},
    components: {
      SlideTransition
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClick(){
        if(this.disabled) return;
        this.opened = !this.opened;
        this.parentEmit('ClCollapse', 'on-update-opened-key', this.cKey)
      }
    },
    watch: {
      'collapseComponent.currentOpenedKey': {
        handler(newVal){
          if(this.disabled) return;
          if(!newVal) {
            this.opened = false;
            return;
          }
          this.opened = newVal.includes(this.cKey);
        },
        deep: true
      }
    }
  }
</script>
