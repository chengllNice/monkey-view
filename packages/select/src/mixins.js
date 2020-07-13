export default {
    data() {
        return {
            currentOption: [],
            currentReduceOption: [],//展开的option，不包含optionGroup
            currentValue: [],//被选中的option的value数组，单选时只有一项，多选时有多项
            currentSelectedItems: [],
            visible: false,
            hoverItemValue: '',//被hover的option的value值
            isFilter: false,//是否搜索 不是远程搜索
            filterableValue: [],//搜索到的value数组
            renderType: this.option ? 'option' : 'slot',//渲染类型，option为数据渲染，slot为插槽渲染

            scrollInnerHeight: 0,

            isFocused: false,
        }
    },
    methods: {
        initValue() {
            if (this.multiple && Array.isArray(this.value)) {
                this.currentValue = JSON.parse(JSON.stringify(this.value)) || [];
            } else if (typeof this.value === 'string' || typeof this.value === 'number') {
                this.currentValue = this.value.toString() ? [this.value] : [];
            }
            this.setCurrentSelectedItems();
        },
        initOption() {
            if (this.renderType === 'option') {
                this.currentOption = this.option || [];
            } else if (this.renderType === 'slot') {
                this.currentOption = this.formatSlotOption();
            }
            this.reduceOption();
            this.initValue();
            this.$nextTick(this.setScrollInnerHeight());
        },
        reduceOption() {
            let deepData = JSON.parse(JSON.stringify(this.currentOption));

            let currentReduceOption = [];

            deepData.forEach(item => {
                if (item.option && Array.isArray(item.option)) {
                    item.option.forEach(oItem => {
                        currentReduceOption.push(oItem)
                    })
                }else {
                    currentReduceOption.push(item)
                }
            });

            this.currentReduceOption = currentReduceOption;
        },
        //格式化slotoption数据
        formatSlotOption(vNodes) {
            let slotOption = vNodes || this.$slots.default;
            let currentOption = [];
            if (slotOption) {
                for (let option of slotOption) {
                    let Instance = option.componentInstance;
                    let Options = option.componentOptions;
                    let tag = (Instance && Instance.componentName) || (Options && Options.tag);
                    if (tag === 'OptionGroup') {
                        let optionGorup = {};
                        let label = Options.propsData.label;
                        optionGorup.label = label;
                        optionGorup.option = [];
                        optionGorup.option = this.formatSlotOption(Options.children);
                        currentOption.push(optionGorup);
                    } else if (tag === 'Option') {
                        let label = Options.propsData.label;
                        if (!label) {
                            Options.children.forEach(item => {
                                if (item.text && !label) label = item.text.trim();
                            })
                        }
                        currentOption.push({
                            value: Options.propsData.value,
                            label: label || Options.propsData.value,
                            disabled: Options.propsData.disabled || false
                        })
                    }
                }
            }

            return currentOption;
        },
        //option 点击
        handleOptionClick(value) {
            let deepValue = JSON.parse(JSON.stringify(this.currentValue));

            //多选时是否要删除改项
            let isRemove = false;

            if (this.multiple) {
                if (deepValue.includes(value)) {
                    let index = deepValue.findIndex(item => {
                        return item === value
                    })
                    deepValue.splice(index, 1);
                    isRemove = true;
                } else {
                    deepValue.push(value);
                }
            } else {
                deepValue = [value];
            }

            if (JSON.stringify(deepValue) !== JSON.stringify(this.currentValue)) {
                this.currentValue = deepValue;
                this.setCurrentSelectedItems(value, isRemove);
                this.updateDropdownPosition();

                this.emitInputAndChange();
            } else {
                if (this.multiple && this.filterable && !this.remote) {
                    this.isFilter = false;
                } else {
                    this.setDropDownVisible(false);
                }
            }
        },
        handleOptionNavigate(num = 0) {
            let nextIndex = 0;
            if (this.currentValue.length) {
                let lastValue = this.currentValue[0];
                let currentIndex = this.currentReduceOption.findIndex(item => item.value === lastValue);

                nextIndex = currentIndex + num;

                if(nextIndex > this.currentReduceOption.length - 1) nextIndex = 0;
                if(nextIndex < 0) nextIndex = this.currentReduceOption.length - 1;
            }
            console.log(nextIndex,'nextIndex')
            if(nextIndex > -1 && this.currentReduceOption[nextIndex]){
                let value = this.currentReduceOption[nextIndex].value;
                if(value) this.hoverItemValue = value;
            }
        },
        //设置当前选中项数据
        setCurrentSelectedItems(value, isRemove) {
            if (isRemove) {
                let index = this.currentSelectedItems.findIndex(item => item.value === value)
                if (index > -1) {
                    this.currentSelectedItems.splice(index, 1);
                }
            } else {
                this.currentOption.forEach(item => {
                    if (item.option && Array.isArray(item.option)) {
                        item.option.forEach(oItem => {
                            let index = this.currentValue.indexOf(oItem.value);
                            if (index > -1) {
                                this.currentSelectedItems[index] = {
                                    value: oItem.value,
                                    label: oItem.label,
                                };
                            }
                        })
                    } else {
                        let index = this.currentValue.indexOf(item.value);
                        if (index > -1) {
                            this.currentSelectedItems[index] = {
                                value: item.value,
                                label: item.label,
                            };
                        }
                    }
                });
            }
        },
        //option hover变化
        handleOptionHover(value, hover) {
            this.hoverItemValue = hover ? value : '';
        },
        //设置visible
        setDropDownVisible(visible = null) {
            if (visible === null) {
                this.visible = !this.visible;
            } else {
                this.visible = visible;
            }
            if (this.visible) {
                this.isFilter = false;
                this.$nextTick(this.setScrollInnerHeight());
            }
        },
        //搜索filterable
        handleFilterable(value) {
            let filterableValue = [];
            if (value) {
                this.isFilter = true;
                this.currentOption.forEach(item => {
                    if (item.option && Array.isArray(item.option)) {
                        item.option.forEach(oItem => {
                            if (oItem.label.includes(value)) filterableValue.push(oItem.value)
                        })
                    } else {
                        if (item.label.includes(value)) filterableValue.push(item.value)
                    }
                })
            } else {
                this.isFilter = false;
            }
            this.filterableValue = filterableValue;
        },
        //更新dropdown的位置
        updateDropdownPosition() {
            this.visible && this.$refs.dropDown && this.$refs.dropDown.updatePopper();
        },
        //clearable清空
        handleClearable() {
            this.currentValue = [];
            this.currentSelectedItems = [];
            this.hoverItemValue = '';
            this.filterableValue = [];
            this.isFilter = false;
            this.updateDropdownPosition();
            this.$emit('clear');
            this.emitInputAndChange();
            if (this.remote && this.filterable) this.emitRemoteChange();
        },
        emitRemoteChange(value) {
            this.$emit('remote-change', value || '');
        },
        emitInputAndChange() {
            if (this.multiple) {
                if (this.filterable) {
                    this.isFilter = false;
                }

                this.$emit('input', this.currentValue);
                this.$emit('change', this.valueLable ? this.currentSelectedItems : this.currentValue);
            } else {
                this.$emit('input', this.currentValue[0]);
                this.$emit('change', this.valueLable ? this.currentSelectedItems[0] : this.currentValue[0]);

                this.setDropDownVisible(false);
            }
        },
        //多选tag关闭触发
        handleTagClose(value) {
            let index = this.currentValue.findIndex(item => item === value);
            if (index > -1) {
                this.currentValue.splice(index, 1);
                this.currentSelectedItems.splice(index, 1);
                this.emitInputAndChange();
            }
        },
        //设置dropInner的高度
        setScrollInnerHeight() {
            setTimeout(() => {
                let scrollInner = this.$refs.scrollInner;
                let scrollOuter = this.$refs.scrollOuter;
                let maxHeight = parseFloat(this.maxHeight);

                let targetPaddingTop = 5;
                let targetPaddingBottom = 5;
                if (scrollOuter && window.getComputedStyle) {
                    targetPaddingTop = window.getComputedStyle(scrollOuter, null)['paddingTop'];
                    targetPaddingBottom = window.getComputedStyle(scrollOuter, null)['paddingBottom'];
                }
                if (scrollInner) {
                    let scrollInnerHeight = scrollInner.offsetHeight;
                    if (scrollInnerHeight > maxHeight) {
                        scrollInnerHeight = maxHeight
                    }
                    this.scrollInnerHeight = scrollInnerHeight + parseFloat(targetPaddingTop) + parseFloat(targetPaddingBottom) + 2;
                }
            })
        },
        //outside点击
        hanldeOutsideClick(event) {
            if (this.visible) {
                if (this.renderHtml !== false) {
                    const {$el} = this.$refs.dropDown;
                    if ($el === event.target || $el.contains(event.target)) {
                        return;
                    }
                }
            }

            this.setDropDownVisible(false);
        },
        handleKeydown(event) {
            const key = event.key || event.code;
            if (key === 'Backspace') {
                return; // so we don't call preventDefault
            }
            if (this.visible) {
                event.preventDefault();
                if (key === 'Tab') {
                    event.stopPropagation();
                }
                // Esc slide-up
                if (key === 'Escape') {
                    event.stopPropagation();
                    // this.hideMenu();
                }
                // next
                if (key === 'ArrowUp') {
                    this.handleOptionNavigate(-1);
                }
                // prev
                if (key === 'ArrowDown') {
                    this.handleOptionNavigate(1);
                }
                // enter
                // if ( key === 'Enter') {
                //     if (this.focusIndex === -1) return this.hideMenu();
                //     const optionComponent = this.flatOptions[this.focusIndex];
                //     // fix a script error when searching
                //     if (optionComponent) {
                //         const option = this.getOptionData(optionComponent.componentOptions.propsData.value);
                //         this.onOptionClick(option);
                //     } else {
                //         this.hideMenu();
                //     }
                // }
            } else {
                // const keysThatCanOpenSelect = ['ArrowUp', 'ArrowDown'];
                // if (keysThatCanOpenSelect.includes(e.key)) this.toggleMenu(null, true);
            }
        }
    },
    watch: {
        option: {
            handler() {
                this.initOption();
            },
            deep: true,
            immediate: true
        },
        value() {
            this.initValue();
        }
    }
}