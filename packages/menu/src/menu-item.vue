<template>
    <router-link v-if="to"
                 :class="[
                    'cl-menu-item',
                    active && 'is-active',
                    disabled && 'is-disabled',
                 ]"
                 :style="itemStyle"
                 @click.native="handlerClick"
                 :to="disabled ? $route.fullPath : to">
        <i v-if="icon" :class="icon"></i>
        <span>{{name}}</span>
    </router-link>
    <div v-else
         :class="[
            'cl-menu-item',
            active && 'is-active',
            disabled && 'is-disabled',
         ]"
         :style="itemStyle"
         @click="handlerClick">
        <slot>
            <i v-if="icon" :class="icon"></i>
            <span>{{name}}</span>
        </slot>
    </div>
</template>

<script>
  import Emitter from 'main/mixins/emitter'
  import {findComponent, findComponents} from "main/utils/tool";

  export default {
    name: "MenuItem",
    mixins: [Emitter],
    props: {
      cKey: {
        type: String,
        required: true
      },
      name: String,
      disabled: Boolean,
      icon: String,
      to: {
        type: [Object, String],
        default: ''
      },
    },
    data() {
      return {
        componentName: 'MenuItem',
        defaultPadding: 20,
        smallPadding: 10,
        largePadding: 30,
        active: false,
        menuComponent: findComponent(this, 'Menu'),
        parentSubMenuComponentNum: findComponents(this, 'Submenu').length,//父级元素有多少个subMenu组件
      }
    },
    computed: {
      itemStyle() {
        let style = {};
        const padding = this[`${this.menuComponent.size}Padding`];
        if (this.menuComponent.mode === 'horizontal') return {};
        let parentElIsGroup = this.$parent.componentName === 'ClMenuGroup';
        if (parentElIsGroup && !this.parentSubMenuComponentNum) {
          return {
            'padding-left': (padding + padding/2) + 'px'
          }
        }
        if (!this.parentSubMenuComponentNum) return {};
        style = {
          'padding-left': ((this.parentSubMenuComponentNum + 1) * padding) + 'px'
        };
        return style
      }
    },
    components: {},
    created() {
    },
    mounted() {

    },
    methods: {
      handlerClick() {
        if (this.disabled) return;
        this.parentEmit('Menu', 'on-update-active-key', this.cKey);
        this.parentEmit('Submenu', 'on-close-dropdown');
      },
    },
    watch: {
      'menuComponent.currentActiveKey': function (newVal) {
        this.active = this.cKey === newVal
      }
    }
  }
</script>
