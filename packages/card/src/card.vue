<template>
    <div :class="[
                `${classPrefix}`,
                noHover && `${classPrefix}--noHover`,
                noBorder && `${classPrefix}--noBorder`
            ]">
        <div :class="[`${classPrefix}__header`]" v-if="showHeader">
            <slot name="header">
                <div :class="[`${classPrefix}__header-title`]" :title="title">{{title}}</div>
                <div :class="[`${classPrefix}__header-extra`]">
                    <slot name="extra"></slot>
                </div>
            </slot>
        </div>
        <div :class="[`${classPrefix}__body`]" :style="bodyStyle">
            <slot></slot>
        </div>
        <div :class="[`${classPrefix}__footer`]" v-if="showFooter">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Card",
        props: {
            title: String,
            noBorder: Boolean,
            noHover: Boolean,
            bodyPadding: [String, Number]
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-card',
            }
        },
        computed: {
            showHeader() {
                return this.title || this.$slots.header
            },
            showFooter() {
                return this.$slots.footer
            },
            bodyStyle() {
                return {'padding': parseFloat(this.bodyPadding) + 'px'}
            }
        },
    }
</script>
