
export default {
    data() {
        return {
            currentData: [],
            currentSelectedData: []
        }
    },
    methods: {
        resetCurrentData(data) {
            const deepData = JSON.parse(JSON.stringify(data));
            let index = 0;
            const fn = (data, parentItem) => {
                data.forEach((item, i) => {
                    const pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                    const pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                    item.__deepIndex = item.__deepIndex || index.toString();
                    item.__pathIndex = item.__pathIndex || pathIndex;
                    item.__visible = false;// 该值控制children的显示
                    item.__disabled = item.disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = false;
                    item.__selected = false;
                    item.__pathLabel = pathLabel || '';

                    if (this.loadData) {
                        item.__more = !item.last;
                    }

                    if (item.children && item.children.length) {
                        index++;
                        fn(item.children, item);
                        index--;
                    }
                });
            };
            fn(deepData);
            return deepData;
        },
        // 深度克隆并给指定data添加初始值
        deepCloneData(data, parentItem) {
            if (!data || !data.length) return [];
            const deepData = JSON.parse(JSON.stringify(data));
            let index = 0;
            const fn = (data, parentItem) => {
                data.forEach((item, i) => {
                    const pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                    const pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                    item.__deepIndex = item.__deepIndex || index.toString();
                    item.__pathIndex = item.__pathIndex || pathIndex;
                    item.__visible = item.__visible || false;// 该值控制children的显示
                    item.__disabled = item.disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = false;
                    item.__selected = item.__selected || false;
                    item.__pathLabel = pathLabel || '';

                    if (this.loadData) {
                        item.__more = !item.last;
                    }

                    if (item.children && item.children.length) {
                        index++;
                        fn(item.children, item);
                        index--;
                    }
                });
            };
            fn(deepData, parentItem);
            return deepData;
        },
        // 设置currentData中指定item的prop的value值，
        // 如果设置的是__visible\__selected属性时 会同时设置父级相同属性的值，
        // 如果设置的是__loading属性，只设置本级别的值
        // 如果设置的是children属性，会初始化value后进行设置
        setCurrentData(prop, item, value) {
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            if (prop === 'children') {
                value = this.deepCloneData(value, item);
            }
            let has = false;// 是否有满足的
            const fn = (data) => {
                data.forEach(_item => {
                    if (['__visible', '__selected'].includes(prop)) {
                        _item[prop] = false;
                    }
                    if (_item.value === item.value && !has && !item.__disabled) {
                        has = true;
                        _item[prop] = value;
                    }
                    if (_item.children && _item.children.length) {
                        fn(_item.children);
                    }
                })
            };
            fn(deepData);
            if (['__visible', '__selected'].includes(prop)) {
                deepData = this.setCurrentDataByPath(deepData, prop, item, value);
            }
            return deepData;
        },
        // 设置currentData，通过指定项的path查找对应的所有父级统一设置指定的属性值
        setCurrentDataByPath(data, prop, item, value) {
            const deepData = JSON.parse(JSON.stringify(data));
            const pathIndexArr = item.__pathIndex.split('.');
            const fn = (data) => {
                const index = pathIndexArr.shift();
                if (!data.length || !index) return;
                if (data[index].__disabled) return;
                data[index][prop] = value;
                const _data = data[index].children || [];
                fn(_data);
            };
            fn(deepData, pathIndexArr);
            return deepData;
        },
        // 通过指定项的path 从currentData数据中获取指定的prop 返回查找到的属性值组成的数组
        getPropFromCurrentDataByPath(data, item, prop) {
            const deepData = JSON.parse(JSON.stringify(data));
            const pathIndexArr = item.__pathIndex.split('.');
            const result = [];
            this.currentSelectedData = [];
            const fn = (data) => {
                const index = pathIndexArr.shift();
                if (!data.length || !index) return;
                if (data[index].__disabled) return;
                result.push(data[index][prop]);
                this.currentSelectedData.push(data[index]);
                const _data = data[index].children || [];
                fn(_data);
            };
            fn(deepData, pathIndexArr);
            return result;
        },
        // 过滤出所有被选中项，并设置currentValue 和 currentLabel
        // filterSelectedValue() {
        //     let deepData = JSON.parse(JSON.stringify(this.currentData));
        //     let fn = (data) => {
        //         data.forEach(item => {
        //             if (item.__selected && !item.__disabled) {
        //                 this.setCurrentValue(item);
        //                 this.setCurrentLabel(item);
        //             }
        //             if (item.children && item.children.length) {
        //                 fn(item.children);
        //             }
        //         })
        //     };
        //     fn(deepData);
        // },
        // 设置currentValue
        // setCurrentValue(data) {
        //     if (!this.changeOnSelect && data.__more) return;
        //     this.currentValue = this.getPropFromCurrentDataByPath(data, 'value');
        //     this.$emit('change', this.currentValue, this.currentSelectedData);
        //     if (!data.__more) {
        //         this.dropDownVisible && this.dropDownVisible(false);
        //     }
        // },
        // 设置currentLabel 并 触发修改inputValue的值
        // setCurrentLabel(data) {
        //     if (!this.changeOnSelect && data.__more) return;
        //     this.currentLabel = this.getPropFromCurrentDataByPath(data, 'label');
        //     this.setInputValue && this.setInputValue();
        // },
        // 通过指定的value数组 从data中查找出所有子项 并返回子项的数组
        getItemDataByValue(data, value) {
            if (!value.length) return [];
            const result = [];
            const deepData = JSON.parse(JSON.stringify(data));
            const fn = (data) => {
                data.forEach(item => {
                    if (value.includes(item.value) && !item.__disabled) {
                        result.push(item);
                    }
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                })
            };
            fn(deepData);
            return result;
        },
        // 上层value变化时 设置currentValue currentLabel currentData(选中属性的值)
        // handleValueChange(data, values) {
        //     let itemData = this.getItemDataByValue(data, values);
        //     if (itemData.length) {
        //         for (let i = 0; i < itemData.length; i++) {
        //             if (itemData[i].value === values[i]) {
        //                 this.setCurrentData('__visible', itemData[i], true);
        //                 this.setCurrentData('__selected', itemData[i], true);
        //                 this.filterSelectedValue();
        //             } else {
        //                 break;
        //             }
        //         }
        //     }
        // },
        // 根据value搜索
        searchFilter(data, value) {
            const deepData = JSON.parse(JSON.stringify(data));
            const result = [];
            const fn = (data) => {
                data.forEach(item => {
                    if (item.__pathLabel.includes(value) && !item.__disabled) {
                        if (this.changeOnSelect) {
                            delete item.children;
                            result.push(item);
                        } else if (!item.children || !item.children.length) {
                            result.push(item);
                        }
                    }
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                })
            };
            fn(deepData);
            return result;
        }
    }
}
