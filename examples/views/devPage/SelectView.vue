<template>
    <div class="SelectView">
        <div class="view">
            <h2>不同size</h2>
            <ClSelect size="mini" v-model="selectValueBaseSize1" :option="optionBaseEmpty" @change="handlerChange"></ClSelect>
            <ClSelect size="small" v-model="selectValueBaseSize2" :option="optionBaseEmpty" @change="handlerChange"></ClSelect>
            <ClSelect v-model="selectValueBaseSize3" :option="optionBaseEmpty" @change="handlerChange"></ClSelect>
            <ClSelect size="large" v-model="selectValueBaseSize4" :option="optionBaseEmpty" @change="handlerChange"></ClSelect>
            <ClSelect size="mini" v-model="selectValueMultipleSize1" multiple valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>
            <ClSelect size="small" v-model="selectValueMultipleSize2" multiple valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>
            <ClSelect v-model="selectValueMultipleSize3" multiple valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>
            <ClSelect size="large" v-model="selectValueMultipleSize4" multiple valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>
        </div>

        <div class="view">
            <h2>新建 props:option</h2>
            <Select v-model="selectValueCreate1" allow-create filterable clearable :option="optionBaseCreate" @change="handlerChange"></Select>
            <Select v-model="selectValueCreate2" allow-create multiple filterable :multipleLimit="2"
                    :option="optionBaseCreate"
                      @change="handlerChange"></Select>
            <h2>新建 slots</h2>
            <Select v-model="selectValueCreate3" allow-create filterable @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
            <Select v-model="selectValueCreate4" allow-create multiple filterable :multipleLimit="2" @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
        </div>

        <div class="view">
            <h2>maxTagCount</h2>
            <Select v-model="selectValueMaxTag1" multiple filterable :max-tag-count="2"
                    :option="optionBaseCreate"
                    @change="handlerChange"></Select>
            <h2>maxTagText</h2>
            <Select v-model="selectValueMaxTag2" multiple filterable :max-tag-count="2" :max-tag-text="maxTagText" @change="handlerChange">
                <Option v-for="item in optionBaseCreate" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
        </div>

<!--        <div class="view">-->
<!--            <h2>基础</h2>-->

<!--            <p>dropdownMatchSelectWidth:下拉框是否与选择器同宽</p>-->
<!--            <ClSelect v-model="selectValueBaseHave" :option="optionBaseHave" :dropdownMatchSelectWidth="true"-->
<!--                      @change="handlerChange"></ClSelect>-->

<!--            <p>长数据时超出滚动</p>-->
<!--            <ClSelect v-model="selectValueBaseLarge" :option="optionBaseLarge" @change="handlerChange"></ClSelect>-->

<!--            <p>长数据时定义下拉框的最大高度，超出滚动</p>-->
<!--            <ClSelect v-model="selectValueBaseLarge" :option="optionBaseLarge" @change="handlerChange"-->
<!--                      maxHeight="300px"></ClSelect>-->

<!--            <p>props:option</p>-->
<!--            <ClSelect v-model="selectValueBase0" :option="optionBase" @change="handlerChange"></ClSelect>-->
<!--            <ClSelect v-model="selectValueBase1" :option="optionBase" @change="handlerChange"></ClSelect>-->

<!--            <p>slots:option</p>-->
<!--            <ClSelect v-model="selectValueBase2" @change="handlerChange">-->
<!--                <Option v-for="item in optionBase" :key="item.value" :value="item.value" :label="item.label"></Option>-->
<!--            </ClSelect>-->

<!--            <p>返回值valueLabel格式props:option</p>-->
<!--            <ClSelect v-model="selectValueBase3" valueLable :option="optionBase" @change="handlerChange"></ClSelect>-->

<!--            <p>空数据</p>-->
<!--            <ClSelect v-model="selectValueBase4" :option="optionBaseEmpty" @change="handlerChange"></ClSelect>-->

<!--        </div>-->

