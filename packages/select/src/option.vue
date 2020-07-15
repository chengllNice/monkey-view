<template>
    <div v-if="selectRoot"
         v-show="show"
         :class="optionClass"
         @click.stop="handleClick"
         @mouseenter="handleMouseenter"
         @mouseleave="handleMouseleave"
         @mousedown.prevent>
        <span :class="[`${classPrefix}__text`]">
            <slot>{{label}}</slot>
        </span>
        <Icon v-if="multipleIconShow" type="check" :class="[`${classPrefix}__icon`]"></Icon>
        <Icon v-else-if="allowCreate" type="check" :class="[`${classPrefix}__icon`]"></Icon>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "Option",
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: String,
            disabled: {
                type: Boolean,
                default: false,
            },
            allowCreate: Boolean,//新建条目
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-option',
                componentName: 'Option',
                selectRoot: findComponent(this, 'Select'),
                optionGroupRoot: findComponent(this, 'OptionGroup'),
            }
        },
        computed: {
            optionClass() {
                let result = [
                    `${this.classPrefix}`,
                    this.localDisabled && `is-disabled`,
                ];
                if (this.selectRoot) {
                    result = [
                        ...result,
                        this.selectRoot.multiple && `${this.classPrefix}__multiple`,
                        this.selectRoot.currentValue.includes(this.value) && `is-selected`,
                        (this.selectRoot.hoverItemValue === this.value || this.selectRoot.keySelectValue === this.value) && `is-hover`,
                        this.selectRoot.keySelectValue === this.value && `${this.classPrefix}__focus`,
                    ]
                }
                return result;
            },
            show(){
                if(!this.selectRoot.isFilter) return true;
                if(this.allowCreate && this.selectRoot.allowCreate) return true;
                return this.selectRoot.filterableValue.includes(this.value)
            },
            multipleIconShow(){
                if(!this.selectRoot || !this.selectRoot.multiple) return false;
                return this.selectRoot.multiple && this.selectRoot.currentValue.includes(this.value)
            },
            localDisabled(){
                if(this.selectRoot.openMultipleLimitDisabled){
                    return !this.selectRoot.currentValue.includes(this.value);
                }
                return this.disabled;
            }
        },
        components: {
            Icon
        },
        created() {
        },
        mounted() {
            this.$nextTick(this.optionGroupRoot && this.optionGroupRoot.setShow());
            this.$nextTick(this.selectRoot.initOption());
        },
        updated() {
            this.$nextTick(this.optionGroupRoot && this.optionGroupRoot.setShow());
        },
        destroyed() {
            //slot模式下远程搜索需要重新计算
            if(this.selectRoot.renderType === 'slot'){
                this.$nextTick(this.optionGroupRoot && this.optionGroupRoot.setShow());
                this.$nextTick(this.selectRoot.initOption());
            }
        },
        methods: {
            handleClick() {
                if (this.localDisabled) return false;
                if(this.allowCreate) {
                    this.selectRoot && this.selectRoot.handleConfirmAllowCreate();
                }else {
                    this.selectRoot && this.selectRoot.handleOptionClick(this.value);
                }
            },
            handleMouseenter(){
                if (this.localDisabled) return false;
                this.selectRoot && this.selectRoot.handleOptionHover(this.value, true);
            },
            handleMouseleave(){
                if (this.localDisabled) return false;
                this.selectRoot && this.selectRoot.handleOptionHover(this.value, false);
            }
        },
        watch: {

        }
    }
</script>
