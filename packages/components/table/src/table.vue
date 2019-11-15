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
                 :class="[
                    (!cloneData || !cloneData.length) && 'cl-table__body-empty'
                 ]"
                 ref="body"
                 :style="bodyWrapStyle"
                 @scroll="bodyScrollHandle">
                <cl-table-body ref='tbody'
                               :columns="bodyCloneColumns"
                               :colgroup-columns="bodyCloneColumns"
                               :data="cloneData"
                               :columns-width="columnsWidth"
                               :body-style="bodyStyle"></cl-table-body>
            </div>
            <cl-table-fixed v-if='isFixedLeft'
                            fixed="left"
                            ref="fixedTableLeft"
                            :head-columns="headCloneColumns"
                            :body-columns="bodyCloneColumns"
                            :colgroup-columns="bodyCloneColumns"
                            :data="cloneData"
                            :columns-width="columnsWidth"
                            :head-style="headStyle"
                            :body-style="bodyStyle"
                            :bodyWrapStyle="bodyWrapStyle"></cl-table-fixed>
            <cl-table-fixed v-if='isFixedRight'
                            fixed="right"
                            ref="fixedTableRight"
                            :head-columns="fixedRightHeadCloneColumns"
                            :body-columns="fixedRightBodyCloneColumns"
                            :colgroup-columns="fixedRightBodyCloneColumns"
                            :data="cloneData"
                            :columns-width="columnsWidth"
                            :head-style="headStyle"
                            :bodyWrapStyle="bodyWrapStyle"
                            :body-style="bodyStyle"></cl-table-fixed>
            <div class="cl-table__footer" ref="footer"></div>
        </div>
    </div>
</template>

