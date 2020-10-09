<template>
    <div class="dev-cascader">
        clearable: {{value}}
        <Cascader v-model="value" :data="data" clearable @change="handleChange" loading></Cascader>

        value1: {{value1}}
        <Cascader v-model="value1" :data="data"></Cascader>

        value2: {{value2}}
        <Cascader v-model="value2" :data="data" change-on-select trigger="hover"></Cascader>

        valueLoading: {{valueLoading}}
        <Cascader v-model="valueLoading" :data="dataLoading" :loadData="handleLoadData"></Cascader>

        valueFilterable: {{valueFilterable}}
        <Cascader v-model="valueFilterable" :data="data" filterable change-on-select trigger="hover"></Cascader>

        <h4>Panel使用</h4>
        <CascaderPanel v-model="panelValue" :data="data"></CascaderPanel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                panelValue: [],
                value: ['henan', 'xuchang', 'xiangchengxian'],
                value1: [],
                value2: [],
                valueLoading: [],
                valueFilterable: [],
                dataLoading: [
                    {
                        value: 'test-0',
                        label: 'test-0',
                        children: []
                    },
                    {
                        value: 'test-1',
                        label: 'test-1',
                        children: []
                    }
                ],
                data: [
                    {
                        value: 'beijing',
                        label: '北京',
                        children: [
                            {
                                value: 'haidian',
                                label: '海淀区'
                            },
                            {
                                value: 'chaoyang',
                                label: '朝阳区'
                            },
                            {
                                value: 'changping',
                                label: '昌平区'
                            }
                        ]
                    },
                    {
                        value: 'tianjin',
                        label: '天津市'
                    },
                    {
                        value: 'henan',
                        label: '河南',
                        children: [
                            {
                                value: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        value: 'xiangchengxian',
                                        label: '襄城县'
                                    },
                                    {
                                        value: 'xuchangxian',
                                        label: '许昌县'
                                    },
                                    {
                                        value: 'linyingxian',
                                        label: '临颍县'
                                    }
                                ]
                            },
                            {
                                value: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        value: 'erqi',
                                        label: '二七区'
                                    },
                                    {
                                        value: 'zhengdongxinqu',
                                        label: '郑东新区'
                                    }
                                ]
                            },
                            {
                                value: 'pingdingshan',
                                label: '平顶山市'
                            },
                            {
                                value: 'nanyang',
                                label: '南阳市'
                            },
                            {
                                value: 'anyang',
                                label: '安阳市'
                            },
                            {
                                value: 'luohe',
                                label: '漯河市'
                            },
                            {
                                value: 'zhoukou',
                                label: '周口市'
                            }
                        ]
                    },
                    {
                        value: 'hebei',
                        label: '河北省',
                        children: [
                            {
                                value: 'handan',
                                label: '邯郸市'
                            },
                            {
                                value: 'shijiazhuang',
                                label: '石家庄'
                            }
                        ]
                    },
                    {
                        value: 'test',
                        label: '测试测试测试测试测试测试测试测试测试',
                        children: [
                            {
                                value: 'test-0',
                                label: '0-测试测试测试测试测试测试测试测试测试'
                            },
                            {
                                value: 'test-1',
                                label: '石家庄'
                            }
                        ]
                    },
                    {
                        value: 'has',
                        label: '存在'
                    }
                ]
            }
        },
        mounted() {
            setTimeout(() => {
                this.value = ['beijing', 'haidian']
            }, 2000)
        },
        methods: {
            handleChange(value, selectedData) {
                console.log(value, '====', selectedData)
            },
            format(labels, selectedData) {
                console.log(labels, selectedData);
                return labels.join('-');
            },
            handleLoadData(item) {
                let result = [];
                if (item.value === 'test-0') {
                    result = [
                        {
                            value: 'test-0-0',
                            label: 'test-0-0'
                        },
                        {
                            value: 'test-0-1',
                            label: 'test-0-1',
                            last: true
                        }
                    ]
                } else if (item.value === 'test-1') {
                    result = [
                        {
                            value: 'test-1-0',
                            label: 'test-1-0'
                        },
                        {
                            value: 'test-1-1',
                            label: 'test-1-1',
                            last: true
                        }
                    ]
                }

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(result);
                    }, 3000)
                })
            }
        }
    }
</script>

<style scoped>
    .dev-cascader {
        padding-bottom: 500px;
    }
</style>
