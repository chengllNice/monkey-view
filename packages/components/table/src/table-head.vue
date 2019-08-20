<template>
    <table cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(columns, index) in columns" :key="columns.__id">
        </colgroup>
        <thead>
            <tr v-for="(cols, rowIndex) in headRow" :key="rowIndex">
                <th v-for="(columns, index) in cols" :key="columns.__id">
                    <div class="cl-table-cell cl-table-head__cell">
                        <template>
                            <span>{{columns.title}}</span>
                            <!--<ClTooltip placement="bottom">-->
                                <!--<div slot="content">-->
                                    <!--<span>{{columns.title}}</span>-->
                                <!--</div>-->
                            <!--</ClTooltip>-->
                        </template>
                    </div>
                </th>
            </tr>
        </thead>
    </table>
</template>

<script>
    import ClTooltip from '../../tooltip/src/tooltip.vue'
  export default {
    name: "ClTableHead",
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
    computed: {
      headRow(){
        return [this.columns]
      }
    },
    components: {
      ClTooltip
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
