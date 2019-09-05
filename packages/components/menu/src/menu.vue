<template>
    <div class="cl-menu"
         :class="[
            theme && `cl-menu--${theme}`,
            size && `cl-menu--${size}`,
            mode && `cl-menu--${mode}`
         ]" :style="menuStyle">
        <slot></slot>
    </div>
</template>

<script>
  import Emitter from '../../../mixins/emitter'

  export default {
    name: "ClMenu",
    mixins: [Emitter],
    props: {
      width: {
        type: [String, Number],
        default: 240,
      },
      theme: {
        type: String,
        default: 'light',
        validator(value) {
          return ['light', 'dark', 'green'].includes(value)
        }
      },
      size: {
        type: String,
        default: 'default',
      },
      activeKey: String,
      openKeys: {
        type: Array,
        default: function () {
          return []
        }
      },
      accordion: Boolean,//手风琴模式，开启后每次最多展开一个子菜单
      mode: {
        type: String,
        default: 'vertical',
        validator(value) {
          return ['vertical', 'horizontal'].includes(value)
        }
      }
    },
    data() {
      return {
        componentName: 'ClMenu',
        currentActiveKey: '',
        openedKeys: []
      }
    },
    computed: {
      menuStyle() {
        let style = {};
        if (this.mode === 'vertical') {
          style = {
            'width': parseFloat(this.width) + 'px',
          }
        }
        return style
      }
    },
    components: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.updateOpenedKey();
        this.updateActiveKey();
      });
      this.$on('on-update-opened-key', (key) => {
        if (this.accordion) {
          this.openedKeys = key || [];
        } else {
          if (this.openedKeys.includes(key)) {
            let index = this.openedKeys.indexOf(key);
            this.openedKeys.splice(index, 1)
          } else {
            this.openedKeys.push(key);
          }
        }
        this.$emit('open-change', key, this.openedKeys);
      });
      this.$on('on-update-active-key', (key) => {
        if (this.currentActiveKey !== key) {
          this.currentActiveKey = key;
          this.$emit('select', key);
        }
      });
    },
    methods: {
      updateActiveKey() {
        this.currentActiveKey = this.activeKey;
      },
      updateOpenedKey() {
        this.openedKeys = [...this.openKeys];
      }
    },
    watch: {
      activeKey: function (newVal, oldVal) {
        if (newVal === oldVal) return;
        this.updateActiveKey();
      },
      openKeys: {
        handler() {
          this.updateOpenedKey();
        },
        deep: true
      }
    }
  }
</script>
