<template>
    <div :class="[
        'cl-list-item',
        parentListComponent.size && `cl-list-item--${parentListComponent.size}`,
        parentListComponent.split && `cl-list-item--split`,
        parentListComponent.hover && `cl-list-item--hover`,
        currentType === 'meta' && `cl-list-item--meta`,
    ]">
        <template v-if="currentType === 'meta'">
            <div class="cl-list-item__avatar" v-if="avatar || $slots.avatar">
                <slot name="avatar"><img :src="avatar" alt=""></slot>
            </div>
            <div class="cl-list-item__content">
                <div class="cl-list-item__title" v-if="title || $slots.title"><slot name="title">{{title}}</slot></div>
                <div class="cl-list-item__description" v-if="description || $slots.description"><slot name="description">{{description}}</slot></div>
                <slot></slot>
            </div>
            <div class="cl-list-item__extra" v-if="$slots.extra">
                <slot name="extra"></slot>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script>
    import {findComponent} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'
    export default {
        name: "ClListItem",
        mixins: [Emitter],
        props: {
            type: {
                type: String,
                default: '',//可选值meta default
            },
            title: String,
            description: String,
            avatar: String,
        },
        data() {
            return {
                componentName: 'ClListItem',
                parentListComponent: findComponent(this, 'ClList'),
            }
        },
        computed: {
            currentType(){
                return this.type ? this.type : this.parentListComponent.type;
            }
        },
        components: {

        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>
