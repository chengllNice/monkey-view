<template>
    <div class="dev-select">
        <div class="dev-select-view">
            <h2>不同size</h2>
            <Select size="mini" v-model="selectValueBaseSize1" :option="optionBaseEmpty"
                    @change="handlerChange"></Select>
            <Select size="small" v-model="selectValueBaseSize2" :option="optionBaseEmpty"
                    @change="handlerChange"></Select>
            <Select v-model="selectValueBaseSize3" :option="optionBaseEmpty" @change="handlerChange"></Select>
            <Select size="large" v-model="selectValueBaseSize4" :option="optionBaseEmpty"
                    @change="handlerChange"></Select>
            <Select size="mini" v-model="selectValueMultipleSize1" multiple valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>
            <Select size="small" v-model="selectValueMultipleSize2" multiple valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>
            <Select v-model="selectValueMultipleSize3" multiple valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>
            <Select size="large" v-model="selectValueMultipleSize4" multiple valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>
        </div>

        <div class="dev-select-view">
            <h2>新建 props:option</h2>
            <Select v-model="selectValueCreate1" allow-create filterable clearable :option="optionBaseCreate"
                    @change="handlerChange"></Select>
            <Select v-model="selectValueCreate2" allow-create multiple filterable :multipleLimit="2"
                    :option="optionBaseCreate"
                    @change="handlerChange"></Select>
            <h2>新建 slots</h2>
            <Select v-model="selectValueCreate3" allow-create filterable @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
            <Select v-model="selectValueCreate4" allow-create multiple filterable :multipleLimit="2"
                    @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
        </div>

        <div class="dev-select-view">
            <h2>maxTagCount</h2>
            <Select v-model="selectValueMaxTag1" multiple filterable :max-tag-count="2"
                    :option="optionBaseCreate"
                    @change="handlerChange"></Select>
            <h2>maxTagText</h2>
            <Select v-model="selectValueMaxTag2" multiple filterable :max-tag-count="2" :max-tag-text="maxTagText"
                    @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
        </div>

        <div class="dev-select-view">
            <h2>基础</h2>

            <p>dropdownMatchSelectWidth:下拉框是否与选择器同宽</p>
            <Select v-model="selectValueBaseHave" :option="optionBaseHave" :dropdownMatchSelectWidth="true"
                    @change="handlerChange"></Select>

            <p>长数据时超出滚动</p>
            <Select v-model="selectValueBaseLarge" :option="optionBaseLarge" @change="handlerChange"></Select>

            <p>长数据时定义下拉框的最大高度，超出滚动</p>
            <Select v-model="selectValueBaseLarge" :option="optionBaseLarge" @change="handlerChange"
                    maxHeight="300px"></Select>

            <p>props:option</p>
            <Select v-model="selectValueBase0" :option="optionBase" @change="handlerChange"></Select>
            <Select v-model="selectValueBase1" :option="optionBase" @change="handlerChange"></Select>

            <p>slots:option</p>
            <Select v-model="selectValueBase2" @change="handlerChange">
                <Option v-for="item in optionBase" :key="item.value" :value="item.value" :label="item.label"></Option>
            </Select>

            <p>返回值valueLabel格式props:option</p>
            <Select v-model="selectValueBase3" valueLable :option="optionBase" @change="handlerChange"></Select>

            <p>空数据</p>
            <Select v-model="selectValueBase4" :option="optionBaseEmpty" @change="handlerChange"></Select>

        </div>

        <div class="dev-select-view">
            <h2>禁用</h2>
            <Select v-model="selectValueDisabled1" :option="optionDisabled" disabled
                    @change="handlerChange"></Select>
            <Select v-model="selectValueDisabled2" :option="optionDisabled" @change="handlerChange"></Select>
            <Select v-model="selectValueDisabled3" :option="optionDisabled" disabled multiple
                    @change="handlerChange"></Select>
            <Select v-model="selectValueDisabled4" :option="optionDisabled" multiple
                    @change="handlerChange"></Select>
        </div>

        <div class="dev-select-view">
            <h2>size</h2>
            <p>mini: </p>
            <Select v-model="selectValueSizeMini" size="mini">
                <Option v-for="item in optionSizeMini" :key="item.value" :value="item.value" :selected="item.selected"
                        :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>
            <p>small: </p>
            <Select v-model="selectValueSizeSmall" size="small">
                <Option v-for="item in optionSizeSmall" :key="item.value" :value="item.value"
                        :selected="item.selected" :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>
            <p>default: </p>
            <Select v-model="selectValueSizeDefault">
                <Option v-for="item in optionSizeDefault" :key="item.value" :value="item.value"
                        :selected="item.selected" :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>
            <p>large: </p>
            <Select v-model="selectValueSizeLarge" size="large">
                <Option v-for="item in optionSizeLarge" :key="item.value" :value="item.value"
                        :selected="item.selected" :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>
        </div>

        <div class="dev-select-view">
            <h2>可清空</h2>

            <p>可清空：props:option</p>
            <Select v-model="selectValueClearable" :option="optionClearable" clearable
                    @change="handlerChange"></Select>
        </div>

        <div class="dev-select-view">
            <h2>分组</h2>

            <p>分组：props:option</p>
            <Select v-model="selectValueGroup" :option="optionGroup" clearable @change="handlerChange"></Select>

            <p>分组：slots:option</p>
            <Select v-model="selectValueGroup1" @change="handlerChange">
                <OptionGroup label="ceshi">
                    <Option v-for="item in optionGroup0" :key="item.value" :value="item.value"
                            :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="ceshi2">
                    <Option v-for="item in optionGroup1" :key="item.value" :value="item.value"
                            :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </Option>
                </OptionGroup>
            </Select>
        </div>

        <div class="dev-select-view">
            <h2>自定义模板</h2>

            <p>自定义模板：slots:option</p>
            <Select v-model="selectValueCustomModel1" @change="handlerChange">
                <Option v-for="item in optionCustomModel" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    <Icon :type="item.icon" style="margin-right: 10px;"></Icon>
                    {{item.label}}
                </Option>
            </Select>

            <p>自定义模板：props:option</p>
            <Select v-model="selectValueCustomModel2" :option="optionCustomModel" @change="handlerChange"></Select>
        </div>

        <div class="dev-select-view">
            <h2>多选</h2>

            <p>多选：slots:option</p>
            <Select v-model="selectValueMultiple1" multiple @change="handlerChange">
                <Option v-for="item in optionMultiple" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>

            <p>多选返回值valueLabel格式：props:option</p>
            <Select v-model="selectValueMultiple2" multiple valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>

            <h2>限制多选数量 multipleLimit</h2>
            <p>多选：slots:option</p>
            <Select v-model="selectValueMultiple1" multiple :multipleLimit="2" @change="handlerChange">
                <Option v-for="item in optionMultiple" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    {{item.label}}
                </Option>
            </Select>

            <p>多选返回值valueLabel格式：props:option</p>
            <Select v-model="selectValueMultiple2" multiple :multipleLimit="2" valueLable :option="optionMultiple"
                    @change="handlerChange"></Select>
        </div>

        <div class="dev-select-view">
            <h2>可搜索</h2>
            <Select size="mini" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                    @change="handlerChange"></Select>
            <Select size="small" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                    @change="handlerChange"></Select>
            <Select v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                    @change="handlerChange"></Select>
            <Select size="large" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                    @change="handlerChange"></Select>

            <p>可搜索单选可清空slots:option</p>
            <Select v-model="selectValueSearch1" filterable clearable @change="handlerChange">
                <Option v-for="item in optionSearch" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    <Icon :type="item.icon" style="margin-right: 10px;"></Icon>
                    {{item.label}}
                </Option>
            </Select>

            <p>可搜索单选可清空slots:optionGroup</p>
            <Select v-model="selectValueSearch1" filterable clearable @change="handlerChange">
                <OptionGroup label="search1">
                    <Option v-for="item in optionSearchGroup0" :key="item.value" :value="item.value"
                            :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="search2">
                    <Option v-for="item in optionSearchGroup1" :key="item.value" :value="item.value"
                            :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </Option>
                </OptionGroup>
            </Select>

            <p>可搜索单选可清空props:option</p>
            <Select v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                    @change="handlerChange"></Select>
            <p>可搜索多选可清空props:option</p>
            <Select v-model="selectValueSearch3" :option="optionSearch" multiple filterable clearable :multipleLimit="2"
                    @change="handlerChange"></Select>

            <p>可搜索单选可清空props:optionGroup</p>
            <Select v-model="selectValueSearchGroup2" :option="optionSearchGroup" filterable clearable
                    @change="handlerChange"></Select>

            <p>可搜索多选可清空props:optionGroup</p>
            <Select v-model="selectValueSearchGroup3" :option="optionSearchGroup" multiple filterable clearable
                    :multipleLimit="2"
                    @change="handlerChange"></Select>

        </div>

        <div class="dev-select-view">
            <h2>远程搜索</h2>
            <p>远程搜索单选可清空slot:option</p>
            <Select v-model="selectValueRemote1" filterable remote clearable :loading="remoteLoading"
                    @change="handlerChange" @remote-change="handlerChangeRemote">
                <Option v-for="item in optionRemote" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    <Icon :class="item.icon" style="margin-right: 10px;"></Icon>
                    {{item.label}}
                </Option>
            </Select>
            <p>远程搜索多选可清空slot:option</p>
            <Select v-model="selectValueRemote3" multiple filterable remote clearable :loading="remoteLoading"
                    @change="handlerChange" @remote-change="handlerChangeRemote">
                <Option v-for="item in optionRemote" :key="item.value" :value="item.value" :label="item.label"
                        :disabled="item.disabled">
                    <Icon :class="item.icon" style="margin-right: 10px;"></Icon>
                    {{item.label}}
                </Option>
            </Select>
            <p>远程搜索多选可清空props:option</p>
            <Select v-model="selectValueRemote2" :option="optionRemote" filterable remote clearable
                    :loading="remoteLoading" @change="handlerChange" @remote-change="handlerChangeRemote"></Select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectValueBaseSize1: '',
                selectValueBaseSize2: '',
                selectValueBaseSize3: '',
                selectValueBaseSize4: '',

                selectValueMultipleSize1: [],
                selectValueMultipleSize2: [],
                selectValueMultipleSize3: [],
                selectValueMultipleSize4: [],

                selectValueBaseHave: '',
                selectValueBaseLarge: '',
                selectValueBase0: '',
                selectValueBase1: '',
                selectValueBase2: '0',
                selectValueBase3: '',
                selectValueBase4: '',
                optionBaseLarge: [],
                optionBase: [],
                optionBaseEmpty: [],
                optionBaseHave: [
                    {
                        value: '0',
                        label: '测试0你那你打你嗲嗲嗲嗲滴啊发那间房间安静能否将案件发年房价按附件',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false
                    }
                ],

                selectValueCreate1: '',
                selectValueCreate2: '',
                selectValueCreate3: '',
                selectValueCreate4: '',
                optionBaseCreate: [
                    {
                        label: 'html',
                        value: 'html'
                    },
                    {
                        label: 'css',
                        value: 'css'
                    },
                    {
                        label: 'javascript',
                        value: 'javascript'
                    }
                ],

                selectValueMaxTag1: [],
                selectValueMaxTag2: [],

                selectValueDisabled1: '',
                selectValueDisabled2: '1',
                selectValueDisabled3: '1',
                selectValueDisabled4: '1',
                optionDisabled: [],

                selectValueSizeMini: '',
                optionSizeMini: [],

                selectValueSizeSmall: '',
                optionSizeSmall: [],

                selectValueSizeDefault: '',
                optionSizeDefault: [],

                selectValueSizeLarge: '',
                optionSizeLarge: [],

                selectValueClearable: '',
                optionClearable: [],

                selectValueGroup: '',
                selectValueGroup1: '',
                optionGroup: [],
                optionGroup0: [],
                optionGroup1: [],

                selectValueCustomModel1: '',
                selectValueCustomModel2: '',
                optionCustomModel: [],

                selectValueSearch1: '',
                selectValueSearch2: '',
                selectValueSearch3: '',
                selectValueSearchGroup2: '',
                selectValueSearchGroup3: '',
                optionSearch: [],
                optionSearch1: [],
                optionSearch2: [],
                optionSearchGroup: [],
                optionSearchGroup0: [],
                optionSearchGroup1: [],

                selectValueRemote1: '',
                selectValueRemote2: '',
                selectValueRemote3: '',
                optionRemote: [],
                optionRemoteData: [],
                remoteLoading: false,

                selectValueMultiple1: '',
                selectValueMultiple2: [],
                optionMultiple: []
            }
        },
        mounted() {
            setTimeout(() => {
                this.getOptionData();
            }, 4000);
            setTimeout(() => {
                this.setValues();
            }, 3000)
        },
        methods: {
            maxTagText(count) {
                return `more ${count}`
            },
            setValues() {
                this.selectValueMultiple2 = [];
            },
            getOptionData() {
                this.optionBase = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false
                    }
                ];
                this.optionBaseLarge = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false
                    },
                    {
                        value: '5',
                        label: '测试5',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '6',
                        label: '测试6',
                        selected: false
                    },
                    {
                        value: '7',
                        label: '测试7',
                        selected: false
                    },
                    {
                        value: '8',
                        label: '测试8',
                        selected: false
                    },
                    {
                        value: '9',
                        label: '测试9',
                        selected: false
                    },
                    {
                        value: '10',
                        label: '测试10',
                        selected: false
                    },
                    {
                        value: '11',
                        label: '测试11',
                        selected: false
                    }
                ];
                this.optionDisabled = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false
                    }
                ];
                this.optionSizeSmall = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false
                    }
                ];
                this.optionSizeDefault = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false
                    }
                ];
                this.optionSizeLarge = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false
                    }
                ];
                this.optionClearable = [
                    {
                        value: '0',
                        label: '测试0',
                        selected: true,
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        selected: false
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false
                    }
                ];

                this.optionGroup = [
                    {
                        value: 'group1',
                        label: 'group1',
                        option: [
                            {
                                value: 'option0',
                                label: 'option0',
                                disabled: true
                            },
                            {
                                value: 'option1',
                                label: 'option1'
                            }
                        ]
                    },
                    {
                        value: 'group2',
                        label: 'group2',
                        option: [
                            {
                                value: 'option2-1',
                                label: 'option2-1',
                                disabled: true
                            },
                            {
                                value: 'option2-2',
                                label: 'option2-2'
                            }
                        ]
                    }
                ];
                this.optionGroup0 = [
                    {
                        value: 'group0',
                        label: '测试group0'
                    },
                    {
                        value: 'group1',
                        label: '测试group1'
                    },
                    {
                        value: 'group2',
                        label: '测试group2'
                    }
                ];
                this.optionGroup1 = [
                    {
                        value: 'group3',
                        label: '测试group3'
                    },
                    {
                        value: 'group4',
                        label: '测试group4'
                    }
                ];

                this.optionCustomModel = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'star'
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'button'
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'sound'
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'setting'
                    }
                ];
                this.optionSearch = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'star'
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'button'
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'sound'
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'setting'
                    }
                ];
                this.optionSearchGroup0 = [
                    {
                        value: 'group0',
                        label: '测试group0'
                    },
                    {
                        value: 'group1',
                        label: '测试group1'
                    },
                    {
                        value: 'group2',
                        label: '测试group2'
                    }
                ];
                this.optionSearchGroup1 = [
                    {
                        value: 'group3',
                        label: '测试group3'
                    },
                    {
                        value: 'group4',
                        label: '测试group4'
                    }
                ];
                this.optionSearchGroup = [
                    {
                        value: 'group1',
                        label: 'group1',
                        selected: true,
                        disabled: true,
                        noClick: false,
                        option: [
                            {
                                value: 'group0',
                                label: '测试group0',
                                selected: true,
                                disabled: true
                            },
                            {
                                value: 'group1',
                                label: '测试group1',
                                selected: false
                            }
                        ]
                    },
                    {
                        value: 'group2',
                        label: 'group2',
                        selected: true,
                        disabled: true,
                        noClick: true,
                        option: [
                            {
                                value: 'group2',
                                label: '测试group2',
                                selected: true,
                                disabled: true
                            },
                            {
                                value: 'group3',
                                label: '测试group3',
                                selected: false
                            }
                        ]
                    }
                ];

                this.optionRemote = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'star'
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'button'
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'sound'
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'setting'
                    }
                ];
                this.optionRemoteData = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'star'
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'button'
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'sound'
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'setting'
                    }
                ];

                this.optionMultiple = [
                    {
                        value: '0',
                        label: '测试0'
                    },
                    {
                        value: '1',
                        label: '测试1'
                    },
                    {
                        value: '2',
                        label: '测试2'
                    },
                    {
                        value: '3',
                        label: '测试3'
                    },
                    {
                        value: '4',
                        label: '测试4'
                    },
                    {
                        value: '5',
                        label: '测试5'
                    },
                    {
                        value: '6',
                        label: '测试6'
                    },
                    {
                        value: '7',
                        label: '测试7'
                    },
                    {
                        value: '8',
                        label: '测试8'
                    }
                ];
            },
            handlerChange(value) {
                console.log(value, '===cahnge')
            },
            handlerChangeRemote(value) {
                console.log(value, 'value')
                this.optionRemote = [];
                this.remoteLoading = true;
                setTimeout(() => {
                    this.optionRemote = this.optionRemoteData.filter(item => {
                        return item.label.includes(value)
                    });
                    console.log(this.optionRemote, 'this.optionRemote')
                    this.remoteLoading = false;
                }, 500);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-select {
        .dev-select-view {
            /*min-height: 300px;*/
            & > * {
                margin: 0 5px;
            }
        }
    }
</style>
