<template>
    <div :class="[
             `${classPrefix}`,
             size && `${classPrefix}--size`,
             {
                'is-disabled': disabled
             }
         ]"
         v-click-outside.capture="hanlderClose">
        <div :class="[`${classPrefix}__reference`]" ref="reference">
            <SelectEl :name="name"
                      :values="currentSelectedOption"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :size="size"
                      :visible="visible"
                      :multiple="multiple"
                      :filterable="filterable"
                      :clearable="clearable"
                      :dropDown="this.$refs.dropDown"
                      @click.stop="handlerSelectElClick"
                      @input-change="handlerSelectElChange"
                      @input-clear="handlerSelectElClear"
                      @tag-close="handlerSelectElTagClose"
                      @input-blur="isFocused = false"
                      @input-focus="isFocused = true"></SelectEl>
        </div>
        <transition :name="transition">
            <DropDown v-show="visible && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :render-html="renderHtml"
                      :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
                      v-model="visible">
                <div :class="[`${classPrefix}__drop-down-inner`, `${classPrefix}__${componentId}`]"
                     :style="{'height': dropDownHeight}">
                    <scroll size="small" :scrollOption="{scrollPanel:{scrollingX:false}}">
                        <div ref="optionList" :class="[`${classPrefix}__loading`]" v-if="loading">
                            <Icon type="icon-loading" :class="[`${prefix}-rotate`]"></Icon>{{t('cl.select.loading')}}
                        </div>

                        <div ref="optionList"
                             v-else-if="selectOptionsData&&selectOptionsData.length&&isOptionGroup&&!isSlotOption"
                             :class="[`${classPrefix}__option-list`]">
                            <OptionGroup v-for="item in selectOptionsData"
                                         ref="optionEl"
                                         :key="item.value"
                                         :noClick="item.noClick"
                                         :disabled="item.disabled"
                                         :value="item.value"
                                         :label="item.label">
                                <Option :class="[`${classPrefix}__group-option`]"
                                        v-for="optionItem in item.option"
                                        :key="optionItem.value"
                                        :value="optionItem.value"
                                        :label="optionItem.label"
                                        :disabled="optionItem.disabled"></Option>
                            </OptionGroup>
                        </div>

                        <div ref="optionList"
                             v-else-if="selectOptionsData&&selectOptionsData.length&&!isOptionGroup&&!isSlotOption"
                             :class="[`${classPrefix}__option-list`]">
                            <Option v-for="item in selectOptionsData"
                                    ref="optionEl"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                                    :disabled="item.disabled"></Option>
                        </div>

                        <div ref="optionList" :class="[`${classPrefix}__option-list`]" v-else-if="isSlotOption">
                            <slot></slot>
                        </div>

                        <div v-if="!loading && isEmpty"
                             ref="optionList"
                             :class="[`${classPrefix}__empty`]">
                            {{localEmptyText}}
                        </div>
                    </scroll>
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {directive as clickOutside} from 'v-click-outside-x';
    import SelectEl from './select-el.vue'
    import Scroll from 'packages/scroll'
    import Option from './option.vue'
    import OptionGroup from './option-group.vue'
    import DropDown from './drop-down.vue'
    import Locale from 'main/mixins/locale'
    import Icon from 'packages/icon'

    export default {
        name: "Select",
        directives: {clickOutside},
        mixins: [Locale],
        provide() {
            return {
                'select': this
            };
        },
        props: {
            value: [String, Number, Array],
            name: String,
            placeholder: String,
            disabled: Boolean,
            size: String,
            option: Array,
            transition: {
                type: String,
                default: 'slideUp'
            },
            multiple: Boolean,
            clearable: Boolean,
            emptyText: String,
            filterable: Boolean,//开启搜索
            remote: Boolean,//开启远程搜索
            loading: Boolean,//正在远程搜索
            maxHeight: {
                type: [String, Number],
                default: '200px'
            },
            placement: {
                type: String,
                default: 'bottom-start'
            },
            valueLable: Boolean,
            dropdownMatchSelectWidth: {
                type: Boolean,
                default: true
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: true,
            }
        },
        data() {
            return {
                prefix: Config.classPrefix,
                classPrefix: Config.classPrefix + '-select',
                componentName: 'Select',
                componentId: Math.floor(Math.random() * 10000) + '-' + new Date().getTime(),
                cValue: null,
                visible: false,
                selectElLabel: '',
                isFocused: false,
                filterChangeFlag: false,
                slotOptions: this.$slots.default,
                currentSelectedOption: [],
                isSearching: false,//开启搜索时判断是否正在搜索
                dropDownHeight: '',
                isEmpty: true,
                firstTrigger: true,
            }
        },
        computed: {
            selectOptionsData() {
                return this.option || [];
            },
            isSlotOption() {
                return !this.option
            },
            isOptionGroup() {
                let isGroupOption = this.option && this.option.filter(item => {
                    return !!item.option
                });
                return isGroupOption && isGroupOption.length ? true : false;
            },
            localEmptyText() {
                if (this.emptyText) return this.emptyText;
                return this.t('cl.select.emptyData');
            },
        },
        components: {
            SelectEl,
            Scroll,
            Option,
            DropDown,
            OptionGroup,
            Icon
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.getIsEmpty();
                this.initialCValue();
                this.getInitialValue();
                this.setDropDownHeight();
            })
        },
        methods: {
            initialCValue() {
                if (this.multiple) {
                    this.cValue = Array.isArray(this.value) ? this.value : [];
                } else {
                    this.cValue = this.value;
                }
            },
            getInitialValue() {
                if (this.isSlotOption) return;
                if (this.cValue === null) return;
                let initialValue = Array.isArray(this.cValue) ? this.cValue : [this.cValue];
                let currentSelectedOption = [];
                if (this.isOptionGroup) {
                    this.selectOptionsData.map(item => {
                        let filterValues = item.option.filter(optionItem => {
                            return initialValue.includes(optionItem.value);
                        });
                        currentSelectedOption.push(...filterValues)
                    })
                } else {
                    currentSelectedOption = this.selectOptionsData.filter(item => {
                        return initialValue.includes(item.value);
                    });
                }
                if (!this.multiple) {
                    this.currentSelectedOption = currentSelectedOption && currentSelectedOption.length ? [currentSelectedOption[0]] : [];
                    this.visible = this.visible || false;
                }
            },
            handlerSelectElClick() {
                if (this.filterable) {
                    if (this.isFocused) this.visible = true;
                    else this.visible = !this.visible;
                    this.filterChangeFlag = false;
                    return
                }
                this.visible = !this.visible;
            },
            handlerSelectElChange(value) {
                this.filterChangeFlag = true;
                this.visible = true;
                this.selectElLabel = value;
                if (this.filterable && !this.remote) {
                    if (this.multiple) {
                        console.log('multiple')
                    } else {
                        if (this.currentSelectedOption && this.currentSelectedOption.length && this.currentSelectedOption[0].label === value) return
                    }
                    this.isSearching = true;
                    setTimeout(() => {
                        this.$nextTick(this.setDropDownHeight());
                    })
                }
                if (this.remote) {
                    this.$emit('remote-change', value)
                }
            },
            handlerSelectElClear() {
                this.currentSelectedOption = [];
                this.cValue = this.multiple ? [] : '';
                if (this.filterable) this.isSearching = false;
                if (this.filterable && this.remote) {
                    this.$emit('remote-change', this.cValue);
                }
                this.$emit('clear', this.cValue);
            },
            handlerSelectElTagClose(data) {
                let index = this.cValue.indexOf(data.value);
                if (index > -1) {
                    this.cValue.splice(index, 1);
                    this.currentSelectedOption.splice(index, 1);
                }
            },
            hanlderClose(event) {
                if (this.visible && this.multiple) {
                    if (this.renderHtml !== false) {
                        const {$el} = this.$refs.dropDown;
                        if ($el !== event.target && !$el.contains(event.target)) {
                            this.visible = false;
                        }
                    }
                } else {
                    this.visible = false;
                }
                if (this.filterable) {
                    this.selectElLabelToCurrentValues();
                }
            },
            handlerSelected(option) {
                let type = option.type;
                delete option.type;
                if (this.multiple) {
                    if (type) {
                        let index = this.currentSelectedOption.findIndex(item => {
                            return item.value === option.value;
                        });
                        index <= -1 && this.currentSelectedOption.push(option);
                    } else {
                        let index = this.cValue.indexOf(option.value);
                        if (index > -1) {
                            this.currentSelectedOption.splice(index, 1);
                            this.cValue.splice(index, 1);
                        } else {
                            this.currentSelectedOption.push(option);
                            this.cValue.push(option.value);
                        }
                    }
                } else {
                    this.currentSelectedOption = [option];
                    this.cValue = option.value;
                    !type && (this.visible = false);
                    !type && (this.isSearching = false);
                }
            },
            selectElLabelToCurrentValues() {
                if (this.multiple) {
                    console.log('--')
                } else {
                    if (this.currentSelectedOption[0] && this.currentSelectedOption[0].label !== this.selectElLabel) {
                        this.selectElLabel = this.currentSelectedOption[0].label;
                    }
                }
            },
            setDropDownHeight() {
                let selectEl = document.getElementsByClassName(`${this.classPrefix}__${this.componentId}`)[0];
                let optionListEl = selectEl.getElementsByClassName(`${this.classPrefix}__option-list`)[0];
                if (this.loading) optionListEl = selectEl.getElementsByClassName(`${this.classPrefix}__loading`)[0];
                if (!this.loading && this.isEmpty) optionListEl = selectEl.getElementsByClassName(`${this.classPrefix}__empty`)[0];
                let Listheight = optionListEl && optionListEl.offsetHeight;
                let maxHeight = parseFloat(this.maxHeight);
                let height = Listheight < maxHeight ? Listheight : maxHeight;
                // console.log(optionListEl, Listheight);
                this.dropDownHeight = height + 2 + 'px';
            },
            getIsEmpty() {
                let result;
                if (this.isSlotOption) {
                    if (this.$slots.default) {
                        let optionShowArr = [];
                        for (let option of this.$slots.default) {
                            let cOption = option.componentInstance;
                            let tag = cOption && (cOption.componentName || option.componentOptions.tag);
                            // todo
                            if (cOption && (tag === 'Option' || tag === 'OptionGroup')) {
                                optionShowArr.push(cOption.isShow);
                            }
                        }
                        result = !optionShowArr.includes(true)
                    } else {
                        result = true
                    }
                } else {
                    if (this.$refs.optionEl) {
                        let optionShowArr = [];
                        for (let option of this.$refs.optionEl) {
                            // todo
                            if (option.componentName === 'Option' || option.componentName === 'OptionGroup') {
                                optionShowArr.push(option.isShow);
                            }
                        }
                        result = !optionShowArr.includes(true)
                    } else {
                        result = true
                    }
                }
                this.isEmpty = result;
            },
            async asyncGetCurrentSelectedOption() {
                return new Promise((resolve) => {
                    if (!this.firstTrigger) resolve(this.currentSelectedOption);
                    if (this.currentSelectedOption.length) {
                        this.firstTrigger = false;
                        resolve(this.currentSelectedOption);
                    }
                    let currentSelectedOption = [];
                    let t = setInterval(() => {
                        currentSelectedOption = JSON.parse(JSON.stringify(this.currentSelectedOption));
                        if (currentSelectedOption.length) {
                            clearInterval(t);
                            this.firstTrigger = false;
                            resolve(currentSelectedOption);
                        }
                    }, 500);
                });
            }
        },
        updated() {
            this.getIsEmpty();
            this.$nextTick(this.setDropDownHeight());
        },
        watch: {
            value: function () {
                this.initialCValue();
            },
            cValue: function (newVal, oldVal) {
                this.getInitialValue();
                this.$emit('input', newVal);
                this.firstTrigger = false;
                if (oldVal === null) return;
                if (this.valueLable) {
                    let returnValue = [];
                    this.asyncGetCurrentSelectedOption().then(currentSelectedOption => {
                        if (this.multiple) {
                            currentSelectedOption.forEach(item => {
                                returnValue.push({
                                    value: item.value, label: item.label
                                });
                            });
                        } else {
                            returnValue = {
                                value: currentSelectedOption[0].value,
                                label: currentSelectedOption[0].label,
                            }
                        }
                        this.$emit('change', returnValue);
                    })
                } else {
                    this.$emit('change', newVal);
                }
            },
            selectOptionsData: {
                handler() {
                    this.getInitialValue();
                },
                deep: true
            }
        }
    }
</script>
