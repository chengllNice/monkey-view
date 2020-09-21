export default {
    data() {
        return {
            currentOption: [],
            currentOptionValue: [],//分解得到option的value数组，不包含disabled的项 作用：键盘操作选中时使用，无搜索时为全部的option，搜索时为搜索到的value数组
            currentAllOptionValue: [],//分解得到option的value数组，包含disabled的项
            currentValue: [],//被选中的option的value数组，单选时只有一项，多选时有多项
            currentSelectedItems: [],
            currentAllowCreateOption: [],//新建的条目，初始化时需要合并到currentOption中
            allowCreateOption: null,//allowCreate将要新建的条目，还没确认创建，确认创建之后会添加到currentOption数组
            visible: false,
            hoverItemValue: '',//被hover的option的value值
            keySelectValue: '',//预选的value,键盘操作时回车选中
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
                this.currentOption = (this.option || []).concat(this.currentAllowCreateOption);
            } else if (this.renderType === 'slot') {
                this.currentOption = this.formatSlotOption().concat(this.currentAllowCreateOption);
            }
            this.reduceOptionValue();
            this.initValue();
            this.$nextTick(this.setScrollInnerHeight());
        },
        //allowCreate将要新建的条目
        handleAllowCreate(value){
            this.keySelectValue = value;
            if(!value || this.currentAllOptionValue.includes(value)) {
                this.allowCreateOption = null;
                return;
            }
            this.allowCreateOption = {
                value: value,
                label: value,
            };
        },
        //allowCreate确认新建
        handleConfirmAllowCreate(){
            let deepData = JSON.parse(JSON.stringify(this.allowCreateOption));
            this.allowCreateOption = null;
            this.isFilter = false;
            this.currentOption.push(deepData);
            this.currentOptionValue.push(deepData.value);
            this.currentAllOptionValue.push(deepData.value);
            this.handleOptionClick(deepData.value);
            //数据改变需要在最后一步，因为需要在最后触发initOption 不能在之前触发
            this.currentAllowCreateOption.push(deepData);
        },
        reduceOptionValue() {
            if(this.isFilter) return;
            let deepData = JSON.parse(JSON.stringify(this.currentOption));

            let currentOptionValue = [];
            let currentAllOptionValue = [];

            deepData.forEach(item => {
                if (item.option && Array.isArray(item.option)) {
                    item.option.forEach(oItem => {
                        currentAllOptionValue.push(oItem.value)
                        !oItem.disabled && currentOptionValue.push(oItem.value)
                    })
                }else {
                    currentAllOptionValue.push(item.value)
                    !item.disabled && currentOptionValue.push(item.value)
                }
            });

            this.currentOptionValue = currentOptionValue;
            this.currentAllOptionValue = currentAllOptionValue;
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
            if(!value.toString()) return;
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

            this.keySelectValue = value;
            this.isFilter = false;
            this.allowCreateOption = null;

            if(this.multiple && this.multipleLimit > 0 && deepValue.length > this.multipleLimit){
                //多选限制
                return;
            }
            if (JSON.stringify(deepValue) !== JSON.stringify(this.currentValue)) {
                this.currentValue = deepValue;
                this.setCurrentSelectedItems(value, isRemove);
                this.updateDropdownPosition();

                this.emitInputAndChange();
            } else {
                if (this.multiple && this.filterable && !this.remote) {
                    this.isFilter = false;
                    this.reduceOptionValue();
                } else {
                    this.setDropDownVisible(false);
                }
            }
        },
        handleOptionNavigate(num = 0) {
            if(!this.currentOptionValue.length) return;
            let nextValue = this.currentOptionValue[0];
            if (this.keySelectValue) {
                let index = this.currentOptionValue.findIndex(item => item === this.keySelectValue);
                index = index + num;
                if(index > this.currentOptionValue.length - 1) index = 0;
                if(index < 0) index = this.currentOptionValue.length - 1;

                nextValue = this.currentOptionValue[index];
            }
            this.keySelectValue = nextValue;
        },
        //设置当前选中项数据
        setCurrentSelectedItems(value, isRemove) {
            if (isRemove) {
                let index = this.currentSelectedItems.findIndex(item => item.value === value)
                if (index > -1) {
                    this.currentSelectedItems.splice(index, 1);
                }
            } else {
                let deepData = JSON.parse(JSON.stringify(this.currentSelectedItems));
                this.currentOption.forEach(item => {
                    if (item.option && Array.isArray(item.option)) {
                        item.option.forEach(oItem => {
                            let index = this.currentValue.indexOf(oItem.value);
                            if (index > -1) {
                                deepData[index] = {
                                    value: oItem.value,
                                    label: oItem.label,
                                };
                            }
                        })
                    } else {
                        let index = this.currentValue.indexOf(item.value);
                        if (index > -1) {
                            deepData[index] = {
                                value: item.value,
                                label: item.label,
                            };
                        }
                    }
                });
                this.currentSelectedItems = deepData;
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
                this.isFilter = (this.allowCreate && this.filterable) ? this.isFilter : false;
                this.reduceOptionValue();
                this.$nextTick(this.setScrollInnerHeight());
            }
        },
        //搜索filterable
        handleFilterable(value) {
            let filterableValue = [];
            let currentOptionValue = [];
            if (value) {
                this.isFilter = true;
                this.currentOption.forEach(item => {
                    if (item.option && Array.isArray(item.option)) {
                        item.option.forEach(oItem => {
                            if (oItem.label.includes(value)) filterableValue.push(oItem.value);
                            if (oItem.label.includes(value) && !oItem.disabled) currentOptionValue.push(oItem.value);
                        })
                    } else {
                        if (item.label.includes(value)) filterableValue.push(item.value)
                        if (item.label.includes(value) && !item.disabled) currentOptionValue.push(item.value)
                    }
                });
                this.currentOptionValue = currentOptionValue;
            } else {
                this.isFilter = false;
                this.reduceOptionValue();
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
            this.keySelectValue = '';
            this.currentSelectedItems = [];
            this.hoverItemValue = '';
            this.filterableValue = [];
            this.isFilter = false;
            this.reduceOptionValue();
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
                    this.reduceOptionValue();
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
                if (scrollOuter) {
                    if(window.getComputedStyle){
                        targetPaddingTop = window.getComputedStyle(scrollOuter, null)['paddingTop'];
                        targetPaddingBottom = window.getComputedStyle(scrollOuter, null)['paddingBottom'];
                    }
                    else if(scrollOuter.currentStyle) {
                        targetPaddingTop = scrollOuter.currentStyle['paddingTop'];
                        targetPaddingBottom = scrollOuter.currentStyle['paddingBottom'];
                    }
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
        handleOutsideClick(event) {
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
        //设置scroll的位置
        setScrollToPosition(){
            let dropDown = this.$refs.dropDown;
            let focusOption = dropDown && dropDown.$el.getElementsByClassName(`${this.optionPrefix}__focus`)[0];
            if(focusOption){
                let top = focusOption.offsetTop;
                let height = focusOption.offsetHeight;

                let parentOptionGroup = focusOption.parentNode.parentNode;
                let parentOptionGroupWrap = focusOption.parentNode;
                let parentOptionGroupClass = `${this.optionPrefix}-group`;
                if(parentOptionGroup.getAttribute('class') === parentOptionGroupClass){
                    top = top + parentOptionGroupWrap.offsetTop + parentOptionGroup.offsetTop;
                }

                let bottomTop = parseInt(top + height);
                let maxHeight = parseInt(this.maxHeight);

                if(bottomTop > maxHeight){
                    let y = bottomTop - maxHeight;
                    let position = {
                        x: 0,
                        y: y
                    }
                    this.$refs.scroll && this.$refs.scroll.scrollTo(position, 200);
                }

                if(bottomTop <= maxHeight){
                    let position = {
                        x: 0,
                        y: 0
                    }
                    this.$refs.scroll && this.$refs.scroll.scrollTo(position, 200);
                }
            }
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
                if (key === 'Escape') this.setDropDownVisible(false);
                if(key === 'Enter') {
                    if(this.allowCreate && this.allowCreateOption && this.allowCreateOption.value === this.keySelectValue) {
                        this.handleConfirmAllowCreate();
                    }else {
                        this.handleOptionClick(this.keySelectValue)
                    }
                }
                if (key === 'ArrowUp') {
                    this.handleOptionNavigate(-1);
                    setTimeout(()=>{this.setScrollToPosition()})
                }
                if (key === 'ArrowDown') {
                    this.handleOptionNavigate(1);
                    setTimeout(()=>{this.setScrollToPosition()})
                }
            } else {
                if (['ArrowUp', 'ArrowDown'].includes(key)) this.setDropDownVisible(true);
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