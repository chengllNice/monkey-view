<template>
    <div :class="[
            'cl-table',
            border && 'cl-table--border',
            !ready && 'cl-table--hide',
         ]"
         :style="tableStyle">
        <div class="cl-table__wrap">
            <div class="cl-table__head" ref="header">
                <cl-table-head :columns="headCloneColumns"
                               :colgroup-columns="bodyCloneColumns"
                               :data="cloneData"
                               :columns-width="columnsWidth"
                               :head-style="headStyle"></cl-table-head>
            </div>
            <div class="cl-table__body"
                 ref="body"
                 :style="bodyWrapStyle">
                <cl-table-body :columns="bodyCloneColumns"
                               :colgroup-columns="bodyCloneColumns"
                               :data="cloneData"
                               :columns-width="columnsWidth"
                               :body-style="bodyStyle"></cl-table-body>
            </div>
            <div class="cl-table__footer" ref="footer"></div>
        </div>
    </div>
</template>

<script>
    import ClTableHead from './table-head.vue'
    import ClTableBody from './table-body.vue'
    import {
        randomStr,
        getAllColumns,
        setGroupTableHead,
        setCloneColumnsDefaultProps,
        removeBodyColumnsHaveChildren} from "./util";
    import {deepClone} from "../../../utils/global";
    import {on, off} from "../../../utils/dom";
    import elementResizeDetectorMaker from 'element-resize-detector';


    export default {
        name: "ClTable",
        provide(){
          return {
              tableRoot: this
          }
        },
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            border: {
                type: Boolean,
                default: true
            },
            stripe: Boolean,//斑马纹
            height: [String, Number],//设置高度后head固定
        },
        data() {
            return {
                bodyCloneColumns: [],//去除带有children的列
                columnRows: [],
                headCloneColumns: [],
                cloneData: deepClone(this.data),
                statusData: {},//状态数据map 包括checked hover 等状态
                columnsWidth: {},
                observer: null,
                tableWidth: '',
                bodyHeight: '',
                ready: false,
            }
        },
        computed: {
            tableStyle(){
                let style = {};
                if(this.height) style = {height: parseFloat(this.height) + 'px'};
                return style;
            },
            commonStyle(){
                let style = {};
                this.tableWidth && (style = {width: this.tableWidth + 'px'});
                return style;
            },
            headStyle(){
                let style = {};
                if(this.tableWidth) style.width = this.tableWidth + 'px';
                return style;
            },
            bodyStyle(){
                let style = {};
                if(this.tableWidth) style.width = this.tableWidth + 'px';
                return style;
            },
            bodyWrapStyle(){
                let style = {};
                if(this.height){
                    style = {
                        height: this.bodyHeight + 'px',
                        overflow: 'auto'
                    }
                }
                return style
            }
        },
        components: {
            ClTableHead,
            ClTableBody
        },
        created() {
        },
        mounted() {
            this.handleResize();
            this.$nextTick(()=>{
                this.ready = true;
            });
            on(window, 'resize', this.handleResize);
            this.observer = elementResizeDetectorMaker();
            this.observer.listenTo(this.$el, this.handleResize);
        },
        beforeDestroy() {
            this.observer && this.observer.removeListener(this.$el, this.handleResize);
        },
        methods: {
            setColumnsId(columns) {
                return columns.map((item, index) => {
                    item.__id = randomStr(6) + '-' + index;//列的唯一标志
                    if(item.children) this.setColumnsId(item.children);
                    return item;
                })
            },
            // 给data设置默认属性或者指定值
            setCloneDataDefaultProps(obj, filterIndexs = []){
                let updateKeys = Object.keys(obj || {});
                let cloneData = deepClone(this.cloneData);
                cloneData.forEach((item, index)=>{
                    item.defaultStatusProps = item.defaultStatusProps || {};
                    if(updateKeys.length){
                        updateKeys.forEach(updateKey=>{
                            if(['isDisabled', 'isChecked'].includes(updateKey)){
                                if(updateKey === 'isDisabled'){
                                    item.defaultStatusProps[updateKey] = obj[updateKey] || false;
                                }else if(!item.defaultStatusProps.isDisabled){
                                    item.defaultStatusProps[updateKey] = obj[updateKey] || false;
                                }
                            }else if(filterIndexs.includes(item.__index)){
                                item[updateKey] = obj[updateKey] || false;
                            }
                        });
                    }else{
                        item.defaultStatusProps.isChecked = item.defaultStatusProps.isChecked || false;
                        item.defaultStatusProps.isDisabled = item.defaultStatusProps.isDisabled || false;
                        item.__isHover = false;
                        item.__isStripe = this.stripe || false;
                        item.__index = index;//行的唯一标志
                    }
                });
                this.cloneData = cloneData;
            },
            // 设置列宽度及table宽度
            handleResize(){
                if(!this.$el) return;
                let tableWidth = this.$el.offsetWidth - 1;
                let columsWidths = {};
                let usableWidth = 0;//可用的宽度
                let unusableWidth = 0;//不可用的宽度
                let noWidthColumns = [];//没有宽度的列，这些列都自动分配宽度
                let hasWidthColumns = [];//有宽度的列
                let maxWidthColumns = [];//设置最大宽的列
                let minWidthColumns = [];//设置最小宽的列
                let noWidthAndMaxWidthAndminWidthColumns = [];//没有设置宽度、最大宽、最小宽的列
                this.bodyCloneColumns.forEach(itemCol => {
                    if(itemCol.width){
                        hasWidthColumns.push(itemCol)
                    }else{
                        noWidthColumns.push(itemCol)
                    }
                    if(itemCol.minWidth){
                        minWidthColumns.push(itemCol)
                    }
                    if(itemCol.maxWidth){
                        maxWidthColumns.push(itemCol)
                    }
                    if(!itemCol.width && !itemCol.maxWidth && !itemCol.minWidth){
                        noWidthAndMaxWidthAndminWidthColumns.push(itemCol)
                    }
                    if(itemCol.width || itemCol.minWidth){
                        let itemWidth = itemCol.width ? parseFloat(itemCol.width) : 0;
                        let itemMinWidth = itemCol.minWidth ? parseFloat(itemCol.minWidth) : 0;
                        unusableWidth += Math.max(itemWidth, itemMinWidth)
                    }
                    itemCol.__width = null;
                });

                usableWidth = tableWidth - unusableWidth;
                let noWidthColumsLen = noWidthColumns.length;
                let avgColumnsWidth = 0;
                if(usableWidth > 0 && noWidthColumsLen > 0){
                    avgColumnsWidth = usableWidth / noWidthColumsLen;
                }

                // --[width] width;
                // [minWidth] avgW  & min
                // [maxWidth] avg  & max
                // --[width, minWidth] width & minWidth
                // --[width, maxWidth] width & max
                // --[minWidth, maxWidth] avg &min & max
                // --[width, minWidth, maxWidth] width & min


                for (let i = 0; i < this.bodyCloneColumns.length; i++){
                    let colums = this.bodyCloneColumns[i];
                    let width = avgColumnsWidth;
                    if(colums.__width){
                        width = colums.__width;
                    }else{
                        if(colums.width){
                            width = colums.width;
                            if(colums.minWidth){
                                width = Math.max(parseFloat(colums.width), parseFloat(colums.minWidth));
                            }
                        }else if(colums.minWidth && colums.maxWidth){
                            width = Math.min((parseFloat(colums.minWidth) + avgColumnsWidth), parseFloat(colums.maxWidth));
                        }else{
                            if(colums.minWidth){
                                width = parseFloat(colums.minWidth + avgColumnsWidth);
                            }
                            if(colums.maxWidth){
                                width = Math.min(width, parseFloat(colums.maxWidth));
                            }
                        }
                    }

                    width = Math.floor(width);
                    colums.__width = width;
                    usableWidth -= width;
                    columsWidths[colums.__id] = {
                        width: width
                    }
                }
                // console.log(usableWidth,'usableWidth',JSON.stringify(columsWidths))

                // if(usableWidth > 0){
                //     noWidthColumsLen = noWidthColumns.length;
                //     if(noWidthColumsLen > 0){
                //
                //     }
                //     for (let i = 0; i < noWidthColumsLen; i++){
                //         let noWidthCol = noWidthColumns[i];
                //
                //     }
                // }
                this.tableWidth = this.bodyCloneColumns.map(col => col.__width).reduce((a, b) => a + b, 0);
                this.columnsWidth = columsWidths;
                this.fixedHead();
            },
            // selection类型时checbox选择值变化
            checkboxChange(row){
                let allCheckedData = this.getStatusPropsEqTrueRows('isChecked');
                this.$emit(row.defaultStatusProps.isChecked ? 'select' : 'cancel-select', allCheckedData, row);
                this.$emit('selection-change', allCheckedData);
            },
            // 获取指定状态为true的项
            getStatusPropsEqTrueRows(status){
                status = Array.isArray(status) ? status : [status];
                let resultData = [];
                this.cloneData.filter(item=>{
                    status.forEach(itemStatus=>{
                        if(item.defaultStatusProps[itemStatus]) resultData.push(item);
                    });
                });
                return resultData;
            },
            // 全选状态发生变化
            allCheckboxChange(column, value){
                this.setCloneDataDefaultProps({
                    isChecked: value
                });
                let allCheckedData = this.getStatusPropsEqTrueRows('isChecked');
                this.$emit(value ? 'select-all' : 'cancel-select-all', allCheckedData);
                this.$emit('selection-change', allCheckedData);
            },
            //固定头部的计算
            fixedHead(){
                if(this.height){
                    let headerHeight = this.$refs.header.offsetHeight;
                    let footerHeight = this.$refs.footer.offsetHeight;
                    console.log(headerHeight,'headerHeight')

                    this.bodyHeight = parseInt(this.height) - headerHeight - footerHeight;
                }
            }
        },
        watch: {
            data: {
                handler(newVal){
                    this.cloneData = deepClone(newVal);
                    this.setCloneDataDefaultProps();
                    this.$nextTick(()=>{
                        this.handleResize();
                    })
                },
                deep: true,
                immediate: true
            },
            columns: {
                handler(newVal){
                    const setColumnsId = this.setColumnsId(newVal);
                    const commonColumns = setCloneColumnsDefaultProps(setColumnsId);
                    this.allColumns = getAllColumns(setColumnsId);

                    this.bodyCloneColumns = removeBodyColumnsHaveChildren(commonColumns);
                    this.headCloneColumns = setGroupTableHead(commonColumns);
                    this.handleResize();
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
