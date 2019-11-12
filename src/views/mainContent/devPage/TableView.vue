<template>
    <div class="TableView">
        <p>基础--无数据</p>

        <ClTable :columns="columnsBase"
                 :data="dataBaseEmpty"
                 stripe
                 @select="selectChange"
                 @select-all="selectAllChange"
                 @cancel-select-all="cancelSelectAllChange"
                 @cancel-select="cancelSelectChange"
                 @selection-change="selectionChange">
            <template slot="operation" slot-scope="data">
                <cl-button type="danger" size="mini" @click="delClick(data)">DEL</cl-button>
            </template>
        </ClTable>

        <h4>基础</h4>
        <ClTable :columns="columnsBase"
                 :data="dataBase"
                 stripe
                 height="400px"
                 @select="selectChange"
                 @select-all="selectAllChange"
                 @cancel-select-all="cancelSelectAllChange"
                 @cancel-select="cancelSelectChange"
                 @selection-change="selectionChange">
            <template slot="operation" slot-scope="data">
                <cl-button type="danger" size="mini" @click="delClick(data)">DEL</cl-button>
            </template>
        </ClTable>

    </div>
</template>

<script>
    export default {
        name: "TableView",
        data() {
            return {
                dataBaseEmpty: [],
                columnsBase: [
                    {
                        type: 'index',
                        width: 60,
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        key: 'id',
                        title: 'id',
                        align: 'right',
                        fixed: 'left',
                        width: 200,
                        sortOrder: true,
                    },
                    {
                        key: 'name',
                        title: 'name',
                        width: 300,
                        // tooltip: true,
                    },
                    {
                        key: 'age',
                        title: 'age',
                        width: 300,
                        hide: true,
                    },
                    {
                        key: 'grade',
                        title: 'grade',
                        width: 300,
                    },
                    {
                        key: 'company',
                        title: 'company',
                        children: [
                            {
                                key: 'company1',
                                width: 100,
                                title: 'company1',
                            },
                            {
                                key: 'company2',
                                width: 100,
                                title: 'company2',
                            },
                        ]
                    },
                    {
                        key: 'operation',
                        title: 'operation',
                        slot: 'operation',
                        fixed: 'right',
                        width: 100
                    }
                ],
                dataBase: []
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setDataBase();
        },
        methods: {
            setDataBase(){
              for (let i = 0; i < 20; i++){
                  this.dataBase.push({
                      id: i,
                      name: 'name' + i,
                      age: 'age' + i,
                      grade: 'grade1' + i,
                      grade1: 'grade1-children1' + i,
                      grade2: 'grade1-children2' + i,
                      grade3: 'grade1-children3' + i,
                  })
              }
            },
            selectionChange(rows){
                console.log('selectionChange', rows);
            },
            selectChange(rows, row){
                console.log('selectChange', rows, row);
            },
            cancelSelectChange(rows, row){
                console.log('cancelSelectChange', rows, row);
            },
            selectAllChange(rows){
                console.log('selectAllChange', rows);
            },
            cancelSelectAllChange(rows){
                console.log('cancelSelectAllChange', rows);
            },
            delClick(data){
                console.log(data,'ddd')
            }
        }
    }
</script>
