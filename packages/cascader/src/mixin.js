
export default {
    props: {
        value: {
            type: Array,
            default(){
                return []
            }
        },
        data: {
            type: Array,
            default(){
                return []
            }
        },
        trigger: {
            type: String,
            default: 'click',
            validator(value){
                return ['click', 'hover'].includes(value)
            }
        },
        //是否可以选择任意项，默认只能选择叶子节点
        changeOnSelect: {
            type: Boolean,
            default: false
        },
        loadData: {
            type: Function,
        },
        //格式化label的显示
        formatLabel: {
            type: Function,
            default(data){
                return data.label || '';
            }
        }
    },
    data(){
        return {
            currentData: [],
            currentValue: [],
            currentLabel: [],
            currentSelectedData: [],//当前选中的数据集合，一维数组
        }
    },
    mounted(){
        this.currentValue = this.value;
    },
    methods: {
        resetCurrentData(){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let index = 0;
            let fn = (data, parentItem) => {
                data.forEach((item, i) => {
                    let pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                    let pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                    item.__deepIndex = item.__deepIndex || index.toString();
                    item.__pathIndex = item.__pathIndex || pathIndex;
                    item.__visible = false;//该值控制children的显示
                    item.__disabled = item.disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = false;
                    item.__selected = false;
                    item.__pathLabel = pathLabel || '';

                    if(this.loadData){
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
            this.currentData = deepData;
            return deepData;
        },
        //深度克隆并给指定data添加初始值
        deepCloneData(data, parentItem){
            if(!data || !data.length) return [];
            let deepData = JSON.parse(JSON.stringify(data));
            let index = parentItem ? parseInt(parentItem.__deepIndex) + 1 : 0;
            let fn = (data, parentItem) => {
                data.forEach((item, i) => {
                    let pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                    let pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                    item.__deepIndex = item.__deepIndex || index.toString();
                    item.__pathIndex = item.__pathIndex || pathIndex;
                    item.__visible = item.__visible || false;//该值控制children的显示
                    item.__disabled = item.disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = false;
                    item.__selected = item.__selected || false;
                    item.__pathLabel = pathLabel || '';


                    if(this.loadData){
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
        //初始化currentData
        initCurrentData(){
            this.currentData = this.deepCloneData(this.data);
            //当value存在，data后更新时
            if(this.currentValue.length){
                this.handleValueChange(this.currentData, this.currentValue);
            }
            return this.currentData;
        },
        //设置currentData中指定item的prop的value值，
        // 如果设置的是__visible\__selected属性时 会同时设置父级相同属性的值，
        // 如果设置的是__loading属性，只设置本级别的值
        // 如果设置的是children属性，会初始化value后进行设置
        setCurrentData(prop, item, value) {
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            if(prop === 'children'){
                value = this.deepCloneData(value, item);
            }
            let has = false;//是否有满足的
            let isSelected = this.currentValue.includes(item.value);//点击的项是否是选中的项
            let fn = (data) => {
                data.forEach(_item => {
                    if (['__visible', '__selected'].includes(prop)) {
                        _item[prop] = false;
                    }
                    if (_item.value === item.value && !has && !item.__disabled) {
                        has = true;
                        _item[prop] = value;
                    }
                    //如果在当前选中项的层级上点击 该路径下的为__selected属性设置为true
                    if(isSelected && this.currentValue.includes(_item.value)) _item.__selected = true;
                    if (_item.children && _item.children.length) {
                        fn(_item.children);
                    }
                })
            };
            fn(deepData);
            if(['__visible', '__selected'].includes(prop)){
                deepData = this.setCurrentDataByPath(deepData, prop, item, value);
            }
            this.currentData = deepData;
        },
        //设置currentData，通过指定项的path查找对应的所有父级统一设置指定的属性值
        setCurrentDataByPath(data, prop, item, value){
            let deepData = JSON.parse(JSON.stringify(data));
            let pathIndexArr = item.__pathIndex.split('.');
            let fn = (data) => {
                let index = pathIndexArr.shift();
                if(!data.length || !index) return;
                if(data[index].__disabled) return;
                data[index][prop] = value;
                let _data = data[index].children || [];
                fn(_data);
            };
            fn(deepData, pathIndexArr);
            return deepData;
        },
        //通过指定项的path 从currentData数据中获取指定的prop 返回查找到的属性值组成的数组
        getPropFromCurrentDataByPath(item, prop){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let pathIndexArr = item.__pathIndex.split('.');
            let result = [];
            this.currentSelectedData = [];
            let fn = (data) => {
                let index = pathIndexArr.shift();
                if(!data.length || !index) return;
                if(data[index].__disabled) return;
                result.push(data[index][prop]);
                this.currentSelectedData.push(data[index]);
                let _data = data[index].children || [];
                fn(_data);
            };
            fn(deepData, pathIndexArr);
            return result;
        },
        //过滤出所有被选中项，并设置currentValue 和 currentLabel
        filterSelectedValue(){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let fn = (data) => {
                data.forEach(item => {
                    if (item.__selected && !item.__disabled) {
                        this.setCurrentValue(item);
                        this.setCurrentLabel(item);
                    }
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                })
            };
            fn(deepData);
        },
        //设置currentValue
        setCurrentValue(data){
            if(!this.changeOnSelect && data.__more) return;
            this.openFilterable = false;
            this.currentValue = this.getPropFromCurrentDataByPath(data, 'value');
            this.$emit('change', this.currentValue, this.currentSelectedData);
            if(!data.__more){
                this.dropDownVisible && this.dropDownVisible(false);
            }
        },
        //设置currentLabel 并 触发修改inputValue的值
        setCurrentLabel(data){
            if(!this.changeOnSelect && data.__more) return;
            this.currentLabel = this.getPropFromCurrentDataByPath(data, 'label');
            this.setInputValue && this.setInputValue();
        },
        //通过指定的value数组 从data中查找出所有子项 并返回子项的数组
        getItemDataByValue(data, value){
            if(!value.length) return [];
            let result = [];
            let deepData = JSON.parse(JSON.stringify(data));
            let fn = (data) => {
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
        //上层value变化时 设置currentValue currentLabel currentData(选中属性的值)
        handleValueChange(data, values){
            let itemData = this.getItemDataByValue(data, values);
            if(itemData.length){
                for (let i = 0; i < itemData.length; i++){
                    if(itemData[i].value === values[i]){
                        this.setCurrentData('__visible', itemData[i], true);
                        this.setCurrentData('__selected', itemData[i], true);
                        this.filterSelectedValue();
                    }else{
                        break;
                    }
                }
            }
        },
        //根据value搜索
        searchFilter(value){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let result = [];
            let fn = (data) => {
                data.forEach(item => {
                    if (item.__pathLabel.includes(value) && !item.__disabled) {
                        if(this.changeOnSelect){
                            delete item.children;
                            result.push(item);
                        }else if(!item.children || !item.children.length){
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
    },
    watch: {
        value: {
            handler(val){
                if(JSON.stringify(val) === JSON.stringify(this.currentValue)) return;
                this.handleValueChange(this.currentData, val);
                this.currentValue = val;
            },
            deep: true,
            immediate: true
        },
        currentValue(val){
            this.$emit('input', val);
        }
    }
}
