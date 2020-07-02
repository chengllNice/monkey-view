
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
                this.handleValueChange(deepData, this.currentValue);
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
        },
        setCurrentLabel(data){
            if(!this.changeOnSelect && data.__more) return;
            this.currentLabel = this.getPropFromCurrentDataByPath(data, 'label');
            this.setInputValue && this.setInputValue();
        },
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
        asyncLoadData(){

        }
    },
    watch: {
        value: {
            handler(val){
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
