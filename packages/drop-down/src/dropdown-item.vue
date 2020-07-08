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
                classPrefix: Config.classPrefix + '-dropdown-item',
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
