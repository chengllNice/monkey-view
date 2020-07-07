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
    import {findComponent} from "main/utils/tool";

    export default {
        name: "DropdownItem",
        props: {
            name: String,
            disabled: Boolean,
            divided: Boolean,//显示分割线
        },
        data(){
            return {
                dropDown: findComponent(this, 'Dropdown')
            }
        },
        mounted(){

        },
        methods: {
            handleClick(){
                if(this.disabled) return;
                this.dropDown && this.dropDown.itemClick(this.name);
            }
        }
    }
</script>
