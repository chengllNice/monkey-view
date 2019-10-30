<template>
    <div :class="[
        'cl-list-item',
        parentListComponent.size && `cl-list-item--${parentListComponent.size}`,
        currentType === 'meta' && `cl-list-item--meta`,
    ]">
        <slot v-if="currentType === 'default'"></slot>
        <template v-if="currentType === 'meta'">
            <div class="cl-list-item__avatar">
                <slot name="avatar"><img :src="avatar" alt=""></slot>
            </div>
            <div class="cl-list-item__content">
                <div class="cl-list-item__title"><slot name="title">{{title}}</slot></div>
                <div class="cl-list-item__description"><slot name="description">{{description}}</slot></div>
                <slot></slot>
            </div>
            <div class="cl-list-item__extra">
                <slot name="extra"></slot>
            </div>
        </template>
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
                default: 'default',
                validator(value){
                    return ['meta', 'default'].includes(value)
                }
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
                return this.parentListComponent.type === 'meta' ? this.parentListComponent.type : this.type;
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
