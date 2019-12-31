<template>
    <div :class="[
            'cl-table-fixed',
            fixed && `cl-table-fixed--${fixed}`
         ]"
         :style="styleObj">
        <div class="cl-table-fixed__content">
            <div class="cl-table-fixed__head" ref="fixedHeader" v-show="showHeader">
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


        <div class="cl-table-fixed__right-col" :style="fixedRightStyle" v-if="fixed === 'right' && $parent.showVerticalScrollBar"></div>
    </div>
</template>

<script>
    import ClTableHead from './table-head.vue'
    import ClTableBody from './table-body.vue'
    import { fixedIds} from "./util";
    import { getScrollBarWidth} from "../../../utils/global";
    import { on, off} from "../../../utils/dom";

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
            showHeader: Boolean
        },
        data(){
            return {
                headerHeight: 0,
            }
        },
        computed: {
            styleObj(){
                let style = {};
                let width = 0;
                let fixedId = fixedIds(this.bodyColumns, this.fixed);
                Object.keys(this.columnsWidth).forEach(key=>{
                    if(fixedId.includes(key)){
                        width += this.columnsWidth[key].width
                    }
                });
                style.width = width + 'px';
                if(this.fixed === 'right' && this.$parent.showVerticalScrollBar){
                    style.right = this.$parent.scrollBarWidth + 'px';
                }
                return style;
            },
            fixedBodyWrapStyle(){
                let style = {};
                if(this.bodyWrapStyle && this.bodyWrapStyle.height) {
                    let height = 0;
                    if(this.$parent.showHorizontalScrollBar){
                        height = getScrollBarWidth();
                    }
                    style = {
                        height: parseInt(this.bodyWrapStyle.height) - height + 'px'
                    }
                }
                return style
            },
            fixedRightStyle(){
                return {
                    width: this.$parent.scrollBarWidth + 'px',
                    height: this.headerHeight - 1 + 'px',
                    right: -this.$parent.scrollBarWidth + 'px',
                };
            }
        },
        components: {
            ClTableHead,
            ClTableBody
        },
        mounted() {
            on(this.$refs.fixedBody, 'mousewheel', this.mouseScroll);
            on(this.$refs.fixedBody, 'DOMMouseScroll', this.mouseScroll);
        },
        destroyed(){
            off(this.$refs.fixedBody, 'mousewheel', this.mouseScroll);
            off(this.$refs.fixedBody, 'DOMMouseScroll', this.mouseScroll);
        },
        methods: {
            mouseScroll(event){
                let deltaY = event.deltaY;
                if(!deltaY && event.detail){
                    deltaY = event.detail * 40;
                }
                if(!deltaY && event.wheelDeltaY){
                    deltaY = -event.wheelDeltaY;
                }
                if(!deltaY && event.wheelDelta){
                    deltaY = -event.wheelDelta;
                }
                if(!deltaY) return;
                const body = this.$parent.$refs.body;
                const currentScrollTop = body.scrollTop;
                if (deltaY < 0 && currentScrollTop !== 0) {
                    event.preventDefault();
                }
                if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
                    event.preventDefault();
                }
                //body.scrollTop += deltaY;
                let step = 0;
                let timeId = setInterval(()=>{
                    step += 5;
                    if(deltaY>0){
                        body.scrollTop += 2;
                    }
                    else{
                        body.scrollTop -= 2;
                    }
                    if(step >= Math.abs(deltaY)){
                        clearInterval(timeId);
                    }
                }, 5);
            }
        },
        watch: {
            headColumns: {
                handler(){
                    this.headerHeight = this.$refs.fixedHeader && this.$refs.fixedHeader.offsetHeight;
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
