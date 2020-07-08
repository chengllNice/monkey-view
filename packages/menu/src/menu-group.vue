<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__title`]" :style="groupStyle">
            <slot name="title">{{name}}</slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent, findComponents} from 'main/utils/tool'

    export default {
        name: "MenuGroup",
        props: {
            name: String,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-menu-group',
                componentName: 'MenuGroup',
                defaultPadding: 20,
                smallPadding: 10,
                largePadding: 30,
                menuComponent: findComponent(this, 'Menu'),
                parentSubMenuComponentNum: findComponents(this, 'Submenu').length,//父级元素有多少个subMenu组件
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
