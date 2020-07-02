
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
        deepCloneData(){
            let deepData = JSON.parse(JSON.stringify(this.data));
            let index = 0;
            let fn = (data, parentPathIndex) => {
                data.forEach((item, i) => {
                    item.__deepIndex = item.__deepIndex || index.toString();
                    item.__pathIndex = item.__pathIndex || (!parentPathIndex ? i.toString() : parentPathIndex + '.' + i);
                    item.__visible = item.__visible || false;//该值控制children的显示
                    item.__disabled = item.disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = item.loading || false;
                    item.__selected = item.__selected || false;

                    if (item.children && item.children.length) {
                        index++;
                        fn(item.children, item.__pathIndex);
                        index--;
                    }
                });
            };
            fn(deepData);
            this.currentData = deepData;
            //当value存在，data后更新时
            if(this.currentValue.length){
                let itemData = this.getLastItemDataByValue(deepData, this.currentValue);
                if(itemData){
                    this.setCurrentData('__visible', itemData, true);
                    this.setCurrentData('__selected', itemData, true);
                    this.filterSelectedValue();
                }
            }
            return this.currentData;
        },
        setCurrentData(prop, item, value) {
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let has = false;//是否有满足的
            let fn = (data) => {
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
            deepData = this.setCurrentDataByPath(deepData, prop, item, value);
            this.currentData = deepData;
        },
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
        getPropFromCurrentDataByPath(item, prop){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let pathIndexArr = item.__pathIndex.split('.');
            let result = [];
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
        setCurrentValue(data){
            if(!this.changeOnSelect && data.__more) return;
            this.currentValue = this.getPropFromCurrentDataByPath(data, 'value');
            // let index = data.__deepIndex;
            // this.currentValue = this.currentValue.slice(0, index);
            // this.currentValue.splice(index, 1, data.value);
        },
        setCurrentLabel(data){
            if(!this.changeOnSelect && data.__more) return;
            this.currentLabel = this.getPropFromCurrentDataByPath(data, 'label');
            // let index = data.__deepIndex;
            // this.currentLabel = this.currentLabel.slice(0, index);
            // this.currentLabel.splice(index, 1, data.label);
            this.setInputValue && this.setInputValue();
        },
        getLastItemDataByValue(data, value){
            if(!value.length) return;
            let lastValue = value[value.length - 1];
            let result = null;
            let deepData = JSON.parse(JSON.stringify(data));
            let fn = (data) => {
                if(result) return;
                data.forEach(item => {
                    if (item.value === lastValue && !item.__disabled) {
                        result = item;
                    }
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                })
            };
            fn(deepData);
            return result;
        },

        asyncLoadData(){

        }
    },
    watch: {
        value: {
            handler(val){
                let itemData = this.getLastItemDataByValue(this.currentData, val);
                if(itemData){
                    this.setCurrentData('__visible', itemData, true);
                    this.setCurrentData('__selected', itemData, true);
                    this.filterSelectedValue();
                }
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