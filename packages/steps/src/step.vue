<template>
    <div :class="stepClass">
        <div :class="[`${classPrefix}__tail`]">
            <div :class="[`${classPrefix}__tail-inner`]"></div>
        </div>
        <div :class="[
            `${classPrefix}__node`,
            hasIcon && `${classPrefix}__node-icon`,
        ]">
            <div :class="[`${classPrefix}__node-inner`]">
                <template v-if="!hasIcon">
                    <template v-if="isFinish"><Icon type="check" /></template>
                    <template v-else>{{index + 1}}</template>
                </template>
                <template v-else>
                    <slot name="icon"><Icon :type="icon"></Icon></slot>
                </template>
            </div>
        </div>
        <div :class="[`${classPrefix}__main`]">
            <div :class="[`${classPrefix}__title`]">
                <slot name="title">{{title}}</slot>
            </div>
            <div :class="[`${classPrefix}__description`]" v-if="$slots.description || description">
                <slot name="description">{{description}}</slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Step",
        props: {
            title: String,
            description: String,
            icon: String,
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-step',
                index: null,// 该值由父级赋值
                stepsParent: this.$parent,
            }
        },
        computed: {
            stepClass(){
                return [
                    `${this.classPrefix}`,
                    `${this.classPrefix}--${this.stepsParent.size}`,
                    `${this.classPrefix}--${this.stepsParent.direction}`,
                    this.isFinish && `${this.classPrefix}--finish`,
                    this.isActive && `${this.classPrefix}--active`,
                ]
            },
            isFinish(){
                return this.index < this.stepsParent.active;
            },
            isActive(){
                return this.index === this.stepsParent.active;
            },
            hasIcon(){
                return this.$slots.icon || this.icon
            }
        },
        methods: {

        }
    }
</script>
