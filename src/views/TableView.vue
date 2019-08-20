<template>
    <div class="TableView">
        <p>基础</p>
        <ClTable :columns="columnsBase" :data="dataBase"></ClTable>
    </div>
</template>

<script>
  export default {
    name: "TableView",
    data() {
      return {
        columnsBase: [
          {
            key: 'id',
            title: 'id',
          },
          {
            key: 'name',
            title: 'name',
          },
          {
            key: 'age',
            title: 'age',
          },
          {
            key: 'grade',
            title: 'grade',
          }
        ],
        dataBase: [
          {
            id: '0',
            name: 'name0',
            age: 'age0',
            grade: 'grade0'
          },
          {
            id: '1',
            name: 'name1',
            age: 'age1',
            grade: 'grade1'
          }
        ]
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
