<template>
    <div :class="[
            'cl-table-fixed',
            fixed && `cl-table-fixed--${fixed}`
         ]"
         :style="styleObj">
        <div class="cl-table-fixed__head">
            <cl-table-head :fixed='fixed'
                           :columns="headColumns"
                           :colgroup-columns="bodyColumns"
                           :data="data"
                           :columns-width="columnsWidth"
                           :head-style="headStyle"></cl-table-head>
        </div>
        <div class="cl-table-fixed__body" ref="fixedBody" :style="fixedBodyWrapStyle">
            <cl-table-body :fixed='fixed'
                           :columns="bodyColumns"
                           :colgroup-columns="bodyColumns"
                           :data="data"
                           :columns-width="columnsWidth"
                           :body-style="bodyStyle"></cl-table-body>
        </div>
    </div>
</template>

<script>
    import ClTableHead from './table-head.vue'
    import ClTableBody from './table-body.vue'
    import { fixedIds, sortFixedColumns} from "./util";
    import { getScrollBarWidth} from "../../../utils/global";

    export default {
        name: "ClTableFixed",
        props: {
            fixed: String,
            headColumns: Array,
            bodyColumns: Array,
            colgroupColumns: Array,
            data: Array,
            columnsWidth: Object,
            headStyle: Object,
            bodyStyle: Object,
            bodyWrapStyle: Object,
        },
        data(){
            return {
                // fixedBodyColumns: [],
                // fixedHeadColumns: []
            }
        },
        computed: {
            styleObj(){
                let width = 0;
                let fixedId = fixedIds(this.bodyColumns, this.fixed);
                Object.keys(this.columnsWidth).forEach(key=>{
                    if(fixedId.includes(key)){
                        width += this.columnsWidth[key].width
                    }
                });
                return {
                    width: width + 'px'
                };
            },
            fixedBodyWrapStyle(){
                let style = {};
                if(this.bodyWrapStyle && this.bodyWrapStyle.height) {
                    style = {
                        height: parseInt(this.bodyWrapStyle.height) - getScrollBarWidth() + 'px'
                    }
                }
                return style
            }
        },
        components: {
            ClTableHead,
            ClTableBody
        },
        mounted() {
        },
        methods: {

        },
        watch: {
            // bodyColumns: {
            //     handler(newVal){
            //         this.fixedBodyColumns = sortFixedColumns(newVal, this.fixed);
            //     },
            //     deep: true,
            //     immediate: true
            // },
            // headColumns: {
            //     handler(newVal){
            //         this.fixedHeadColumns = sortFixedColumns(newVal, this.fixed);
            //     },
            //     deep: true,
            //     immediate: true
            // }
        }
    }
</script>