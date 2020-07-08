<template>
    <div :class="[
            `${classPrefix}`,
            theme && `${classPrefix}--${theme}`,
            size && `${classPrefix}--${size}`,
            mode && `${classPrefix}--${mode}`,
            noHoverBackground && `${classPrefix}--nohover`,
         ]" :style="menuStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Emitter from 'main/mixins/emitter'

    export default {
        name: "Menu",
        mixins: [Emitter],
        props: {
            width: {
                type: [String, Number],
                default: 240,
            },
            noHoverBackground: {
                type: Boolean,
                default: false
            },//是否需要hover的背景
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
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
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
                classPrefix: Config.classPrefix + '-menu',
                componentName: 'Menu',
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
