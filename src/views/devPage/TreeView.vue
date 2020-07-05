<template>
    <div class="TreeView">

<!--        <h4>normal</h4>-->
<!--        <cl-tree :data="treeData" ref="tree"></cl-tree>-->


<!--        <h4>filter</h4>-->
<!--        <cl-input v-model="filterValue" @change="filterChange"></cl-input>-->
<!--        <cl-tree :data="treeData" ref="tree"></cl-tree>-->

<!--        <h4>slot</h4>-->
<!--        <cl-tree :data="treeDataLoad" :expand-click-on-node="false" ref="tree">-->
<!--            <template slot-scope="data">-->
<!--                {{data.data.label}}-->
<!--                <cl-button icon="cl-icon-plus" type="primary" size="mini" @click="add(data)"></cl-button>-->
<!--                <cl-button icon="cl-icon-remove" size="mini" @click="remove(data)"></cl-button>-->
<!--                {{data.data}}-->
<!--            </template>-->
<!--        </cl-tree>-->

<!--        <h4>renderContent</h4>-->
<!--        <cl-tree :data="treeData" :render-content="renderContent" ref="tree"></cl-tree>-->

        <h4>LoadData</h4>
        <cl-tree :data="treeDataLoad" :load-data="handleLoadData" ref="tree"></cl-tree>


<!--        <h4>checkedKeys</h4>-->
<!--        <cl-tree :data="treeData" show-checkbox check-strictly :checked-keys="checkedKeys"></cl-tree>-->

<!--        <h4>expandKeys</h4>-->
<!--        <cl-tree :data="treeData" :expand-keys="expandKeys"></cl-tree>-->

<!--        <h4>手风琴</h4>-->
<!--        <cl-tree :data="treeData" accordion></cl-tree>-->

<!--        <h4>显示checkbox</h4>-->
<!--        <cl-tree :data="treeData" show-checkbox></cl-tree>-->
    </div>
</template>

<script>
    export default {
        name: "TreeView",
        data() {
            return {

                filterValue: '',
                checkedKeys: ['node-0'],
                expandKeys: ['node-0', 'node-0-1', 'node-0-2'],
                reduceData: [],
                treeDataLoad: [
                    {
                        key: 'node-0',
                        label: 'node-0',
                        disabled: false,
                        disabledCheckbox: false,
                    },
                ],
                treeData: [
                    {
                        key: 'node-0',
                        label: 'node-0',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'node-0-1',
                                label: 'node-0-1',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false,
                                children: [
                                    {
                                        key: 'node-0-1-0',
                                        label: 'node-0-1-0',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'node-0-1-1',
                                        label: 'node-0-1-1',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'node-0-2',
                                label: 'node-0-2',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'node-1',
                        label: 'node-1',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'node-1-0',
                                label: 'node-1-0',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                            {
                                key: 'node-1-1',
                                label: 'node-1-1',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'node-2',
                        label: 'node-2',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(()=>{
                this.getReduceTreeData();
            })
        },
        methods: {
            remove({root, node, data}){

                // data.root.splice(0, 1)
                // let a = data.root.find(el => el === data.data)
                // console.log(data,'====',a)
            },
            add({root, node, data}){
                console.log(data,'===')
                let children = [
                    {
                        key: 'test-0' + root.length,
                        label: 'test-0',
                    }
                ]
                this.$set(data, 'children', children);
            },
            renderContent(h, {root, node, data}){
                return `<span>${data.label}--render</span>`;
                // return h('div', [
                //     h('i', {
                //         attrs: {
                //             class: 'cl-icon-file'
                //         }
                //     }),
                //     h('span', data.label)
                // ])
            },
            getReduceTreeData(){
                this.$refs.tree.getData();
            },
            filterChange(value){
                this.$refs.tree.filterNodes(value);
            },
            handleLoadData(item){
                let result = [];
                if(item.key === 'node-0'){
                    result = [
                        {
                            key: 'node-0-1',
                            label: 'node-0-1',
                            disabled: false,
                            disabledCheckbox: false,
                            disabledExpand: false,
                            children: [
                                {
                                    key: 'node-0-1-0',
                                    label: 'node-0-1-0',
                                    disabled: false,
                                    last: true,
                                    disabledCheckbox: false,
                                },
                                {
                                    key: 'node-0-1-1',
                                    label: 'node-0-1-1',
                                    disabled: false,
                                    last: true,
                                    disabledCheckbox: false,
                                }
                            ]
                        },
                        {
                            key: 'node-0-2',
                            label: 'node-0-2',
                            last: true,
                            disabled: false,
                            disabledCheckbox: false,
                        },
                        {
                            key: 'node-0-3',
                            label: 'node-0-3',
                            last: true,
                            disabled: false,
                            disabledCheckbox: false,
                        }
                    ]
                }
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        resolve(result)
                    }, 3000)
                })
            }
        }
    }
</script>

<style scoped>

</style>
