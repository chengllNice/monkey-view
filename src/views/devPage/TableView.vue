<template>
    <div class="TableView">
        <p>基础--无数据</p>

        <ClTable :columns="columns"
                 :data="data"
                 stripe
                 border
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

        <!--<h4>基础</h4>-->
        <!--<ClTable :columns="columnsBase"-->
                 <!--:data="dataBase"-->
                 <!--:row-class-name="setRowClassName"-->
                 <!--stripe-->
                 <!--height="400px"-->
                 <!--@row-click="rowClick"-->
                 <!--@cell-click="cellClick"-->
                 <!--@row-dbclick="rowDbClick"-->
                 <!--@cell-dbclick="cellDbClick"-->
                 <!--@head-click="headClick"-->
                 <!--@filter-change="filterChange"-->
                 <!--@select="selectChange"-->
                 <!--@select-all="selectAllChange"-->
                 <!--@cancel-select-all="cancelSelectAllChange"-->
                 <!--@cancel-select="cancelSelectChange"-->
                 <!--@selection-change="selectionChange">-->
            <!--<template slot="operation" slot-scope="data">-->
                <!--<cl-button type="danger" size="mini" @click="delClick(data)">DEL</cl-button>-->
            <!--</template>-->
            <!--<template slot="operationHead" slot-scope="data">-->
                <!--{{data.column.title}}-->
            <!--</template>-->
            <!--<template slot="expand" slot-scope="data">-->
                <!--{{data}}-->
                <!--<cl-list :split="false">-->
                    <!--<cl-list-item>{{data.row.id}}</cl-list-item>-->
                    <!--<cl-list-item>{{data.row.name}}</cl-list-item>-->
                    <!--<cl-list-item>{{data.row.age}}</cl-list-item>-->
                    <!--<cl-list-item>{{data.row.grade}}</cl-list-item>-->
                <!--</cl-list>-->
            <!--</template>-->
        <!--</ClTable>-->

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
                        type: 'expand',
                        key: 'expand',
                    },
                    {
                        type: 'index',
                        key: 'index',
                    },
                    {
                        type: 'selection',
                        key: 'selection',
                    },
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
                    },
                    {
                        key: 'company',
                        title: 'company'
                    },
                    {
                        key: 'operation',
                        title: 'operation',
                        slot: 'operation',
                    }
                ],
                dataBase: [],
                columns: [
                    {
                        key: 'name',
                        title: '姓名',
                    },
                    {
                        key: 'email',
                        title: '邮箱'
                    },
                    {
                        key: 'phone',
                        title: '手机号'
                    },
                    {
                        key: 'create_date',
                        title: '创建日期',
                        ellipsis: true
                    }
                ],
                data: [],
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setDataBase();
            this.data = [];
            for (let i = 0; i < 20; i++){
                this.data.push({
                    name: 'Name' + i,
                    email: 'Email' + i,
                    phone: 'Phone' + i,
                    create_date: '2018-01-' + i
                })
            }
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
                      isChecked: i === 1,
                      isDisabled: i === 1,
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
            },
            filterChange(column, filterItem, allFilterColumns){
                console.log(column,filterItem, allFilterColumns, 'filterChange')
            },
            rowClick(row, column){
                console.log(row, column, 'rowClick')
            },
            cellClick(row, column){
                console.log(row, column, 'cellClick')
            },
            rowDbClick(row, column){
                console.log(row, column, 'rowDbClick')
            },
            cellDbClick(row, column){
                console.log(row, column, 'cellDbClick')
            },
            headClick(column){
                console.log(column, 'headClick')
            },
            setRowClassName(row, index){
                return index === 1 ? 'bbb' : '';
            }
        }
    }
</script>
