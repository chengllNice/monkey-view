<template>
    <table cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(column, index) in columns" :key="column.__id">
        </colgroup>
        <tbody>
            <template v-for="(row, index) in data">
                <ClTableTr :row="row">
                    <td v-for="(column, index) in columns" :key="column.__id">
                        <ClTableCell :row="row" :column="column"></ClTableCell>
                    </td>
                </ClTableTr>
            </template>
        </tbody>
    </table>
</template>

<script>
    import ClTableTr from './table-tr.vue'
    import ClTableCell from './table-cell.vue'
  export default {
    name: "ClTableBody",
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
    },
    data() {
      return {}
    },
    computed: {},
    components: {
      ClTableTr,
      ClTableCell
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
