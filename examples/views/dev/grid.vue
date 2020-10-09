<template>
    <div class="dev-grid">
        <h4>异步加载</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col' v-for="colItem in colList" :key="colItem.id">
                    <div class="dev-grid-col">{{colItem.name}}</div>
                </Col>
            </Row>
        </div>

        <h4>不设置span时自动设置</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="20">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>span=0时==>display:none隐藏</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="22">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置gutter</h4>
        <div>
            <Row class="dev-grid-row" :gutter="8">
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'>
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="20">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置offset</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col' span="2">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="4" offset="2">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="10">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="6">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置pull和push</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col' span="2">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="4" push="18">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="10" push="4">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="8" pull="14">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置order</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row" type="flex">
                <Col class='dev-grid-row-col' span="4" order="3">
                    <div class="dev-grid-col">col-1(order=3)</div>
                </Col>
                <Col class='dev-grid-row-col' span="4" order="4">
                    <div class="dev-grid-col">col-2(order=2)</div>
                </Col>
                <Col class='dev-grid-row-col' span="10" order="1">
                    <div class="dev-grid-col">col-3(order=4)</div>
                </Col>
                <Col class='dev-grid-row-col' span="6" order="2">
                    <div class="dev-grid-col">col-4(order=1)</div>
                </Col>
            </Row>
        </div>

        <h4>设置type=flex</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row" type="flex">
                <Col class='dev-grid-row-col' span="2">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="4">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="10">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="8">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>设置type=flex,align,justify</h4>
        设置align：
        <Select v-model="alignModel" :option="alignOption" class="dev-grid-flex-select"></Select>
        设置justify：
        <Select v-model="justifyModel" :option="justifyOption" class="dev-grid-flex-select"></Select>
        <div class="dev-grid-row-wrap dev-grid-row-wrap-align">
            <Row class="dev-grid-row" type="flex" :align="alignModel" :justify="justifyModel">
                <Col class='dev-grid-row-col' span="2">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="4">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="3">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' span="4">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>响应式布局</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col' :xs="2" :sm="8" :md="4" :lg="6">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' :xs="12" :sm="4" :md="8" :lg="6">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' :xs="8" :sm="4" :md="8" :lg="6">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col' :xs="2" :sm="8" :md="4" :lg="6">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>

        <h4>配合其他属性的响应式布局,offset属性</h4>
        <div class="dev-grid-row-wrap">
            <Row class="dev-grid-row">
                <Col class='dev-grid-row-col'
                     :xs="{span: 2, offset: 1}"
                     :sm="{span: 6, offset: 1}"
                     :md="{span: 3, offset: 2}"
                     :lg="{span: 4, offset: 2}">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'
                     :xs="{span: 10, offset: 1}"
                     :sm="{span: 4, offset: 1}"
                     :md="{span: 5, offset: 2}"
                     :lg="{span: 4, offset: 2}">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'
                     :xs="{span: 6, offset: 1}"
                     :sm="{span: 4, offset: 1}"
                     :md="{span: 5, offset: 2}"
                     :lg="{span: 4, offset: 2}">
                    <div class="dev-grid-col"></div>
                </Col>
                <Col class='dev-grid-row-col'
                     :xs="{span: 2, offset: 1}"
                     :sm="{span: 6, offset: 1}"
                     :md="{span: 3, offset: 2}"
                     :lg="{span: 4, offset: 2}">
                    <div class="dev-grid-col"></div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
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
                colList: []
            }
        },
        mounted() {
            this.setColList();
        },
        methods: {
            setColList() {
                setTimeout(() => {
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
    .dev-grid {
        .dev-grid-row-wrap {
            background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 0, transparent 8.33333333%, #f5f5f5 0, #f5f5f5 12.5%, transparent 0, transparent 16.66666667%, #f5f5f5 0, #f5f5f5 20.83333333%, transparent 0, transparent 25%, #f5f5f5 0, #f5f5f5 29.16666667%, transparent 0, transparent 33.33333333%, #f5f5f5 0, #f5f5f5 37.5%, transparent 0, transparent 41.66666667%, #f5f5f5 0, #f5f5f5 45.83333333%, transparent 0, transparent 50%, #f5f5f5 0, #f5f5f5 54.16666667%, transparent 0, transparent 58.33333333%, #f5f5f5 0, #f5f5f5 62.5%, transparent 0, transparent 66.66666667%, #f5f5f5 0, #f5f5f5 70.83333333%, transparent 0, transparent 75%, #f5f5f5 0, #f5f5f5 79.16666667%, transparent 0, transparent 83.33333333%, #f5f5f5 0, #f5f5f5 87.5%, transparent 0, transparent 91.66666667%, #f5f5f5 0, #f5f5f5 95.83333333%, transparent 0);
        }

        .dev-grid-col {
            padding: 30px 0;
            background-color: rgba(2, 183, 165, 0.8);
            color: #ffffff;
            text-align: center;
            font-size: 16px;
        }

        .dev-grid-row {
            margin: 10px 0;

            .dev-grid-row-col:nth-of-type(even) {
                .dev-grid-col {
                    background-color: rgba(2, 183, 165, 0.3);
                }
            }
        }

        .dev-grid-flex-select {
            width: 200px;
        }

        .dev-grid-row-wrap-align {
            .dev-grid-col {
                height: 50px;
            }

            .dev-grid-row-col:nth-of-type(1) {
                .dev-grid-col {
                    height: 80px;
                }
            }

            .dev-grid-row-col:nth-of-type(3) {
                .dev-grid-col {
                    height: 100px;
                }
            }
        }
    }
</style>
