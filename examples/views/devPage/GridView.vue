<template>
    <div class="GridView">
        <h4>异步加载</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col' v-for="colItem in colList" :key="colItem.id">
                    <div class="grid-col">{{colItem.name}}</div>
                </Col>
            </Row>
        </div>

        <h4>不设置span时自动设置</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="20">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <h4>span=0时==>display:none隐藏</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="22">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <h4>设置gutter</h4>
        <div>
            <Row class="grid-row" :gutter="8">
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'>
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="20">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <h4>设置offset</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col' span="2">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="4" offset="2">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="10">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="6">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置pull和push</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col' span="2">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="4" push="18">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="10" push="4">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="8" pull="14">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置order</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row" type="flex">
                <Col class='grid-row-col' span="4" order="3">
                    <div class="grid-col">col-1(order=3)</div>
                </Col>
                <Col class='grid-row-col' span="4" order="4">
                    <div class="grid-col">col-2(order=2)</div>
                </Col>
                <Col class='grid-row-col' span="10" order="1">
                    <div class="grid-col">col-3(order=4)</div>
                </Col>
                <Col class='grid-row-col' span="6" order="2">
                    <div class="grid-col">col-4(order=1)</div>
                </Col>
            </Row>
        </div>

        <h4>设置type=flex</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row" type="flex">
                <Col class='grid-row-col' span="2">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="4">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="10">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="8">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <h4>设置type=flex,align,justify</h4>
        设置align：
        <Select v-model="alignModel" :option="alignOption" class="grid-flex-select"></Select>
        设置justify：
        <Select v-model="justifyModel" :option="justifyOption" class="grid-flex-select"></Select>
        <div class="grid-row-wrap grid-row-wrap-align">
            <Row class="grid-row" type="flex" :align="alignModel" :justify="justifyModel">
                <Col class='grid-row-col' span="2">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="4">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="3">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' span="4">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <h4>响应式布局</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col' :xs="2" :sm="8" :md="4" :lg="6">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' :xs="12" :sm="4" :md="8" :lg="6">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' :xs="8" :sm="4" :md="8" :lg="6">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col' :xs="2" :sm="8" :md="4" :lg="6">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>配合其他属性的响应式布局,offset属性</h4>
        <div class="grid-row-wrap">
            <Row class="grid-row">
                <Col class='grid-row-col'
                       :xs="{span: 2, offset: 1}"
                       :sm="{span: 6, offset: 1}"
                       :md="{span: 3, offset: 2}"
                       :lg="{span: 4, offset: 2}">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'
                       :xs="{span: 10, offset: 1}"
                       :sm="{span: 4, offset: 1}"
                       :md="{span: 5, offset: 2}"
                       :lg="{span: 4, offset: 2}">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'
                       :xs="{span: 6, offset: 1}"
                       :sm="{span: 4, offset: 1}"
                       :md="{span: 5, offset: 2}"
                       :lg="{span: 4, offset: 2}">
                    <div class="grid-col"></div>
                </Col>
                <Col class='grid-row-col'
                       :xs="{span: 2, offset: 1}"
                       :sm="{span: 6, offset: 1}"
                       :md="{span: 3, offset: 2}"
                       :lg="{span: 4, offset: 2}">
                    <div class="grid-col"></div>
                </Col>
            </Row>
        </div>


        <div class="views-dev">
            <h3>API</h3>
            <h4>row props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：type</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>布局模式，可选值flex或者不设置</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：align</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>flex布局下有效，垂直方向的对齐方式，可选值top/middle/bottom。如果没有主动设置flex模式，则自动匹配flex模式</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：justify</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>flex布局下有效，水平方向的对齐方式，start/end/center/space-around/space-between。如果没有主动设置flex模式，则自动匹配flex模式
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：gutter</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>栅格间隔，单位px，左右均分</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>col props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：span</b></p>
                <p><b>类型：Number, String</b></p>
                <p><b>说明：</b>栅格占位格数，可选值0-24，设置为0时display:none。不主动设置的情况下，默认均分剩余空间，剩余空间不足1个栅格时，不设置；剩余空间不够均分的，优先排序在前的均分，最后一个占剩余的空间
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：order</b></p>
                <p><b>类型：Number, String</b></p>
                <p><b>说明：</b>栅格的顺序，flex模式下有效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：offset</b></p>
                <p><b>类型：Number, String</b></p>
                <p><b>说明：</b>栅格左侧的间隔数，间隔内不能有栅格</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：push</b></p>
                <p><b>类型：Number, String</b></p>
                <p><b>说明：</b>栅格向右移动的格数</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：pull</b></p>
                <p><b>类型：Number, String</b></p>
                <p><b>说明：</b>栅格向左移动的格数</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：xs</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&lt;576px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：sm</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&gt;=576px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：md</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&gt;=768px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：lg</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&gt;=992px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：xl</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&gt;=1200px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：xxl</b></p>
                <p><b>类型：Number, Object</b></p>
                <p><b>说明：</b>
                    <Tag>&gt;=1920px</Tag>
                    响应式栅格，可设置栅格数及包含其他属性的对象，设置对象时如：{span: 2, offset: 2}
                </p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GridView",
        data() {
            return {
                alignModel: 'top',
                alignOption: [
                    {
                        value: 'top',
                        label: 'top'
                    },
                    {
                        value: 'middle',
                        label: 'middle'
                    },
                    {
                        value: 'bottom',
                        label: 'bottom'
                    }
                ],
                justifyModel: 'start',
                justifyOption: [
                    {
                        value: 'start',
                        label: 'start'
                    },
                    {
                        value: 'end',
                        label: 'end'
                    },
                    {
                        value: 'center',
                        label: 'center'
                    },
                    {
                        value: 'space-around',
                        label: 'space-around'
                    },
                    {
                        value: 'space-between',
                        label: 'space-between'
                    }
                ],
                colList: [

                ]
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setColList();
        },
        methods: {
            setColList(){
                setTimeout(()=>{
                    this.colList = [
                        {
                            id: 0,
                            name: 'name0'
                        },
                        {
                            id: 1,
                            name: 'name1'
                        },
                        {
                            id: 2,
                            name: 'name2'
                        },
                        {
                            id: 3,
                            name: 'name3'
                        }
                    ]
                }, 3000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .GridView {
        .grid-row-wrap {
            background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 0, transparent 8.33333333%, #f5f5f5 0, #f5f5f5 12.5%, transparent 0, transparent 16.66666667%, #f5f5f5 0, #f5f5f5 20.83333333%, transparent 0, transparent 25%, #f5f5f5 0, #f5f5f5 29.16666667%, transparent 0, transparent 33.33333333%, #f5f5f5 0, #f5f5f5 37.5%, transparent 0, transparent 41.66666667%, #f5f5f5 0, #f5f5f5 45.83333333%, transparent 0, transparent 50%, #f5f5f5 0, #f5f5f5 54.16666667%, transparent 0, transparent 58.33333333%, #f5f5f5 0, #f5f5f5 62.5%, transparent 0, transparent 66.66666667%, #f5f5f5 0, #f5f5f5 70.83333333%, transparent 0, transparent 75%, #f5f5f5 0, #f5f5f5 79.16666667%, transparent 0, transparent 83.33333333%, #f5f5f5 0, #f5f5f5 87.5%, transparent 0, transparent 91.66666667%, #f5f5f5 0, #f5f5f5 95.83333333%, transparent 0);
        }

        .grid-col {
            padding: 30px 0;
            background-color: rgba(2, 183, 165, 0.8);
            color: #ffffff;
            text-align: center;
            font-size: 16px;
        }

        .grid-row {
            margin: 10px 0;

            .grid-row-col:nth-of-type(even) {
                .grid-col {
                    background-color: rgba(2, 183, 165, 0.3);
                }
            }
        }

        .grid-flex-select {
            width: 200px;
        }

        .grid-row-wrap-align {
            .grid-col {
                height: 50px;
            }

            .grid-row-col:nth-of-type(1) {
                .grid-col {
                    height: 80px;
                }
            }

            .grid-row-col:nth-of-type(3) {
                .grid-col {
                    height: 100px;
                }
            }
        }
    }
</style>
