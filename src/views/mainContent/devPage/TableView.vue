<template>
    <div class="TableView">
        <p>基础</p>
        <ClTable :columns="columnsBase"
                 :data="dataBase"
                 stripe
                 height="200px"
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
                columnsBase: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        key: 'id',
                        title: 'id',
                        minWidth: 60,
                        maxWidth: 100,
                        align: 'right'
                    },
                    {
                        key: 'name',
                        title: 'name',
                        tooltip: true,
                    },
                    {
                        key: 'age',
                        title: 'age',
                        hide: true,
                    },
                    {
                        key: 'grade',
                        title: 'grade',
                        children: [
                            {
                                key: 'grade1',
                                title: 'grade1',
                            },
                            {
                                key: 'grade2',
                                title: 'grade2',
                            },
                            {
                                key: 'grade3',
                                title: 'grade3',
                            }
                        ]
                    },
                    {
                        key: 'company',
                        title: 'company',
                        children: [
                            {
                                key: 'company1',
                                title: 'company1',
                            },
                            {
                                key: 'company2',
                                title: 'company2',
                                children: [
                                    {
                                        key: 'company2-1',
                                        title: 'company2-1',
                                    },
                                    {
                                        key: 'company2-2',
                                        title: 'company2-2',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        key: 'operation',
                        title: 'operation',
                        slot: 'operation',
                        width: 100
                    }
                ],
                dataBase: [
                    {
                        id: '0',
                        name: 'name0',
                        age: 'age0',
                        grade: 'grade0',
                        grade1: 'grade0-children1',
                        grade2: 'grade0-children2',
                        grade3: 'grade0-children3',
                        defaultStatusProps: {
                            isChecked: true,
                            isDisabled: true,
                        }
                    },
                    {
                        id: '1',
                        name: 'name1',
                        age: 'age1',
                        grade: 'grade1',
                        grade1: 'grade1-children1',
                        grade2: 'grade1-children2',
                        grade3: 'grade1-children3',
                    },
                    {
                        id: '2',
                        name: 'name2name2name2name2name2name2',
                        age: 'age2',
                        grade: 'grade2',
                        grade1: 'grade2-children1',
                        grade2: 'grade2-children2',
                        grade3: 'grade2-children3',
                        aa: 'aa',
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
        methods: {
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
