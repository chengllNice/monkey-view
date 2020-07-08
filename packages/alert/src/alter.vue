<template>
    <transition :name="transition">
        <div v-if="!closed"
             :class="[
                 `${classPrefix}`,
                 type && `${classPrefix}--${type}`,
                 isDescription && `${classPrefix}--with-des`,
                 showIcon && `${classPrefix}--with-icon`,
                 theme && `${classPrefix}--${theme}`
             ]">
            <span :class="[`${classPrefix}__icon`]" v-if="showIcon">
                <slot name="icon">
                    <Icon :type="iconType"></Icon>
                </slot>
            </span>
            <span :class="[`${classPrefix}__message`]"><slot></slot></span>
            <span :class="[`${classPrefix}__description`]"><slot name="description"></slot></span>
            <span :class="[`${classPrefix}__close`]" v-if="closable" @click="handlerClose">
                <slot name="close">
                    <Icon type="icon-close"></Icon>
                </slot>
            </span>
        </div>
    </transition>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: "Alter",
        props: {
            type: {
                type: String,
                default: 'info',
                validator(value) {
                    return ['success', 'info', 'warning', 'error'].includes(value);
                },
            },
            transition: {
                type: String,
                default: 'AlterFade'
            },
            showIcon: Boolean,
            closable: Boolean,
            theme: {
                type: String,
                default: 'light',
                validator(value) {
                    return ['light', 'dark'].includes(value)
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-alter',
                closed: false,
            }
        },
        computed: {
            isDescription() {
                return this.$slots.description
            },
            iconType() {
                let icon = '';
                switch (this.type) {
                    case 'success':
                        icon = this.isDescription ? 'icon-success' : 'icon-success-fill';
                        break;
                    case 'error':
                        icon = this.isDescription ? 'icon-error' : 'icon-error-fill';
                        break;
                    case 'warning':
                        icon = this.isDescription ? 'icon-warning' : 'icon-warning-fill';
                        break;
                    default:
                        icon = this.isDescription ? 'icon-info' : 'icon-info-fill';
                        break;
                }
                return icon
            }
        },
        components: {
            Icon
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handlerClose() {
                this.closed = true;
                this.$emit('close')
            }
        }
    }
</script>
