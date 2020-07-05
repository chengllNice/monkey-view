
import {getObjectValueByPath} from "../../../utils/global";

export default {
    data(){
        return {
            currentData: [],
            initHasChecked: false,//初始数据是否存在checked的项
            initHasDisabled: false,//初始数据是否存在disabled的项
            initHasExpand: false,//初始数据是否存在expand的项
            isExpandKeysChange: false,
        }
    },
    mounted(){

    },
    methods: {
        //深度克隆并给指定data添加初始值
        deepCloneData(data, parentItem){
            if(!data || !data.length) return [];
            let deepData = JSON.parse(JSON.stringify(data));
            let index = parentItem ? parseInt(parentItem.__deepIndex) + 1 : 0;
            let fn = (data, parentItem) => {
                data.forEach((item, i) => {
                    let pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                    let pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                    item.__deepIndex = index.toString();
                    item.__pathIndex = pathIndex;
                    item.__visible = item.__visible || true;//该值控制当前项的显示
                    item.__expand = item.expand || item.__expand || false;//该值控制children的显示
                    item.__disabled = item.disabled || item.__disabled || false;
                    item.__more = item.children && item.children.length;
                    item.__loading = item.__loading || false;
                    item.__selected = item.selected || item.__selected || false;
                    item.__checked = this.showCheckbox ? (item.checked || item.__checked || false) : false;
                    item.__disabledCheckbox = item.disabledCheckbox || item.__disabledCheckbox || false;
                    item.__indeterminate = item.__indeterminate || false;
                    item.__pathLabel = pathLabel || '';


                    item.parentKey = parentItem ? parentItem.key : '';


                    if(this.loadData){
                        item.__more = !item.last;
                    }
                    if(item.__disabled) this.initHasDisabled = true;
                    if(item.__checked) this.initHasChecked = true;
                    if(item.__expand) this.initHasExpand = true;

                    if (item.children && item.children.length) {
                        index++;
                        fn(item.children, item);
                        index--;
                    }
                });
            };
            fn(deepData, parentItem);
            this.setReduceData(deepData);
            // console.log(deepData, 'deeep', JSON.parse(JSON.stringify(this.reduceData)))
            return deepData;
        },
        //初始化currentData
        initData(data){
            this.currentData = this.deepCloneData(data || this.data);
            if(this.showCheckbox && this.initHasChecked && !this.checkStrictly){
                //过滤出所有checked项
                let checkedData = this.filterDataByPropValue('__checked', true, 'eq');
                if(checkedData.length){
                    checkedData.forEach(item=>{
                        this.setData('__checked', item, true);
                    })
                }
            }

            if(this.initHasExpand){
                //过滤出所有expand项
                let expandData = this.filterDataByPropValue('__expand', true, 'eq');
                if(expandData.length){
                    expandData.forEach(item=>{
                        this.setData('__expand', item, true);
                    })
                }
            }

            if(this.initHasDisabled){
                //过滤出所有disabled项
                let disabledData = this.filterDataByPropValue('__disabled', true, 'eq');

                if(disabledData.length){
                    disabledData.forEach(item=>{
                        this.setData('__disabled', item, true);
                    })
                }
            }

            if(this.expandKeys.length){
                this.expandKeysChange();
            }
            if(this.checkedKeys.length){
                this.checkedKeysChange();
            }
            return this.currentData;
        },
        //设置currentData中指定item的prop的value值，
        // 如果设置的是__expand\__selected属性时 会同时设置父级相同属性的值，
        // 如果设置的是__loading属性，只设置本级别的值
        // 如果设置的是children属性，会初始化value后进行设置
        setData(prop, item, value) {
            if(!this.currentData.length) return;
            // let deepData = JSON.parse(JSON.stringify(this.currentData));
            let pathIndex = item.__pathIndex;
            let pathIndexLen = item.__pathIndex.length;
            if(prop === 'children'){
                value = this.deepCloneData(value, item);
            }
            let fn = (data) => {
                data.forEach(_item => {
                    if(this.accordion && _item.__pathIndex.substring(0, 1) !== item.__pathIndex.substring(0, 1)){
                        if (['__expand'].includes(prop)) {
                            _item[prop] = false;
                        }
                    }
                    //当前项下的所有子项都改变
                    if(['__disabled'].includes(prop) || (!this.checkStrictly && prop === '__checked')){
                        if(_item.__pathIndex.substring(0, pathIndexLen) === pathIndex){
                            _item[prop] = value;
                        }
                    }

                    if(prop === '__visible' && _item.key === item.key){
                        _item[prop] = value;
                    }else if (_item.key === item.key && !item.__disabled) {
                        _item[prop] = value;
                    }
                    if (_item.children && _item.children.length) {
                        fn(_item.children);
                    }
                })
            };
            fn(this.currentData);
            if(['__checked'].includes(prop) && !this.checkStrictly){
                this.setCheckboxStatus(this.currentData, item, value);
                // deepData = this.setCheckboxStatus(deepData, item, value);
            }

            if((this.filterLoading || this.isExpandKeysChange) && prop === '__expand'){
                this.setAllParentDataByPath(this.currentData, prop, item, value);
                // deepData = this.setAllParentDataByPath(deepData, prop, item, value);
            }
            if(['__visible'].includes(prop)){
                this.setAllParentDataByPath(this.currentData, prop, item, value);
                // deepData = this.setAllParentDataByPath(deepData, prop, item, value);
            }
            // this.currentData = deepData;
        },
        //设置被改变项的所有父级的Indeterminate和checked
        setCheckboxStatus(data, item, value){
            if(!data || !data.length) return;
            // let deepData = JSON.parse(JSON.stringify(data));
            let pathIndexArr = item.__pathIndex.split('.');
            pathIndexArr.pop();//先删除当前项的下标
            if(!pathIndexArr.length) return data;


            for (let i = 0; i <= pathIndexArr.length; i++){
                let pathString = pathIndexArr.join('.children.');
                pathIndexArr.pop();

                let checked = false;
                let indeterminate = false;
                let parentItem = getObjectValueByPath(data, pathString);
                if(!parentItem || parentItem.__disabled) return;

                parentItem.children.forEach(_item => {
                    //选中时 子项有一项没有checked即为indeterminate
                    if(!_item.__checked && value){
                        indeterminate = true;
                    }
                    //取消选中时 子项有一项checked即为indeterminate
                    if(_item.__checked && !value){
                        indeterminate = true;
                    }
                });
                checked = value && !indeterminate;

                parentItem.__checked = checked;
                parentItem.__indeterminate = indeterminate;
            }
            return data;
        },
        //设置所有项的visible为false
        setVisibleValue(value){
            // let deepData = JSON.parse(JSON.stringify(this.currentData));
            let fn = (data) => {
                data.forEach(_item => {
                    _item.__visible = value || false;
                    if (_item.children && _item.children.length) {
                        fn(_item.children);
                    }
                })
            };
            fn(this.currentData);
            return this.currentData;
        },
        //设置data，通过指定项的path查找对应的所有父级统一设置指定的属性值
        setAllParentDataByPath(data, prop, item, value){
            // let deepData = JSON.parse(JSON.stringify(data));
            let pathIndexArr = item.__pathIndex.split('.');
            let fn = (data) => {
                let index = pathIndexArr.shift();
                if(!data.length || !index) return;
                if(prop !== '__visible' && data[index].__disabled) return;
                data[index][prop] = value;
                let _data = data[index].children || [];
                fn(_data);
            };
            fn(data, pathIndexArr);
            return data;
        },
        //通过指定项的path 从currentData数据中获取指定的prop 返回查找到的属性值组成的数组
        getPropFromDataByPath(item, prop){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let pathIndexArr = item.__pathIndex.split('.');
            let result = [];
            let fn = (data) => {
                let index = pathIndexArr.shift();
                if(!data.length || !index) return;
                if(data[index].__disabled) return;
                result.push(data[index][prop]);
                let _data = data[index].children || [];
                fn(_data);
            };
            fn(deepData, pathIndexArr);
            return result;
        },
        //从data数据里 过滤出prop=value的项； relation表示prop对应的值和value值的关系 eq(等于) includes(包含)
        filterDataByPropValue(prop, value, relation = 'eq'){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let result = [];
            let fn = (data) => {
                for (let i = 0; i < data.length; i++){
                    let item = data[i];
                    if(relation === 'includes'){
                        if (item[prop].includes(value) && !item.__disabled) {
                            result.push(item);
                        }
                    }else if(relation === 'eq'){
                        if (item[prop] === value && !item.__disabled) {
                            result.push(item);
                        }
                    }

                    if(prop === 'key' && result.length) return;
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                }
            };
            fn(deepData);
            return result;
        },
        //过滤删除不匹配的项 返回匹配条件的数据
        filterDataByPropValueRemove(prop, value){
            let deepData = JSON.parse(JSON.stringify(this.currentData));
            let fn = (data) => {
                data.forEach((item, index)=>{
                    if (item[prop] === value && !item.__disabled) {
                        delete deepData[index];
                    }
                    if (item.children && item.children.length) {
                        fn(item.children);
                    }
                })
            };
            fn(deepData);
            return deepData;
        },
        expandKeysChange(){
            if(!this.currentData.length) return;
            this.isExpandKeysChange = true;
            // let deepData = JSON.parse(JSON.stringify(this.currentData));

            this.expandKeys.forEach(item=>{
                let currentItem = this.filterDataByPropValue('key', item, 'eq');
                if(currentItem.length){
                    this.setData('__expand', currentItem[0], true);
                }
            });
            this.isExpandKeysChange = false;
        },
        checkedKeysChange(){
            if(!this.currentData.length || !this.showCheckbox) return;
            // let deepData = JSON.parse(JSON.stringify(this.currentData));

            this.checkedKeys.forEach(item=>{
                let currentItem = this.filterDataByPropValue('key', item, 'eq');
                if(currentItem.length){
                    this.setData('__checked', currentItem[0], true);
                }
            });
        },
        deleteProp(data){
            if(data && typeof data === 'object' && !Array.isArray(data)){
                Object.keys(data).forEach(key=>{
                    if(key.includes('__')) delete data[key]
                });
                return data;
            }else{
                let deepData = JSON.parse(JSON.stringify(this.currentData));
                deepData.forEach(item=>{
                    this.deleteProp(item);
                });
                return deepData;
            }
        }
    },
    watch: {
        expandKeys: {
            handler(){
                this.expandKeysChange();
            },
            deep: true,
            immediate: true
        },
        checkedKeys: {
            handler(){
                this.checkedKeysChange();
            },
            deep: true,
            immediate: true
        }
    }
}
