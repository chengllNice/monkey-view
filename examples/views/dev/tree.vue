<template>
    <div class="dev-tree">

        <h4>normal</h4>
        <Tree :data="treeData" ref="tree"></Tree>

        <h4>filter</h4>
        <Input v-model="filterValue" @change="filterChange"></Input>
        <Tree :data="treeData" ref="tree"></Tree>

        <h4>slot</h4>
        <Tree :data="treeDataLoad" :expand-click-on-node="false" ref="tree">
            <template slot-scope="data">
                {{data.data.label}}
                <ButtonGroup>
                    <Button icon="plus" type="primary" size="mini" @click="add(data)"></Button>
                    <Button icon="remove" size="mini" @click="remove(data)"></Button>
                </ButtonGroup>
            </template>
        </Tree>

        <h4>renderContent</h4>
        <Tree :data="treeData" :render-content="renderContent" ref="tree"></Tree>

        <h4>LoadData</h4>
        <Tree :data="treeDataLoad" :load-data="handleLoadData" ref="tree"></Tree>

        <h4>icon</h4>
        <Tree :data="treeData" ref="tree" expand-icon-class="file"></Tree>

        <h4>icon</h4>
        <Tree :data="treeData" ref="tree" hide-icon></Tree>

        <h4>checkedKeys</h4>
        <Tree :data="treeData" show-checkbox :checked-keys="checkedKeys" ref="tree"></Tree>

        <h4>checkedKeys -- check-strictly</h4>
        <Tree :data="treeData" show-checkbox check-strictly :checked-keys="checkedKeys" ref="tree"></Tree>

        <h4>expandKeys</h4>
        <Tree :data="treeData" :expand-keys="expandKeys" ref="tree"></Tree>

        <h4>手风琴</h4>
        <Tree :data="treeData" accordion ref="tree"></Tree>

        <h4>显示checkbox</h4>
        <Tree :data="checkedData" show-checkbox ref="tree"></Tree>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                filterValue: '',
                checkedKeys: ['node-0'],
                expandKeys: ['node-0', 'node-0-1', 'node-0-2'],
                keyIndex: 10,
                reduceData: [],
                checkedData: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                                disabled: false,
                                disabledCheckbox: false
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                        disabled: true,
                                        disabledCheckbox: false
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                        disabled: false,
                                        disabledCheckbox: false
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                        disabled: false,
                                        disabledCheckbox: false
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                disabled: true,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                        disabled: false,
                                        disabledCheckbox: false
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                        disabled: false,
                                        disabledCheckbox: false
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                                disabled: false,
                                disabledCheckbox: false
                            }
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ],
                treeDataLoad: [
                    {
                        key: 'node-0',
                        label: 'node-0',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'node-0-1',
                                label: 'node-0-1'
                            }
                        ]
                    },
                    {
                        key: 'node-1',
                        label: 'node-1',
                        disabled: false,
                        disabledCheckbox: false
                    }
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
                                        disabledCheckbox: false
                                    },
                                    {
                                        key: 'node-0-1-1',
                                        label: 'node-0-1-1',
                                        disabled: false,
                                        disabledCheckbox: false
                                    }
                                ]
                            },
                            {
                                key: 'node-0-2',
                                label: 'node-0-2',
                                disabled: false,
                                disabledCheckbox: false
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
                                disabledCheckbox: false
                            },
                            {
                                key: 'node-1-1',
                                label: 'node-1-1',
                                disabled: false,
                                disabledCheckbox: false
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
        mounted() {
            this.$nextTick(() => {
                this.getReduceTreeData();
            })
        },
        methods: {
            remove({ root, data }) {
                if (!data.parentKey) {
                    const index = root.findIndex(el => data.key === el.key);
                    root.splice(index, 1)
                } else {
                    const parentItem = root.find(el => data.parentKey === el.key);
                    const index = parentItem.childrenKeys.findIndex(key => key === data.key);
                    parentItem.children.splice(index, 1);
                }
            },
            add(param) {
                const data = param.data;
                const children = [
                    ...(data.children || []),
                    {
                        key: 'test-0' + ++this.keyIndex,
                        label: 'test-0' + this.keyIndex,
                        children: []
                    }
                ];
                this.$set(data, 'children', children);
            },
            renderContent(h, { root, data }) {
                // return `<span>${data.label}--render</span>`;
                // return h('div', [
                //     h('i', {
                //         attrs: {
                //             class: 'file'
                //         }
                //     }),
                //     h('span', data.label)
                // ])
                return h('div', {
                             attrs: {
                                 class: 'doc-tree-load-data'
                             }
                         },
                         [
                             h('span', [
                                 h('i', {
                                     attrs: {
                                         class: 'file'
                                     }
                                 }),
                                 h('span', data.label)
                             ]),
                             h('ButtonGroup', [
                                 h('Button', {
                                     props: {
                                         type: 'primary',
                                         icon: 'plus',
                                         size: 'mini'
                                     },
                                     on: {
                                         click: () => {
                                             this.add({ root, data })
                                         }
                                     }
                                 }),
                                 h('Button', {
                                     props: {
                                         icon: 'minus',
                                         size: 'mini'
                                     },
                                     on: {
                                         click: () => {
                                             this.remove({ root, data })
                                         }
                                     }
                                 })
                             ])
                         ])
            },
            getReduceTreeData() {
                this.$refs.tree.getData();
            },
            filterChange(value) {
                this.$refs.tree.filterNodes(value);
            },
            handleLoadData(item) {
                let result = [];
                if (item.key === 'node-1') {
                    result = [
                        {
                            key: 'node-1-1',
                            label: 'node-1-1',
                            disabled: false,
                            disabledCheckbox: false,
                            disabledExpand: false,
                            expand: true
                        },
                        {
                            key: 'node-1-2',
                            label: 'node-1-2',
                            last: true,
                            disabled: false,
                            disabledCheckbox: false
                        },
                        {
                            key: 'node-1-3',
                            label: 'node-1-3',
                            last: true,
                            disabled: false,
                            disabledCheckbox: false
                        }
                    ]
                } else if (item.key === 'node-0-1') {
                    result = [
                        {
                            key: 'node-0-1-0',
                            label: 'node-0-1-0',
                            disabled: false,
                            last: true,
                            disabledCheckbox: false
                        },
                        {
                            key: 'node-0-1-1',
                            label: 'node-0-1-1',
                            disabled: false,
                            last: true,
                            disabledCheckbox: false
                        }
                    ]
                }
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(result)
                    }, 3000)
                })
            }
        }
    }
</script>
