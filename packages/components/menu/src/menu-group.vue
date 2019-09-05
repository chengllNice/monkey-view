<template>
    <div class="cl-menu-group">
        <div class="cl-menu-group__title" :style="groupStyle"><slot name="title">{{name}}</slot></div>
        <slot></slot>
    </div>
</template>

<script>
  import {findComponent, findComponents} from '../../../utils/tool.js'

  export default {
    name: "ClMenuGroup",
    props: {
      name: String,
    },
    data() {
      return {
        componentName: 'ClMenuGroup',
        defaultPadding: 20,
        smallPadding: 10,
        largePadding: 30,
        menuComponent: findComponent(this, 'ClMenu'),
        parentSubMenuComponentNum: findComponents(this, 'ClSubmenu').length,//父级元素有多少个subMenu组件
      }
    },
    computed: {
      groupStyle() {
        if (this.menuComponent.mode === 'horizontal') return {};
        if (!this.parentSubMenuComponentNum) return {};
        const padding = this[`${this.menuComponent.size}Padding`];
        return {
          'padding-left': ((this.parentSubMenuComponentNum + 1) * padding - padding / 2) + 'px'
        }
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
