<template>
    <div class="dev-table">
        <p>基础--无数据</p>

        <Table :columns="columns"
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
                <Button type="danger" size="mini" @click="delClick(data)">DEL</Button>
            </template>
        </Table>

        <h4>基础</h4>
        <Table :columns="columnsBase"
               :data="dataBase"
               :row-class-name="setRowClassName"
               stripe
               height="400px"
               @row-click="rowClick"
               @cell-click="cellClick"
               @row-dbclick="rowDbClick"
               @cell-dbclick="cellDbClick"
               @head-click="headClick"
               @filter-change="filterChange"
               @select="selectChange"
               @select-all="selectAllChange"
               @cancel-select-all="cancelSelectAllChange"
               @cancel-select="cancelSelectChange"
               @selection-change="selectionChange">
            <template slot="operation" slot-scope="data">
                <Button type="danger" size="mini" @click="delClick(data)">DEL</Button>
            </template>
            <template slot="operationHead" slot-scope="data">
                {{data.column.title}}
            </template>
            <template slot="expand" slot-scope="data">
                {{data}}
                <List :split="false">
                    <ListItem>{{data.row.id}}</ListItem>
                    <ListItem>{{data.row.name}}</ListItem>
                    <ListItem>{{data.row.age}}</ListItem>
                    <ListItem>{{data.row.grade}}</ListItem>
                </List>
            </template>
        </Table>

        <h4>多行多列</h4>
        <Table :data="spanMethodData" :columns="spanMethodColumns" border :span-method="spanMethod"></Table>

        <!--        <h4>自定义筛选(存在问题)-&#45;&#45;columns中的filterSlot属性暂时删除</h4>-->
        <!--        <p>| filterSlot | String | 自定义筛选的下拉内容 | - |</p>-->
        <!--        <Table :data="filterData" :columns="filterColumns" stripe border>-->
        <!--            <template slot="date">-->
        <!--                <DatePicker v-model="filterDate" only-show-pane @change="filterDateChange">-->
        <!--                    <template slot="paneFooter"><Button size="small" @click="handleClear">清除</Button></template>-->
        <!--                </DatePicker>-->
        <!--            </template>-->
        <!--        </Table>-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataBaseEmpty: [],
                columnsBase: [
                    {
                        type: 'expand',
                        key: 'expand'
                    },
                    {
                        type: 'index',
                        key: 'index'
                    },
                    {
                        type: 'selection',
                        key: 'selection'
                    },
                    {
                        key: 'id',
                        title: 'id'
                    },
                    {
                        key: 'name',
                        title: 'name'
                    },
                    {
                        key: 'age',
                        title: 'age'
                    },
                    {
                        key: 'grade',
                        title: 'grade'
                    },
                    {
                        key: 'company',
                        title: 'company'
                    },
                    {
                        key: 'operation',
                        title: 'operation',
                        slot: 'operation'
                    }
                ],
                dataBase: [],
                columns: [
                    {
                        key: 'name',
                        title: '姓名'
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

                filterDate: '',
                filterColumns: [
                    {
                        key: 'name',
                        title: '姓名'
                    },
                    {
                        key: 'age',
                        title: '年龄'
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
                        key: 'department',
                        title: '部门'
                    },
                    {
                        key: 'address',
                        title: '地址'
                    },
                    {
                        key: 'create_date',
                        title: '创建日期',
                        filterSlot: 'date',
                        placement: 'bottom-end'
                    }
                ],
                filterData: [],
                filterAllData: [],

                spanMethodData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                spanMethodColumns: [
                    {
                        title: 'Date',
                        key: 'date'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ]
            }
        },
        mounted() {
            this.setDataBase();
            this.data = [];
            for (let i = 0; i < 20; i++) {
                this.data.push({
                    name: 'Name' + i,
                    email: 'Email' + i,
                    phone: 'Phone' + i,
                    create_date: '2018-01-' + i
                })
            }

            this.filterDataInit();
        },
        methods: {
            spanMethod({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0 && columnIndex === 0) {
                    return [1, 2];
                } else if (rowIndex === 0 && columnIndex === 1) {
                    return [0, 0];
                }
                if (rowIndex === 2 && columnIndex === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else if (rowIndex === 3 && columnIndex === 0) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            },
            filterDataInit() {
                this.filterData = [];
                this.filterAllData = [];

                const departments = ['前端部', '运维部', '测试部', '数据库研发中心'];
                for (let i = 0; i < 5; i++) {
                    const date = new Date();
                    date.setDate(i);
                    this.filterAllData.push({
                        name: 'Name' + i,
                        age: 20 + parseInt(i),
                        email: 'Email' + i,
                        phone: 'Phone' + i,
                        department: '业务平台部/研发部/' + departments[i % 4],
                        address: '北京市海淀区上地三街西口',
                        performance: '10000' + i,
                        create_date: date.toDateString()
                    })
                }
                this.filterData = this.filterAllData;
            },
            filterDateChange(value) {
                if (!value) {
                    this.filterData = this.filterAllData;
                    return;
                }
                const selectDate = new Date(value);
                this.filterData = this.filterAllData.filter(item => {
                    const t = new Date(item.create_date);
                    return t.getTime() === selectDate.getTime();
                })
            },
            handleClear() {
                this.filterDate = '';
            },
            setDataBase() {
                for (let i = 0; i < 20; i++) {
                    this.dataBase.push({
                        id: i,
                        name: 'name' + i,
                        age: 'age' + i,
                        grade: 'grade1' + i,
                        grade1: 'grade1-children1' + i,
                        grade2: 'grade1-children2' + i,
                        grade3: 'grade1-children3' + i,
                        isChecked: i === 1,
                        isDisabled: i === 1
                    })
                }
            },
            selectionChange(rows) {
                console.log('selectionChange', rows);
            },
            selectChange(rows, row) {
                console.log('selectChange', rows, row);
            },
            cancelSelectChange(rows, row) {
                console.log('cancelSelectChange', rows, row);
            },
            selectAllChange(rows) {
                console.log('selectAllChange', rows);
            },
            cancelSelectAllChange(rows) {
                console.log('cancelSelectAllChange', rows);
            },
            delClick(data) {
                console.log(data, 'ddd')
            },
            filterChange(column, filterItem, allFilterColumns) {
                console.log(column, filterItem, allFilterColumns, 'filterChange')
            },
            rowClick(row, column) {
                console.log(row, column, 'rowClick')
            },
            cellClick(row, column) {
                console.log(row, column, 'cellClick')
            },
            rowDbClick(row, column) {
                console.log(row, column, 'rowDbClick')
            },
            cellDbClick(row, column) {
                console.log(row, column, 'cellDbClick')
            },
            headClick(column) {
                console.log(column, 'headClick')
            },
            setRowClassName(row, index) {
                return index === 1 ? 'bbb' : '';
            }
        }
    }
</script>
