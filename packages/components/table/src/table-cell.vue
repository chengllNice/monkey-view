<template>
    <div class="cl-table-cell">
        <template v-if="renderType === 'normal'">
            <template v-if="column.tootip">
                <ClTooltip :content="row[column.key]">
                    <span>{{row[column.key]}}</span>
                </ClTooltip>
            </template>
            <span v-else>{{row[column.key]}}</span>
        </template>
    </div>
</template>

<script>
    import ClTooltip from '../../tooltip/src/tooltip.vue'
  export default {
    name: "ClTableCell",
    props:{
      row: {
        type: Object,
        default: function () {
          return {}
        }
      },
      column: Object
    },
    data() {
      return {
        renderType: 'normal'
      }
    },
    computed: {},
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
