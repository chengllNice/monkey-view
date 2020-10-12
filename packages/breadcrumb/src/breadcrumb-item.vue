<template>
    <span :class="breadcrumbItemClass">
        <span :class="[`${classPrefix}__title`]">
            <template v-if="to">
                <router-link :to="to" :replace="replace" :append="append">
                    <slot></slot>
                </router-link>
            </template>
            <template v-else><slot></slot></template>
        </span>
        <span :class="[`${classPrefix}__separator`]">{{breadcrumbParent.separator}}</span>
    </span>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "BreadcrumbItem",
        props: {
            to: {
                type: [String, Object]
            },
            replace: Boolean,
            append: Boolean,
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-breadcrumb-item',
                breadcrumbParent: this.$parent,
            }
        },
        computed: {
            breadcrumbItemClass(){
                const classPrefix = this.classPrefix;
                const isTo = !!this.to;
                return [
                    `${classPrefix}`,
                    isTo && `${classPrefix}--link`,
                ]
            },
        }
    }
</script>
