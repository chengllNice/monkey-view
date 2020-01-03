<template>
    <div :class="[
            'cl-dropdown-item',
            disabled && 'is-disabled',
            divided && 'cl-dropdown-item--divided',
         ]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import {findComponent} from "../../../utils/tool";

    export default {
        name: "ClDropdownItem",
        props: {
            disabled: Boolean,
            divided: Boolean,//显示分割线
        },
        data(){
            return {
                dropDown: findComponent(this, 'ClDropdown')
            }
        },
        mounted(){

        },
        methods: {
            handleClick(){
                if(this.disabled) return;
                this.dropDown && this.dropDown.changeDropDown();
            }
        }
    }
</script>