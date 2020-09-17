<template>
    <div :class="[
            `${classPrefix}`,
            theme && `${classPrefix}--${theme}`,
            mode && `${classPrefix}--${mode}`,
            collapse && mode === 'vertical' && `${classPrefix}--collapse`,
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
            theme: {
                type: String,
                default: 'light',
                validator(value) {
                    return ['light', 'dark', 'green'].includes(value)
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
            },
            //vertical模式下配置submenu\item\group的高度；horizontal模式下配置一级菜单的高度
            itemHeight: {
                type: [String, Number],
                default: 50
            },
            //展开 false;收起 true
            collapse: {
                type: Boolean,
                default: false
            },
            //收起的宽度
            collapsedWidth: {
                type: [String, Number],
                default: 80
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-menu',
                componentName: 'Menu',
                currentActiveKey: '',
                openedKeys: [],
                defaultPadding: 20,
            }
        },
        computed: {
            menuStyle() {
                let style = {};
                if (this.mode === 'vertical') {
                    let width = this.collapse ? parseInt(this.collapsedWidth): parseFloat(this.width);
                    style = {
                        'width': width + 'px',
                    }
                }
                return style
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.updateOpenedKey();
                this.updateActiveKey();
            });
            this.$on('on-update-opened-key', (key) => {
                console.log(key)
                if(this.mode === 'vertical' && !this.collapse){
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
                }
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
                if(this.mode === 'vertical' && !this.collapse) this.openedKeys = [...this.openKeys];
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
            },
            collapse(){
                this.openedKeys = []
            }
        }
    }
</script>
