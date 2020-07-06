
export default {
    data(){
        return {
            currentData: [],
            reduceData: [],
            renderData: [],
            initHasChecked: false,//初始数据是否存在checked的项
            initHasDisabled: false,//初始数据是否存在disabled的项
            initHasExpand: false,//初始数据是否存在expand的项
            isExpandKeysChange: false,
            defaultLoad: true,//是否是默认第一次加载数据
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

                    if(!item.children) item.children = [];

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


                    item.rootParentKey = parentItem ? parentItem.rootParentKey : item.key;//父级根节点的key
                    item.parentKey = parentItem ? parentItem.key : '';//直接父级的key
                    item.allparentKeys = parentItem ? [parentItem.key, ...parentItem.allparentKeys] : [];
                    item.childrenKeys = [];
                    item.allChildrenKeys = [];

                    if(this.defaultLoad && this.defaultExpandAll && !item.__disabled){
                        item.__expand = true;
                    }


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
            this.defaultLoad = false;
            return deepData;
        },
        //平铺数据
        tileData(data){
            let deepData = JSON.parse(JSON.stringify(data));
            let fn = (data) => {
                if(!data || !data.length) return [];
                return data.reduce((r,item)=>{
                    return r.concat(item).concat(fn(item.children))
                },[])
            };
            return fn(deepData);
        },
        //设置childrenKey信息
        setChildrenKeys(data){
            if(!Array.isArray(data)) return data;
            for (let i = 0; i < data.length; i++){
                let childrenKeys = [];
                let allChildrenKeys = [];
                for (let j = 0; j < data.length; j++){
                    if(data[j].allparentKeys.includes(data[i].key)){
                        allChildrenKeys.push(data[j].key)
                    }
                    if(data[j].parentKey === data[i].key){
                        childrenKeys.push(data[j].key);
                    }
                }
                data[i].childrenKeys = childrenKeys;
                data[i].allChildrenKeys = allChildrenKeys;
            }
            return data;
        },

        /**
         * 设置reduceData的值
         * @param item 指定要设置的项
         * @param prop 要设置的属性
         * @param value 设置的值
         * @param source 触发的来源 node(节点触发)
         */
        setReduceDataProp(item, prop, value, source){
            let key = item.key;
            let rootParentKey = item.rootParentKey;

            if(prop === 'children'){
                value = this.deepCloneData(value, item);
            }

            this.reduceData.forEach(item=>{
                if(prop === '__expand' && !item.__disabled){
                    //如果是手风琴模式 不是该根节点下的子项都设置为false
                    if(this.accordion && item.rootParentKey !== rootParentKey) item[prop] = false;

                    //如果value为true 所有父级都展开
                    if(item.allChildrenKeys.includes(key) && value) item[prop] = value;

                    //如果value为false 所有子级收起
                    if(item.allparentKeys.includes(key) && !value) item[prop] = value;

                    //当前项设置
                    if(item.key === key) item[prop] = value;
                }

                if(this.showCheckbox && prop === '__checked'){
                    //如果严格控制checked 只改变当前项的checked
                    // if(this.checkStrictly && item.key === key && !item.__disabled) item[prop] = value;

                    //如果不严格控制checked 所有子级的checked改变
                    if(!this.checkStrictly && item.allparentKeys.includes(key)) {
                        item[prop] = value;
                        item['__indeterminate'] = false;
                    }

                    //当前项设置
                    if(item.key === key) item['__indeterminate'] = false;
                }

                if(prop === '__visible'){
                    //如果value为true 所有父级显示
                    if(item.allChildrenKeys.includes(key) && !!value) item[prop] = value;

                    //如果value为false 所有子级隐藏
                    if(item.allChildrenKeys.includes(key) && !value) item[prop] = value;

                    //当前项设置
                    if(item.key === key) item[prop] = value;
                }

                if(item.key === key && !item.__disabled) item[prop] = value;
            });

            //如果不是严格控制 所有父级checked改变
            if(prop === '__checked' && !this.checkStrictly){
                this.setCheckboxStatus(item);
            }

            if(prop === 'children'){
                let filterData = this.reduceData.filter(item=>{
                    return !item.parentKey
                });
                this.initData(filterData);
            }

            if(source === 'node' && prop === '__expand'){
                this.expandChange(item);
            }
            if(source === 'node' && prop === '__checked'){
                this.checkChange(item);
            }
        },
        //设置被改变项的所有父级的Indeterminate和checked
        setCheckboxStatus(item){
            if(!this.reduceData || !this.reduceData.length) return;

            let key = item.key;
            let checked = item.__checked;

            this.reduceData.forEach(_item=>{
                if(_item.allChildrenKeys.includes(key)){
                    let childrenCheckedArray = this.getChildrenPropValue(_item, '__checked');

                    //选中时 子项有没有选中的即为indeterminate
                    if(checked) {
                        _item.__indeterminate = childrenCheckedArray.includes(false);
                        _item.__checked = !childrenCheckedArray.includes(false);
                    }

                    //取消选中时 子项有一项checked即为indeterminate
                    if(!checked){
                        _item.__indeterminate = childrenCheckedArray.includes(true);
                        _item.__checked = false;
                    }
                }
            })
        },
        //expandKey改变触发
        expandKeysChange(){
            if(!this.reduceData.length) return;
            this.isExpandKeysChange = true;

            let expandData = this.reduceData.filter(item=>{
                return this.expandKeys.includes(item.key);
            })
            expandData.forEach(item=>{
                this.setReduceDataProp(item, '__expand', true);
            });

            this.isExpandKeysChange = false;
        },
        //checkedKey改变触发
        checkedKeysChange(){
            if(!this.reduceData.length || !this.showCheckbox) return;

            let checkedData = this.reduceData.filter(item=>{
                return this.checkedKeys.includes(item.key);
            })
            checkedData.forEach(item=>{
                this.setReduceDataProp(item, '__checked', true);
            });
        },
        //获取所有子级指定prop属性的value值的数组集合
        getChildrenPropValue(item, prop){
            // if(!this.reduceData || !this.reduceData.length) return;
            let result = [];
            let key = item.key;
            this.reduceData.forEach(_item=>{
                if(_item.allparentKeys.includes(key) && _item.key !== key){
                    result.push(_item[prop])
                }
            })
            return result;
        },
        //获取所有子级指定prop=value值的项的数组和keys数组
        getDataByPropValue(prop, value){
            // if(!this.reduceData || !this.reduceData.length) return;
            let result = {
                data: [],
                keys: []
            };
            this.reduceData.forEach(item=>{
                if(item[prop] === value){
                    result.data.push(item);
                    result.keys.push(item.key);
                }
            })
            return result;
        },
        //获取label满足搜索value的项
        getDataByfilterValue(value){
            // if(!this.reduceData || !this.reduceData.length) return;
            if(!value.trim()) return ;
            let result = [];
            this.reduceData.forEach(item=>{
                if(item.label.includes(value)){
                    result.push(item);
                }
            })
            return result;
        },

        //初始化reduceData
        initData(data){
            let deepData = this.deepCloneData(data || this.data);
            deepData = this.tileData(deepData);
            this.setChildrenKeys(deepData);
            this.reduceData = deepData;

            if(this.showCheckbox && this.initHasChecked && !this.checkStrictly){
                //过滤出所有checked被选中的项
                let checkedData = this.getDataByPropValue('__checked', true).data;
                if(checkedData.length){
                    checkedData.forEach(item=>{
                        this.setReduceDataProp(item, '__checked', true);
                    })
                }
            }

            if(this.initHasExpand){
                //过滤出所有expand项
                let expandData = this.getDataByPropValue('__expand', true).data;
                if(expandData.length){
                    expandData.forEach(item=>{
                        this.setReduceDataProp(item,'__expand', true);
                    })
                }
            }

            // if(this.initHasDisabled){
            //     //过滤出所有disabled项
            //     let disabledData = this.filterDataByPropValue('__disabled', true, 'eq');
            //
            //     if(disabledData.length){
            //         disabledData.forEach(item=>{
            //             this.setData('__disabled', item, true);
            //         })
            //     }
            // }

            if(this.expandKeys.length){
                this.expandKeysChange();
            }
            if(this.checkedKeys.length){
                this.checkedKeysChange();
            }
        },
        //设置currentData
        setCurrentData(){
            let reduceData = JSON.parse(JSON.stringify(this.reduceData));
            let result = [];
            reduceData.forEach(item=>{
                if(!item.parentKey) result.push(item);
            });
            this.currentData = result;
        },

        setRenderData(){
            let deepReduceData = JSON.parse(JSON.stringify(this.reduceData));
            deepReduceData = deepReduceData.filter(item=>{
                return !item.parentKey
            });

            deepReduceData = this.tileData(deepReduceData);
            this.renderData = deepReduceData;
        },
        renderDataChange(){
            if(JSON.stringify(this.renderData) === JSON.stringify(this.reduceData)) return;
            // if(!this.renderData || !this.renderData.length) return;

            let result = this.renderData.filter(item=>{
                return !item.parentKey
            });

            this.initData(result);
        },
        getDataFromRenderDataByKey(key){
            if(!this.renderData || !this.renderData.length) return null;
            let result = this.renderData.filter(item=>{
                return item.key === key;
            });
            if(result && result.length) return result[0];
            return null;
        },
    },
    watch: {
        data: {
            handler(){
                this.initData();
            },
            deep: true,
            immediate: true
        },
        reduceData: {
            handler(){
                this.setRenderData();
                this.setCurrentData();
            },
            deep: true,
            immediate: true
        },
        renderData: {
            handler(){
                this.renderDataChange();
            },
            deep: true
        },
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