<script>
    import ClTableHead from './table-head.vue'
    import ClTableBody from './table-body.vue'
    import ClTableFixed from './table-fixed'
    import {
        randomStr,
        getAllColumns,
        setGroupTableHead,
        setCloneColumnsDefaultProps,
        removeBodyColumnsHaveChildren,
        sortFixedColumns,
        emitDataFormat} from "./util";
    import {deepClone, getScrollBarWidth} from "../../../utils/global";
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
                default: false
            },
            stripe: Boolean,//斑马纹
            height: [String, Number],//设置高度后head固定
            emptyText: String,
        },
        data() {
            return {
                commonColumns: [],
                columnRows: [],
                cloneData: [],
                commonData: [],
                statusData: {},//状态数据map 包括checked hover 等状态
                columnsWidth: {},
                observer: null,
                tableWidth: '',
                bodyHeight: '',
                showHorizontalScrollBar: false,
                showVerticalScrollBar: false,
                scrollBarWidth: getScrollBarWidth(),
                isFixedLeft: false,
                isFixedRight: false,
                ready: false,
            }
        },
        computed: {
            localEmptyText(){
                return this.emptyText ? this.emptyText : '暂无数据';
            },
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
                if(this.tableWidth) style.width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) + 'px';
                return style;
            },
            bodyWrapStyle(){
                let style = {};
                if(this.height){
                    style = {
                        height: this.bodyHeight + 'px',
                    }
                }
                return style
            },
            bodyCloneColumns(){
                const commonColumns = sortFixedColumns(this.commonColumns);
                return removeBodyColumnsHaveChildren(commonColumns);
            },
            headCloneColumns(){
                const commonColumns = sortFixedColumns(this.commonColumns);
                return setGroupTableHead(commonColumns);
            },
            fixedRightBodyCloneColumns(){
                const fixedRightCommonColumns = sortFixedColumns(this.commonColumns, 'right');
                return removeBodyColumnsHaveChildren(fixedRightCommonColumns);
            },
            fixedRightHeadCloneColumns(){
                const fixedRightCommonColumns = sortFixedColumns(this.commonColumns, 'right');
                return setGroupTableHead(fixedRightCommonColumns);
            }
        },
        components: {
            ClTableHead,
            ClTableBody,
            ClTableFixed
        },
        created() {
        },
        mounted() {
            this.handleResize();
            this.$nextTick(()=>{
                this.ready = true;
            });
            on(window, 'resize', this.handleResize);
            on(this.$refs.header, 'mousewheel', this.mouseScroll);
            on(this.$refs.header, 'DOMMouseScroll', this.mouseScroll);
            this.observer = elementResizeDetectorMaker();
            this.observer.listenTo(this.$el, this.handleResize);
        },
        beforeDestroy() {
            this.observer && this.observer.removeListener(this.$el, this.handleResize);
            off(window, 'resize', this.handleResize);
            off(this.$refs.header, 'mousewheel', this.mouseScroll);
            off(this.$refs.header, 'DOMMouseScroll', this.mouseScroll);
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
                    if(updateKeys.length){
                        updateKeys.forEach(updateKey=>{
                            if(['__isDisabled', '__isChecked'].includes(updateKey)){
                                //更新所有项的值
                                if(updateKey === '__isDisabled'){
                                    item[updateKey] = obj[updateKey] || false;
                                }else if(!item.__isDisabled){
                                    item[updateKey] = obj[updateKey] || false;
                                }
                            }else if(filterIndexs.includes(item.__index)){
                                //只更新指定项的值
                                item[updateKey] = obj[updateKey] || false;
                            }
                        });
                    }else{
                        item.__isChecked = item.isChecked || false;
                        item.__isDisabled = item.isDisabled || false;
                        item.__isHover = false;
                        item.__isStripe = this.stripe || false;
                        item.__index = index;//行的唯一标志
                    }
                });
                this.cloneData = cloneData;
                this.commonData = deepClone(cloneData);
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
                let noMaxWidthAndWidthColumns = [];//没有设置最大宽的列
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
                    if(!itemCol.width && !itemCol.maxWidth){
                        noMaxWidthAndWidthColumns.push(itemCol);
                        !itemCol.minWidth && noWidthAndMaxWidthAndminWidthColumns.push(itemCol);
                    }
                    if(itemCol.width || itemCol.minWidth){
                        let itemWidth = itemCol.width ? parseFloat(itemCol.width) : 0;
                        let itemMinWidth = itemCol.minWidth ? parseFloat(itemCol.minWidth) : 0;
                        unusableWidth += Math.max(itemWidth, itemMinWidth)
                    }
                    itemCol.__width = null;
                });

                usableWidth = tableWidth - unusableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);


                let usableLength = noWidthColumns.length;
                let avgColumnsWidth = 0;
                if(usableWidth > 0 && usableLength > 0){
                    avgColumnsWidth = usableWidth / usableLength;
                }
                // console.log(tableWidth,'tableWidthtableWidth',usableWidth,avgColumnsWidth)

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
                            usableWidth -= width;
                            usableLength--;
                        }else{
                            if(colums.minWidth){
                                width = parseFloat(colums.minWidth + avgColumnsWidth);
                            }
                            if(colums.maxWidth){
                                width = Math.min(width, parseFloat(colums.maxWidth));
                            }
                            usableWidth -= width;
                            usableLength--;
                        }
                    }

                    width = Math.floor(width);
                    colums.__width = width;
                    columsWidths[colums.__id] = {
                        width: width
                    }
                }


                // 如果还有剩余的宽度给没有设置width和maxWidth的列分配
                if(usableWidth > 0){
                    usableLength = noMaxWidthAndWidthColumns.length;
                    if(usableLength > 0) avgColumnsWidth = parseInt(usableWidth / usableLength);
                    for (let i = 0; i < usableLength; i++){
                        let colums = noMaxWidthAndWidthColumns[i];
                        let width = colums.__width + avgColumnsWidth;

                        colums.__width = width;
                        columsWidths[colums.__id] = {
                            width: width
                        }
                    }
                }

                if(usableWidth > 0){
                    usableLength = this.bodyCloneColumns.length;
                    if(usableLength > 0) avgColumnsWidth = parseInt(usableWidth / usableLength);
                    for (let i = 0; i < usableLength; i++){
                        let colums = this.bodyCloneColumns[i];
                        let width = colums.__width + avgColumnsWidth;

                        colums.__width = width;
                        columsWidths[colums.__id] = {
                            width: width
                        }
                    }
                }

                this.tableWidth = this.bodyCloneColumns.map(col => col.__width).reduce((a, b) => a + b, 0);
                this.columnsWidth = columsWidths;
                this.fixedHead();
            },
            // selection类型时checbox选择值变化
            checkboxChange(row){
                let allCheckedData = this.getStatusPropsEqTrueRows('__isChecked');
                this.$emit(row.__isChecked ? 'select' : 'cancel-select', emitDataFormat(allCheckedData), emitDataFormat(row));
                this.$emit('selection-change', emitDataFormat(allCheckedData));
            },
            // 获取指定状态为true的项
            getStatusPropsEqTrueRows(status){
                status = Array.isArray(status) ? status : [status];
                let resultData = [];
                this.cloneData.forEach(item=>{
                    status.forEach(itemStatus=>{
                        if(item[itemStatus]) resultData.push(item);
                    });
                });
                return resultData;
            },
            // 全选状态发生变化
            allCheckboxChange(column, value){
                this.setCloneDataDefaultProps({
                    __isChecked: value
                });
                let allCheckedData = this.getStatusPropsEqTrueRows('__isChecked');
                this.$emit(value ? 'select-all' : 'cancel-select-all', emitDataFormat(allCheckedData));
                this.$emit('selection-change', emitDataFormat(allCheckedData));
            },
            //固定头部的计算
            fixedHead(){
                if(this.height){
                    let headerHeight = this.$refs.header.offsetHeight;
                    let footerHeight = this.$refs.footer.offsetHeight;

                    this.bodyHeight = parseInt(this.height) - headerHeight - footerHeight;
                }
                this.fixedBody();
            },
            fixedBody(){
                let bodyWidth = this.$refs.body.offsetWidth;
                let bodyHeight = this.$refs.body.offsetHeight;
                let tbodyWidth = this.$refs.tbody.$el.offsetWidth;
                let tbodyHeight = this.$refs.tbody.$el.offsetHeight;
                this.showHorizontalScrollBar = tbodyWidth > bodyWidth;
                this.showVerticalScrollBar = tbodyHeight > bodyHeight;
            },
            bodyScrollHandle(event){
                this.$refs.header.scrollLeft = event.target.scrollLeft;
                this.$refs.fixedTableLeft.$refs.fixedBody.scrollTop = event.target.scrollTop;
                this.$refs.fixedTableRight.$refs.fixedBody.scrollTop = event.target.scrollTop;
            },
            mouseScroll(event){
                const deltaX = event.deltaX;
                const body = this.$refs.body;

                if (deltaX > 0) {
                    body.scrollLeft = body.scrollLeft + 10;
                } else {
                    body.scrollLeft = body.scrollLeft - 10;
                }
            },
            sortHandle(column, type){
                const key = column.key;
                const __id = column.__id;
                const sortOrder = column.sortOrder;
                let commonColumns = deepClone(this.commonColumns);
                commonColumns.forEach(item=>{
                    if(item.__id === __id){
                        item.__sortOrder = type;
                    }else if(item.__sortOrder){
                        item.__sortOrder = true;//把其他排序清除
                    }
                });
                if(type !== 'remote' && sortOrder !== 'remote'){
                    if(type === 'ascend' || type === 'descend'){
                        let cloneData = deepClone(this.cloneData);
                        cloneData.sort((a, b)=>{
                            if(type === 'ascend'){
                                return a[key] > b[key] ? 1 : -1;
                            }else if(type === 'descend'){
                                return a[key] < b[key] ? 1 : -1;
                            }
                        });
                        this.cloneData = cloneData;
                    }else{
                        this.cloneData = deepClone(this.commonData);
                    }
                }
                this.commonColumns = commonColumns;
                this.$emit('sort-change', emitDataFormat(column), type);
            },
            filterHandle(type, column, filterItemValue){
                const __id = column.__id;
                let allFilterColumns = [];
                let commonColumns = deepClone(this.commonColumns);
                commonColumns.forEach(item=>{
                    if(item.__id === __id){
                        item.__filterCheckedValues = filterItemValue;
                        if(filterItemValue.length){
                            item.__isFilterChecked = true;
                        }else{
                            item.__isFilterChecked = false;
                        }
                    }
                    if(item.__isFilterChecked && item.__filterCheckedValues.length){
                        allFilterColumns.push({
                            column: emitDataFormat(item),
                            selectedValue: item.filterMultiple ? item.__filterCheckedValues : item.__filterCheckedValues[0],
                        });
                    }
                });
                this.commonColumns = commonColumns;
                this.$emit('filter-change', emitDataFormat(column), type !== 'single' ? filterItemValue : filterItemValue[0], allFilterColumns);
            }
        },
        watch: {
            data: {
                handler(newVal){
                    this.cloneData = deepClone(newVal);
                    this.commonData = deepClone(newVal);
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
                    this.commonColumns = setCloneColumnsDefaultProps(setColumnsId);
                    this.commonColumns.forEach(item=>{
                        if(item.fixed && item.fixed === 'left'){
                            this.isFixedLeft = true;
                        }else if(item.fixed && item.fixed === 'right'){
                            this.isFixedRight = true;
                        }
                    });

                    this.allColumns = getAllColumns(setColumnsId);

                    this.handleResize();
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
