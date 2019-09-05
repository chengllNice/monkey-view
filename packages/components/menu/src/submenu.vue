<template>
    <div class="cl-submenu"
         :class="[
            opened && 'cl-submenu--opened',
            disabled && 'is-disabled',
            active && 'is-active',
         ]"
         @mouseenter="hanlderMouseenter"
         @mouseleave="hanlderMouseleave">
        <div class="cl-submenu__title" ref="reference" :style="titleStyle" @click.stop="handlerClick">
            <slot name="title">
                <i v-if="icon" :class="icon"></i>
                <span>{{name}}</span>
            </slot>
            <i v-if="!hideDropIcon" class="cl-submenu__title-slide-icon" :class="openedIcon"></i>
        </div>
        <SlideTransition v-if="menuComponent.mode==='vertical'">
            <div v-show="opened" class="cl-submenu__content">
                <slot></slot>
            </div>
        </SlideTransition>

        <transition v-else name="fade">
            <DropDown v-show="opened && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      v-model="opened">
                <div class="cl-submenu__drop-inner">
                    <slot></slot>
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
  import SlideTransition from '../../base/slide-transition.vue'
  import {findComponent, findComponents, findComponentChildrens} from "../../../utils/tool";
  import Emitter from '../../../mixins/emitter'
  import DropDown from '../../select/src/drop-down.vue'

  export default {
    name: "ClSubmenu",
    mixins: [Emitter],
    props: {
      cKey: {
        type: String,
        required: true
      },
      name: String,
      icon: String,
      disabled: Boolean,
      hideDropIcon: Boolean,
      forbidden: Boolean,//禁止展开（但不是disabled，不控制样式）
    },
    data() {
      return {
        componentName: 'ClSubmenu',
        defaultPadding: 20,
        smallPadding: 10,
        largePadding: 30,
        opened: false,
        active: false,
        menuComponent: findComponent(this, 'ClMenu'),
        parentSubmenuComponents: findComponents(this, 'ClSubmenu'),
        childrenMenuItemComponents: findComponentChildrens(this, 'ClMenuItem'),
        parentSubMenuComponentNum: findComponents(this, 'ClSubmenu').length,//父级元素有多少个subMenu组件
        timer: null,
      }
    },
    computed: {
      titleStyle() {
        if (this.menuComponent.mode === 'horizontal') return {};
        if (!this.parentSubMenuComponentNum) return {};
        const padding = this[`${this.menuComponent.size}Padding`];
        return {
          'padding-left': ((this.parentSubMenuComponentNum + 1) * padding) + 'px',
        }
      },
      parentSubmenuComponentkeys() {
        let keys = [];
        this.parentSubmenuComponents.forEach(item => {
          keys.push(item.cKey)
        });
        return keys;
      },
      childrenMenuItemComponentsKeys() {
        let keys = [];
        this.childrenMenuItemComponents.forEach(item => {
          keys.push(item.cKey)
        });
        return keys;
      },
      openedIcon() {
        if (this.parentSubMenuComponentNum && this.menuComponent.mode === 'horizontal') {
          return 'cl-icon-left'
        }
        return 'cl-icon-down'
      },
      placement() {
        if (this.parentSubMenuComponentNum) {
          return 'right-start'
        }
        return 'bottom-start'
      }
    },
    components: {
      SlideTransition,
      DropDown
    },
    created() {
    },
    mounted() {

    },
    methods: {
      hanlderMouseenter() {
        if (this.disabled || this.forbidden) return;
        if (this.menuComponent.mode === 'vertical') return;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.opened = true;
        }, 200);
        this.parentEmit('ClMenu', 'on-update-opened-key', this.cKey)
      },
      hanlderMouseleave() {
        if (this.disabled || this.forbidden) return;
        if (this.menuComponent.mode === 'vertical') return;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.opened = false;
        }, 100);
        this.parentEmit('ClMenu', 'on-update-opened-key', this.cKey)
      },
      handlerClick() {
        if (this.disabled || this.forbidden) return;
        if (this.menuComponent.mode === 'horizontal') return;
        this.closeSubmenuChildren();
        this.opened = !this.opened;
        if (this.menuComponent.accordion) {
          let openedKeys = [];
          if (this.opened) {
            openedKeys = [...this.parentSubmenuComponentkeys, this.cKey]
          } else {
            openedKeys = [...this.parentSubmenuComponentkeys]
          }
          this.parentEmit('ClMenu', 'on-update-opened-key', openedKeys)
        } else {
          this.parentEmit('ClMenu', 'on-update-opened-key', this.cKey)
        }
      },
      closeSubmenuChildren() {
        //关闭该组件下的所有submenu子组件
        let childrens = findComponentChildrens(this, 'ClSubmenu');
        childrens.forEach(item => {
          if (item.opened) {
            this.parentEmit('ClMenu', 'on-update-opened-key', item.cKey);
            item.opened = false;
          }
        })
      },
      menuItemChildrenActive(key) {
        if(this.disabled || this.forbidden) return;
        let activeChildren = findComponentChildrens(this, 'ClMenuItem').filter(item => {
          return item.cKey === key
        });
        this.active = activeChildren.length ? true : false;
      }
    },
    watch: {
      'menuComponent.openedKeys': function (newVal) {
        if(this.disabled || this.forbidden) return;
        this.opened = newVal.includes(this.cKey);
      },
      'menuComponent.currentActiveKey': function (newVal) {
        if (this.menuComponent.mode === 'horizontal') {
          this.menuItemChildrenActive(newVal);
        }
      },
      forbidden(newVal){
        if(newVal){
          this.closeSubmenuChildren();
          this.opened = false;
        }
      }
    }
  }
</script>
