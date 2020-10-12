<template>
    <div :class="[`${classPrefix}`]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Breadcrumb",
        props: {
            separator: {
                type: [String],
                default: '/'
            }
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-breadcrumb',
            }
        }
    }
</script>
