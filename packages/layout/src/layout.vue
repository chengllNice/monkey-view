<template>
    <div :class="[
            `${classPrefix}`,
            hasSider && `${classPrefix}--has-sider`
        ]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: 'Layout',
        data() {
            return {
                classPrefix: Config.classPrefix + '-layout',
                hasSider: false
            }
        },
        mounted() {
            this.hasSider = this.findSider();
        },
        methods: {
            findSider() {
                return this.$children.some(item => {
                    return item.componentName === 'Sider'
                })
            }
        }
    }
</script>
