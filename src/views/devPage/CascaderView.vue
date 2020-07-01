<template>
    <div class="cascader-view">
        <cl-cascader v-model="value" :data="data"></cl-cascader>
    </div>
</template>

<script>
    export default {
        name: "CascaderView",
        data(){
            return {
                value: [],
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
                            }
                        ]
                    },
                ]
            }
        }
    }
</script>

<style scoped>
.cascader-view{
    padding-bottom: 500px;
}
</style>