<!--        <div class="view">-->
<!--            <h2>禁用</h2>-->
<!--            <ClSelect v-model="selectValueDisabled1" :option="optionDisabled" disabled-->
<!--                      @change="handlerChange"></ClSelect>-->
<!--            <ClSelect v-model="selectValueDisabled2" :option="optionDisabled" @change="handlerChange"></ClSelect>-->
<!--            <ClSelect v-model="selectValueDisabled3" :option="optionDisabled" disabled multiple-->
<!--                      @change="handlerChange"></ClSelect>-->
<!--            <ClSelect v-model="selectValueDisabled4" :option="optionDisabled" multiple-->
<!--                      @change="handlerChange"></ClSelect>-->
<!--        </div>-->


<!--        <div class="view">-->
<!--            <h2>size</h2>-->
<!--            <p>mini: </p>-->
<!--            <ClSelect v-model="selectValueSizeMini" size="mini">-->
<!--                <ClOption v-for="item in optionSizeMini" :key="item.value" :value="item.value" :selected="item.selected"-->
<!--                          :disabled="item.disabled">-->
<!--                    {{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--            <p>small: </p>-->
<!--            <ClSelect v-model="selectValueSizeSmall" size="small">-->
<!--                <ClOption v-for="item in optionSizeSmall" :key="item.value" :value="item.value"-->
<!--                          :selected="item.selected" :disabled="item.disabled">-->
<!--                    {{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--            <p>default: </p>-->
<!--            <ClSelect v-model="selectValueSizeDefault">-->
<!--                <ClOption v-for="item in optionSizeDefault" :key="item.value" :value="item.value"-->
<!--                          :selected="item.selected" :disabled="item.disabled">-->
<!--                    {{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--            <p>large: </p>-->
<!--            <ClSelect v-model="selectValueSizeLarge" size="large">-->
<!--                <ClOption v-for="item in optionSizeLarge" :key="item.value" :value="item.value"-->
<!--                          :selected="item.selected" :disabled="item.disabled">-->
<!--                    {{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--        </div>-->


<!--        <div class="view">-->
<!--            <h2>可清空</h2>-->

<!--            <p>可清空：props:option</p>-->
<!--            <ClSelect v-model="selectValueClearable" :option="optionClearable" clearable-->
<!--                      @change="handlerChange"></ClSelect>-->
<!--        </div>-->


<!--        <div class="view">-->
<!--            <h2>分组</h2>-->

<!--            <p>分组：props:option</p>-->
<!--            <ClSelect v-model="selectValueGroup" :option="optionGroup" clearable @change="handlerChange"></ClSelect>-->

<!--            <p>分组：slots:option</p>-->
<!--            <ClSelect v-model="selectValueGroup1" @change="handlerChange">-->
<!--                <ClOptionGroup label="ceshi">-->
<!--                    <ClOption v-for="item in optionGroup0" :key="item.value" :value="item.value"-->
<!--                              :selected="item.selected" :disabled="item.disabled">-->
<!--                        {{item.label}}-->
<!--                    </ClOption>-->
<!--                </ClOptionGroup>-->
<!--                <ClOptionGroup label="ceshi2">-->
<!--                    <ClOption v-for="item in optionGroup1" :key="item.value" :value="item.value"-->
<!--                              :selected="item.selected" :disabled="item.disabled">-->
<!--                        {{item.label}}-->
<!--                    </ClOption>-->
<!--                </ClOptionGroup>-->
<!--            </ClSelect>-->
<!--        </div>-->


<!--        <div class="view">-->
<!--            <h2>自定义模板</h2>-->

<!--            <p>自定义模板：slots:option</p>-->
<!--            <ClSelect v-model="selectValueCustomModel1" @change="handlerChange">-->
<!--                <Option v-for="item in optionCustomModel" :key="item.value" :value="item.value" :label="item.label"-->
<!--                        :disabled="item.disabled">-->
<!--                    <i :class="item.icon" style="margin-right: 10px;"></i> {{item.label}}-->
<!--                </Option>-->
<!--            </ClSelect>-->

<!--            <p>自定义模板：props:option</p>-->
<!--            <ClSelect v-model="selectValueCustomModel2" :option="optionCustomModel" @change="handlerChange"></ClSelect>-->
<!--        </div>-->

        <div class="view">
            <h2>多选</h2>

            <p>多选：slots:option</p>
            <ClSelect v-model="selectValueMultiple1" multiple @change="handlerChange">
                <ClOption v-for="item in optionMultiple" :key="item.value" :value="item.value" :label="item.label"
                          :disabled="item.disabled">
                    {{item.label}}
                </ClOption>
            </ClSelect>

            <p>多选返回值valueLabel格式：props:option</p>
            <ClSelect v-model="selectValueMultiple2" multiple valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>

            <h2>限制多选数量 multipleLimit</h2>
            <p>多选：slots:option</p>
            <ClSelect v-model="selectValueMultiple1" multiple :multipleLimit="2" @change="handlerChange">
                <ClOption v-for="item in optionMultiple" :key="item.value" :value="item.value" :label="item.label"
                          :disabled="item.disabled">
                    {{item.label}}
                </ClOption>
            </ClSelect>

            <p>多选返回值valueLabel格式：props:option</p>
            <ClSelect v-model="selectValueMultiple2" multiple :multipleLimit="2" valueLable :option="optionMultiple"
                      @change="handlerChange"></ClSelect>
        </div>


        <div class="view">
            <h2>可搜索</h2>
            <ClSelect size="mini" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                      @change="handlerChange"></ClSelect>
            <ClSelect size="small" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                      @change="handlerChange"></ClSelect>
            <ClSelect v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                      @change="handlerChange"></ClSelect>
            <ClSelect size="large" v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                      @change="handlerChange"></ClSelect>

            <p>可搜索单选可清空slots:option</p>
            <ClSelect v-model="selectValueSearch1" filterable clearable @change="handlerChange">
                <ClOption v-for="item in optionSearch" :key="item.value" :value="item.value" :label="item.label"
                          :disabled="item.disabled">
                    <i :class="item.icon" style="margin-right: 10px;"></i>{{item.label}}
                </ClOption>
            </ClSelect>

            <p>可搜索单选可清空slots:optionGroup</p>
            <ClSelect v-model="selectValueSearch1" filterable clearable @change="handlerChange">
                <ClOptionGroup label="search1">
                    <ClOption v-for="item in optionSearchGroup0" :key="item.value" :value="item.value"
                              :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </ClOption>
                </ClOptionGroup>
                <ClOptionGroup label="search2">
                    <ClOption v-for="item in optionSearchGroup1" :key="item.value" :value="item.value"
                              :selected="item.selected" :disabled="item.disabled">
                        {{item.label}}
                    </ClOption>
                </ClOptionGroup>
            </ClSelect>

            <p>可搜索单选可清空props:option</p>
            <ClSelect v-model="selectValueSearch2" :option="optionSearch" filterable clearable
                      @change="handlerChange"></ClSelect>
            <p>可搜索多选可清空props:option</p>
            <ClSelect v-model="selectValueSearch3" :option="optionSearch" multiple filterable clearable :multipleLimit="2"
                      @change="handlerChange"></ClSelect>

            <p>可搜索单选可清空props:optionGroup</p>
            <ClSelect v-model="selectValueSearchGroup2" :option="optionSearchGroup" filterable clearable
                      @change="handlerChange"></ClSelect>

            <p>可搜索多选可清空props:optionGroup</p>
            <ClSelect v-model="selectValueSearchGroup3" :option="optionSearchGroup" multiple filterable clearable :multipleLimit="2"
                      @change="handlerChange"></ClSelect>

        </div>


<!--        <div class="view">-->
<!--            <h2>远程搜索</h2>-->
<!--            <p>远程搜索单选可清空slot:option</p>-->
<!--            <ClSelect v-model="selectValueRemote1" filterable remote clearable :loading="remoteLoading"-->
<!--                      @change="handlerChange" @remote-change="handlerChangeRemote">-->
<!--                <ClOption v-for="item in optionRemote" :key="item.value" :value="item.value" :label="item.label"-->
<!--                          :disabled="item.disabled">-->
<!--                    <i :class="item.icon" style="margin-right: 10px;"></i>{{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--            <p>远程搜索多选可清空slot:option</p>-->
<!--            <ClSelect v-model="selectValueRemote3" multiple filterable remote clearable :loading="remoteLoading"-->
<!--                      @change="handlerChange" @remote-change="handlerChangeRemote">-->
<!--                <ClOption v-for="item in optionRemote" :key="item.value" :value="item.value" :label="item.label"-->
<!--                          :disabled="item.disabled">-->
<!--                    <i :class="item.icon" style="margin-right: 10px;"></i>{{item.label}}-->
<!--                </ClOption>-->
<!--            </ClSelect>-->
<!--            <p>远程搜索多选可清空props:option</p>-->
<!--            <ClSelect v-model="selectValueRemote2" :option="optionRemote" filterable remote clearable-->
<!--                      :loading="remoteLoading" @change="handlerChange" @remote-change="handlerChangeRemote"></ClSelect>-->
<!--        </div>-->


        <div class="viewDes">
            <h3>API</h3>
            <h4>select props</h4>

            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>原生name属性</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Number, Array</b></p>
                <p><b>说明：</b>绑定的值，可以使用v-model双向绑定。多选时值为Array类型时</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：placeholder</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>占位文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>尺寸，可选值small/default/large或者不设置</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：option</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>select的选项列表。设置此项后不用再插入Option组件。值类型如：[{value: '', label: '', disabled:
                    true}],其中value为选中时的返回值，label为展示信息，disabled控制是否可选</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：transition</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可自定义下拉框的动画效果</p>
                <p><b>默认值：</b>fade</p>
            </div>
            <div class="propItem">
                <p><b>属性：multiple</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>多选</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：clearable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启清除</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：emptyText</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>数据为空时的显示文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：filterable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开始搜索（本地数据搜索）</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：remote</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启远程搜索（需要自己控制数据）</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：loading</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>远程搜索时显示loading加载中的效果</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：maxHeight</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>设置下拉框的最大高度，超出后滚动</p>
                <p><b>默认值：</b>200px</p>
            </div>
            <div class="propItem">
                <p><b>属性：placement</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>设置下拉框显示的位置</p>
                <p><b>默认值：</b>bottom-start</p>
            </div>
            <div class="propItem">
                <p><b>属性：valueLable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>默认返回值只有value。设置此项返回值为value,label组成的对象</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：dropdownMatchSelectWidth</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>下拉框宽度默认和选择框同宽，文本超出后省略。设置此项后当内容比较长时下拉框宽度自动拉伸。下拉框最小和选择框同宽</p>
                <p><b>默认值：</b>true</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>select event</h4>

            <div class="propItem">
                <p><b>事件名：change</b></p>
                <p><b>说明：</b>选中option变化时触发，默认返回value，如需返回label，详见属性valueLabel</p>
                <p><b>返回值：</b>当前项value</p>
            </div>
            <div class="propItem">
                <p><b>事件名：remote-change</b></p>
                <p><b>说明：</b>远程搜索搜索词变化时触发</p>
                <p><b>返回值：</b>搜索词</p>
            </div>
            <div class="propItem">
                <p><b>事件名：clear</b></p>
                <p><b>说明：</b>点击清空按钮时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>option props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>选项值</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：label</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>选项显示的内容。默认在无slot内容时显示此项的内容。在通过slot自定义option显示内容时，此项为必填项。默认根据此项进行搜索</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>false</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>optionGroup props</h4>

            <div class="propItem">
                <p><b>属性：label</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>分组的组名</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SelectView",
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false,
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
        computed: {},
        components: {},
        created() {
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
            maxTagText(count){
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试4',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '7',
                        label: '测试7',
                        selected: false,
                    },
                    {
                        value: '8',
                        label: '测试8',
                        selected: false,
                    },
                    {
                        value: '9',
                        label: '测试9',
                        selected: false,
                    },
                    {
                        value: '10',
                        label: '测试10',
                        selected: false,
                    },
                    {
                        value: '11',
                        label: '测试11',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false,
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
                        selected: false,
                    },
                    {
                        value: '2',
                        label: '测试2',
                        selected: false,
                    },
                    {
                        value: '3',
                        label: '测试3',
                        selected: false,
                    },
                    {
                        value: '4',
                        label: '测试5',
                        selected: false,
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
                                label: 'option1',
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
                                label: 'option2-2',
                            }
                        ]
                    },
                ];
                this.optionGroup0 = [
                    {
                        value: 'group0',
                        label: '测试group0',
                    },
                    {
                        value: 'group1',
                        label: '测试group1',
                    },
                    {
                        value: 'group2',
                        label: '测试group2',
                    },
                ];
                this.optionGroup1 = [
                    {
                        value: 'group3',
                        label: '测试group3',
                    },
                    {
                        value: 'group4',
                        label: '测试group4',
                    },
                ];

                this.optionCustomModel = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'cl-icon-home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'cl-icon-star',
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'cl-icon-button',
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'cl-icon-sound',
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'cl-icon-setting',
                    }
                ];
                this.optionSearch = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'cl-icon-home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'cl-icon-star',
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'cl-icon-button',
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'cl-icon-sound',
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'cl-icon-setting',
                    }
                ];
                this.optionSearchGroup0 = [
                    {
                        value: 'group0',
                        label: '测试group0',
                    },
                    {
                        value: 'group1',
                        label: '测试group1',
                    },
                    {
                        value: 'group2',
                        label: '测试group2',
                    },
                ];
                this.optionSearchGroup1 = [
                    {
                        value: 'group3',
                        label: '测试group3',
                    },
                    {
                        value: 'group4',
                        label: '测试group4',
                    },
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
                                selected: false,
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
                                selected: false,
                            }
                        ]
                    },
                ];

                this.optionRemote = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'cl-icon-home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'cl-icon-star',
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'cl-icon-button',
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'cl-icon-sound',
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'cl-icon-setting',
                    }
                ];
                this.optionRemoteData = [
                    {
                        value: '0',
                        label: '测试0',
                        icon: 'cl-icon-home',
                        disabled: true
                    },
                    {
                        value: '1',
                        label: '测试1',
                        icon: 'cl-icon-star',
                    },
                    {
                        value: '2',
                        label: '测试2',
                        icon: 'cl-icon-button',
                    },
                    {
                        value: '3',
                        label: '测试3',
                        icon: 'cl-icon-sound',
                    },
                    {
                        value: '4',
                        label: '测试5',
                        icon: 'cl-icon-setting',
                    }
                ];

                this.optionMultiple = [
                    {
                        value: '0',
                        label: '测试0',
                    },
                    {
                        value: '1',
                        label: '测试1',
                    },
                    {
                        value: '2',
                        label: '测试2',
                    },
                    {
                        value: '3',
                        label: '测试3',
                    },
                    {
                        value: '4',
                        label: '测试4',
                    },
                    {
                        value: '5',
                        label: '测试5',
                    },
                    {
                        value: '6',
                        label: '测试6',
                    },
                    {
                        value: '7',
                        label: '测试7',
                    },
                    {
                        value: '8',
                        label: '测试8',
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
    .SelectView {
        .view {
            /*min-height: 300px;*/
            & > * {
                margin: 0 5px;
            }
        }
    }
</style>
