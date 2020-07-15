<template>
    <div :class="[
        `${classPrefix}`,
        opened && `${classPrefix}--opened`,
        disabled && 'is-disabled'
    ]">
        <div :class="[`${classPrefix}__header`]" @click="handlerClick">
            <Icon v-if="!hideArrow" type="right" :class="[`${classPrefix}__header-icon`]"></Icon>
            <div :class="[`${classPrefix}__header-name`]">
                <slot name="title">
                    {{name}}
                </slot>
            </div>
            <slot name="extra"></slot>
        </div>
        <SlideTransition>
            <div v-show="opened" :class="[`${classPrefix}__content`]">
                <div :class="[`${classPrefix}__content-inner`]">
                    <slot></slot>
                </div>
            </div>
        </SlideTransition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Emitter from 'main/mixins/emitter'
    import {findComponent} from "main/utils/tool";
    import SlideTransition from '../../base/slide-transition.vue'
    import Icon from 'packages/icon'

    export default {
        name: "CollapseItem",
        mixins: [Emitter],
        props: {
            cKey: {
                type: String,
                required: true
            },
            name: String,
            disabled: Boolean,
            hideArrow: Boolean,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-collapse-item',
                componentName: 'CollapseItem',
                opened: false,
                collapseComponent: findComponent(this, 'Collapse')
            }
        },
        computed: {},
        components: {
            SlideTransition,
            Icon
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handlerClick() {
                if (this.disabled) return;
                this.opened = !this.opened;
                this.parentEmit('Collapse', 'on-update-opened-key', this.cKey)
            }
        },
        watch: {
            'collapseComponent.currentOpenedKey': {
                handler(newVal) {
                    if (this.disabled) return;
                    if (!newVal) {
                        this.opened = false;
                        return;
                    }
                    this.opened = newVal.includes(this.cKey);
                },
                deep: true
            }
        }
    }
</script>
