<template>
    <div class="cascader-view">
        value: {{value}}
        <cl-cascader v-model="value" :data="data"></cl-cascader>

        value1: {{value1}}
        <cl-cascader v-model="value1" :data="data" :format="format"></cl-cascader>


        value2: {{value2}}
        <cl-cascader v-model="value2" :data="data" change-on-select trigger="hover"></cl-cascader>
    </div>
</template>

<script>
    export default {
        name: "CascaderView",
        data(){
            return {
                value: ['beijing', 'haidian'],
                value1: [],
                value2: [],
                dataLoading: [
                    {
                        value: 'test-0',
                        label: 'test-0',
                        children: [],
                    },
                    {
                        value: 'test-1',
                        label: 'test-1',
                        children: [],
                    }
                ],
                data: [
                    {
                        value: 'beijing',
                        label: '北京',
                        children: [
                            {
                                value: 'haidian',
                                label: '海淀区',
                            },
                            {
                                value: 'chaoyang',
                                label: '朝阳区',
                            },
                            {
                                value: 'changping',
                                label: '昌平区',
                            }
                        ]
                    },
                    {
                        value: 'tianjin',
                        label: '天津市',
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
                                        label: '襄城县',
                                    },
                                    {
                                        value: 'xuchangxian',
                                        label: '许昌县',
                                    },
                                    {
                                        value: 'linyingxian',
                                        label: '临颍县',
                                    }
                                ]
                            },
                            {
                                value: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        value: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        value: 'zhengdongxinqu',
                                        label: '郑东新区',
                                    },
                                ]
                            },
                            {
                                value: 'pingdingshan',
                                label: '平顶山市',
                            },
                            {
                                value: 'nanyang',
                                label: '南阳市',
                            },
                            {
                                value: 'anyang',
                                label: '安阳市',
                            },
                            {
                                value: 'luohe',
                                label: '漯河市',
                            },
                            {
                                value: 'zhoukou',
                                label: '周口市',
                            }
                        ]
                    },
                    {
                        value: 'hebei',
                        label: '河北省',
                        children: [
                            {
                                value: 'handan',
                                label: '邯郸市',
                            },
                            {
                                value: 'shijiazhuang',
                                label: '石家庄',
                            },
                        ]
                    },
                    {
                        value: 'test',
                        label: '测试测试测试测试测试测试测试测试测试',
                        children: [
                            {
                                value: 'test-0',
                                label: '0-测试测试测试测试测试测试测试测试测试',
                            },
                            {
                                value: 'test-1',
                                label: '石家庄',
                            },
                        ]
                    },
                    {
                        value: 'has',
                        label: '存在',
                    },
                ]
            }
        },
        methods: {
            format(labels, selectedData){
                console.log(labels, selectedData);
                return labels.join('-');
            }
        }
    }
</script>

<style scoped>
.cascader-view{
    padding-bottom: 500px;
}
</style>
