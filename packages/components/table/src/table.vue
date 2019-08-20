<template>
    <div class="cl-table">
        <div class="cl-table__wrap">
            <div class="cl-table__head">
                <ClTableHead :columns="cloneColumns" :data="data"></ClTableHead>
            </div>
            <div class="cl-table__body">
                <ClTableBody :columns="cloneColumns" :data="data"></ClTableBody>
            </div>
            <div class="cl-table__footer"></div>
        </div>
    </div>
</template>

<script>
    import ClTableHead from './table-head.vue'
    import ClTableBody from './table-body.vue'
    import { randomStr} from "./util";
    import { deepClone} from "../../../utils/global";

    export default {
    name: "ClTable",
    props:{
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
      }
    },
    data() {
      const setColumnsId = this.setColumnsId(this.columns);
      return {
        cloneColumns: this.deepColumns(setColumnsId),
        cloneData: this.deepColumns(this.data),
      }
    },
    computed: {},
    components: {
      ClTableHead,
      ClTableBody
    },
    created() {
    },
    mounted() {
    },
    methods: {
      setColumnsId(columns){
        return columns.map(item=>{
          item.__id = randomStr(6);
          return item;
        })
      },
      deepColumns(columns){
        let col = deepClone(columns);
        col = this.filterNoShowColumns(col);
        return col;
      },
      filterNoShowColumns(columns){
        return columns.filter(item=>{
          return !item.noShow
        })
      }
    }
  }
</script>
