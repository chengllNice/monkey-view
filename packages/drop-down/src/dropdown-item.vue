<template>
    <div :class="[
            `${classPrefix}`,
            disabled && 'is-disabled',
            divided && `${classPrefix}--divided`,
         ]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import { findComponents } from 'main/utils/tool';

    export default {
        name: 'DropdownItem',
        props: {
            name: String,
            disabled: Boolean,
            divided: Boolean// 显示分割线
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-dropdown-item',
                dropDown: findComponents(this, 'Dropdown')
            }
        },
        methods: {
            handleClick() {
                if (this.disabled) return;
                if (this.dropDown && this.dropDown.length) {
                    this.dropDown.forEach(item => {
                        item.itemClick && item.itemClick(this.name);
                    })
                }
            }
        }
    }
</script>
