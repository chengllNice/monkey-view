<template>
    <div class="InputView">
<!--        <div>-->
<!--            <h2>input</h2>-->
<!--            normal:-->
<!--            <Input placeholder="placeholder" v-model="inputValueNormal" @change="changHandler"></Input>-->
<!--            clearable:-->
            <Input placeholder="placeholder" v-model="inputValueClearable" clearable @change="changHandler"></Input>
<!--            maxLength,showLimitLabel,size:mini:-->
<!--            <Input placeholder="placeholder" v-model="inputValueMaxLength" size="mini" :maxLength="3000"-->
<!--                     showLimitLabel @change="changHandler"></Input>-->
<!--            maxLength,showLimitLabel,size:small:-->
<!--            <Input placeholder="placeholder" v-model="inputValueMaxLength" size="small" :maxLength="3000"-->
<!--                     showLimitLabel @change="changHandler"></Input>-->
<!--            maxLength,showLimitLabel,size:default:-->
<!--            <Input placeholder="placeholder" v-model="inputValueMaxLength" size="default" :maxLength="3000"-->
<!--                     showLimitLabel @change="changHandler"></Input>-->
<!--            maxLength,showLimitLabel,size:large:-->
<!--            <Input placeholder="placeholder" v-model="inputValueMaxLength" size="large" :maxLength="3000"-->
<!--                     showLimitLabel @change="changHandler"></Input>-->
<!--            disabled:-->
<!--            <Input v-model="inputValueDisabled" placeholder="placeholder" disabled @change="changHandler"></Input>-->
<!--            mini:-->
<!--            <Input v-model="inputValueMini" placeholder="placeholder" size="mini" @change="changHandler"></Input>-->
<!--            small:-->
<!--            <Input v-model="inputValueSmall" placeholder="placeholder" size="small" @change="changHandler"></Input>-->
<!--            large:-->
<!--            <Input v-model="inputValueLarge" placeholder="placeholder" size="large" @change="changHandler"></Input>-->
<!--            prefix-->
<!--            <Input v-model="inputValuePrefix" placeholder="placeholder" prefix="home"-->
<!--                     @change="changHandler"></Input>-->
<!--            suffix-->
<!--            <Input v-model="inputValueSuffix" placeholder="placeholder" suffix="home"-->
<!--                     @change="changHandler"></Input>-->
<!--            suffix,disabled-->
<!--            <Input v-model="inputValueSuffixDisabled" placeholder="placeholder" suffix="home" disabled-->
<!--                     @change="changHandler"></Input>-->
<!--            prepend-->
<!--            <Input v-model="inputValuePrepend" placeholder="placeholder" @change="changHandler"><span slot="prepend">.com</span>-->
<!--            </Input>-->
<!--            prepend,size=small-->
<!--            <Input v-model="inputValuePrependSmall" placeholder="placeholder" size="small" @change="changHandler">-->
<!--                <span slot="prepend">.com</span></Input>-->
<!--            append-->
<!--            <Input v-model="inputValueAppend" placeholder="placeholder" @change="changHandler"><span slot="append">.com</span>-->
<!--            </Input>-->
<!--            append,size=small-->
<!--            <Input v-model="inputValueAppendSmall" placeholder="placeholder" size="small" @change="changHandler"><span-->
<!--                    slot="append">.com</span></Input>-->
<!--            prepend,append, size:mini-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="mini">-->
<!--                <span slot="prepend">http://</span>-->
<!--                <span slot="append">.com</span>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valueAppend" size="mini">-->
<!--                <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"-->
<!--                           :option="inputPrependSelectOptions"></Select>-->
<!--                <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"-->
<!--                           :option="inputAppendSelectOptions"></Select>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="mini">-->
<!--                <Icon slot="append" type="setting"></Icon>-->
<!--            </Input>-->

<!--            prepend,append, size:small-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="small">-->
<!--                <span slot="prepend">http://</span>-->
<!--                <span slot="append">.com</span>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valueAppend" size="small">-->
<!--                <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"-->
<!--                           :option="inputPrependSelectOptions"></Select>-->
<!--                <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"-->
<!--                           :option="inputAppendSelectOptions"></Select>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="small">-->
<!--                <Icon slot="append" type="setting"></Icon>-->
<!--            </Input>-->

<!--            prepend,append, size:default-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="default">-->
<!--                <span slot="prepend">http://</span>-->
<!--                <span slot="append">.com</span>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valueAppend" size="default">-->
<!--                <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"-->
<!--                           :option="inputPrependSelectOptions"></Select>-->
<!--                <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"-->
<!--                           :option="inputAppendSelectOptions"></Select>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="default">-->
<!--                <Icon slot="append" type="setting"></Icon>-->
<!--            </Input>-->

<!--            prepend,append, size:large-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="large">-->
<!--                <span slot="prepend">http://</span>-->
<!--                <span slot="append">.com</span>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valueAppend" size="large">-->
<!--                <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"-->
<!--                           :option="inputPrependSelectOptions"></Select>-->
<!--                <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"-->
<!--                           :option="inputAppendSelectOptions"></Select>-->
<!--            </Input>-->
<!--            <br>-->
<!--            <Input placeholder="placeholder" v-model="valuePrepend" size="large">-->
<!--                <Icon slot="append" type="setting"></Icon>-->
<!--            </Input>-->

<!--            <h2>password</h2>-->
<!--            <Input v-model="passwordValue" placeholder="placeholder" type="password" @change="changHandler"></Input>-->
<!--            disabled:-->
<!--            <Input v-model="passwordValueDisabled" placeholder="placeholder" type="password" disabled-->
<!--                     @change="changHandler"></Input>-->
<!--            showPasswordIcon=false:-->
<!--            <Input v-model="passwordValueShowPasswordIcon" placeholder="placeholder" type="password"-->
<!--                     :showPasswordIcon="false" @change="changHandler"></Input>-->

<!--            <h2>number</h2>-->
<!--            默认step=1:-->
<!--            <Input placeholder="placeholder" v-model="numberValue" type="number"></Input>-->
<!--            默认step=1,disabled-->
<!--            <Input placeholder="placeholder" v-model="numberValueDisabled" type="number" disabled></Input>-->
<!--            step=2:-->
<!--            <Input placeholder="placeholder" v-model="numberValueStep" type="number" :step="2"></Input>-->
<!--            step=false:-->
<!--            <Input placeholder="placeholder" v-model="numberValueStepFalse" type="number" :step="false"></Input>-->
<!--            stepType=right:-->
<!--            <Input placeholder="placeholder" v-model="numberValueStepType" type="number" stepType="right"></Input>-->
<!--            stepType=right,size=large:-->
<!--            <Input placeholder="placeholder" v-model="numberValueStepTypeLarge" type="number" stepType="right"-->
<!--                     size="large"></Input>-->
<!--            min:-50,max:100-->
<!--            <Input placeholder="placeholder" v-model="numberValueMinMax" type="number" :min="-50"-->
<!--                     :max='100'></Input>-->
<!--            小数位precision:2-->
<!--            <Input placeholder="placeholder" v-model="numberValuePrecision2" type="number" :precision="2"></Input>-->
<!--            小数位precision:0-->
<!--            <Input placeholder="placeholder" v-model="numberValuePrecision" type="number" :precision="0"></Input>-->
<!--            size:small:-->
<!--            <Input placeholder="placeholder" v-model="numberValueSmall" type="number" size="small"></Input>-->
<!--            size:large-->
<!--            <Input placeholder="placeholder" v-model="numberValueLarge" type="number" size="large"></Input>-->

<!--            <h2>search</h2>-->
<!--            <Input v-model="searchValueBase" placeholder="placeholder" type="search" @change="changHandler"-->
<!--                     @enter="changeEnter"></Input>-->
<!--            suffixButton-->
<!--            <Input v-model="searchValueSuffixButton" placeholder="placeholder" type="search" suffixButton></Input>-->
<!--            suffixButton,size:small-->
<!--            <Input v-model="searchValueSuffixButtonSmall" placeholder="placeholder" type="search" size="small"-->
<!--                     suffixButton></Input>-->
<!--            suffixButton,disabled-->
<!--            <Input v-model="searchValueSuffixButtonDisabled" placeholder="placeholder" type="search" suffixButton-->
<!--                     disabled></Input>-->
<!--            suffixButton:search-->
<!--            <Input v-model="searchValueSuffixButtonText" placeholder="placeholder" type="search"-->
<!--                     suffixButton="search"></Input>-->


<!--            <h2>textarea</h2>-->
<!--            <Input v-model="textareaValueBase" placeholder="placeholder" type="textarea"></Input>-->
<!--            disabled-->
<!--            <Input v-model="textareaValueDisabled" placeholder="placeholder" type="textarea" disabled></Input>-->
<!--            maxLength:20-->
<!--            <Input v-model="textareaValueMaxLength" placeholder="placeholder" type="textarea"-->
<!--                     :maxLength="20"></Input>-->
<!--            maxLength:20-->
<!--            <Input v-model="textareaValueMaxLength" size="mini" placeholder="placeholder" type="textarea"-->
<!--                     :maxLength="20" showLimitLabel></Input>-->
<!--            maxLength:20-->
<!--            <Input v-model="textareaValueMaxLength" size="small" placeholder="placeholder" type="textarea"-->
<!--                     :maxLength="20" showLimitLabel></Input>-->
<!--            maxLength:20-->
<!--            <Input v-model="textareaValueMaxLength" size="large" placeholder="placeholder" type="textarea"-->
<!--                     :maxLength="20" showLimitLabel></Input>-->
<!--            maxLength:20,showLimitLabel-->
<!--            <Input v-model="textareaValueMaxLengthShowLimitLabel" placeholder="placeholder" type="textarea"-->
<!--                     :maxLength="20" showLimitLabel></Input>-->
<!--            rows:5, cols:300-->
<!--            <Input v-model="textareaValueRowsCols" placeholder="placeholder" type="textarea" :rows="5"-->
<!--                     :cols="30"></Input>-->
<!--            autosize:true-->
<!--            <Input v-model="textareaValueAutosize" placeholder="placeholder" type="textarea" autosize :maxLength="20"-->
<!--                     showLimitLabel></Input>-->
<!--            autosize:{minRows: 2, maxRows: 5}-->
<!--            <Input v-model="textareaValueAutosizeObject" placeholder="placeholder" type="textarea"-->
<!--                     :autosize="{minRows: 2, maxRows: 5}"></Input>-->
<!--            size:mini-->
<!--            <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="mini"></Input>-->
<!--            size:small-->
<!--            <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="small"></Input>-->
<!--            size:default-->
<!--            <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="default"></Input>-->
<!--            size:large-->
<!--            <Input v-model="textareaValueLarge" placeholder="placeholder" type="textarea" size="large"></Input>-->
<!--        </div>-->


        <div class="views-dev">
            <h3>API</h3>
            <h4>input props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：type</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值input/number/search/password/textarea</p>
                <p><b>默认值：</b>input</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>原生name属性</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>绑定的值，可以使用v-model双向绑定。</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：readonly</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>只读属性</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：placeholder</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>占位文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>尺寸，可选值small/default/large或者不设置</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：min</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>最小值。type类型为number时有用，设置可输入的最小值</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：max</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>最大值。type类型为number时有用，设置可输入的最大值</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：precision</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>保留小数点位数。type类型为number时有用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：minLength</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>暂时不支持</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：maxLength</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>可输入的最大字符长度.input和textarea时有效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：showLimitLabel</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否显示限制。为true时会在输入框或者textarea尾部显示当前字符长度和限制长度manLength。该值需要和maxLength配合使用。</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：autosize</b></p>
                <p><b>类型：Boolean, Object</b></p>
                <p><b>说明：</b>type为textarea时有效。自适应内容高度，可设置对象，如{minRows: 2, maxRows: 6}</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：rows</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>type为textarea时有效。默认行数，超出时显示滚动条</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：cols</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>type为textarea时有效。默认列数</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：maxLength</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>可输入的最大字符长度.input和textarea时有效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：resize</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>暂时不支持</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：showPasswordIcon</b></p>
                <p><b>类型：Boolean, Object</b></p>
                <p><b>说明：</b>type为password时尾部显示控制字符显示的icon图标。false时不显示。可设置对象，设置icon，如：{close: 'close', open:
                    'square-plus'}</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：suffix</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>输入框尾部图标。textarea时无效。type为search时默认显示搜索图标</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：prefix</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>输入框头部图标。textarea时无效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：suffixButton</b></p>
                <p><b>类型：Boolean, String</b></p>
                <p><b>说明：</b>type为search时有效。定义搜索按钮，true时显示纯图标的按钮，string时可定义按钮的文字</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：clearable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>显示清除图标。type为textarea时无效</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：step</b></p>
                <p><b>类型：Boolean, Number</b></p>
                <p><b>说明：</b>type为number时，每次改变的步数，可以是小数。false时不显示控制按钮， true时显示控制按钮，默认显示左右按钮</p>
                <p><b>默认值：</b>1</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：stepType</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>type为number时，控制按钮显示的位置。可选值right</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：isSlice</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>暂时不支持</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：inputStyle</b></p>
                <p><b>类型：Object</b></p>
                <p><b>说明：</b>输入框的样式，type为textarea时无效</p>
                <p><b>默认值：</b>{}</p>
            </div>

        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>input event</h4>

            <div class="views-dev-prop-item">
                <p><b>事件名：change</b></p>
                <p><b>说明：</b>数据改变时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：blur</b></p>
                <p><b>说明：</b>失去焦点时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：focus</b></p>
                <p><b>说明：</b>获取焦点时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：enter</b></p>
                <p><b>说明：</b>按下回车键时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：search</b></p>
                <p><b>说明：</b>按下搜索或回车键时触发。search状态下有用</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：clear</b></p>
                <p><b>说明：</b>开始clearable时有用。点击清空按钮时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>事件名：clear</b></p>
                <p><b>说明：</b>开始clearable时有用。点击清空按钮时触发</p>
                <p><b>返回值：</b>-</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>input slot</h4>

            <div class="views-dev-prop-item">
                <p><b>名称：prepend</b></p>
                <p><b>说明：</b>前置内容。type为textarea时无效</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：prefix</b></p>
                <p><b>说明：</b>输入框头部内容。设置此项内容后内置的prefix无效。type为textarea时无效</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：suffix</b></p>
                <p><b>说明：</b>输入框尾部内容。设置此项内容后会导致内置suffix的无效。type为textarea时无效</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：append</b></p>
                <p><b>说明：</b>后置内容。设置此项内容后suffixButton无效。type为textarea时无效</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputView",
        data() {
            return {
                inputValue: 'inputValue',
                inputValueNormal: '',
                inputValueClearable: '',
                inputValueMaxLength: '',
                inputValueDisabled: '',
                inputValueMini: '',
                inputValueSmall: '',
                inputValueLarge: '',
                inputValuePrefix: '',
                inputValueSuffix: '',
                inputValueSuffixDisabled: '',
                inputValuePrepend: '',
                inputValuePrependSmall: '',
                inputValueAppend: '',
                inputValueAppendSmall: '',

                valuePrepend: '',
                valueAppend: '',
                inputPrependSelect: '0',
                inputPrependSelectOptions: [
                    {
                        label: 'http://',
                        value: '0',
                    },
                    {
                        label: 'https://',
                        value: '1',
                    }
                ],
                inputAppendSelect: '0',
                inputAppendSelectOptions: [
                    {
                        label: '.com',
                        value: '0',
                    },
                    {
                        label: '.cn',
                        value: '1',
                    },
                    {
                        label: '.net',
                        value: '2',
                    },
                    {
                        label: '.org',
                        value: '3',
                    }
                ],

                passwordValue: '',
                passwordValueDisabled: '',
                passwordValueShowPasswordIcon: '',

                numberValue: '',
                numberValueDisabled: '',
                numberValueStep: '',
                numberValueStepFalse: '',
                numberValueStepType: '',
                numberValueStepTypeLarge: '',
                numberValueMinMax: '',
                numberValuePrecision2: '',
                numberValuePrecision: '',
                numberValueSmall: '',
                numberValueLarge: '',

                searchValueBase: '',
                searchValueSuffixButton: '',
                searchValueSuffixButtonSmall: '',
                searchValueSuffixButtonDisabled: '',
                searchValueSuffixButtonText: '',

                textareaValueBase: '',
                textareaValueDisabled: '',
                textareaValueMaxLength: '',
                textareaValueMaxLengthShowLimitLabel: '',
                textareaValueRowsCols: '',
                textareaValueAutosize: '',
                textareaValueAutosizeObject: '',
                textareaValueSmall: '',
                textareaValueLarge: '',
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {
            changHandler(value) {
                console.log(value, 'vvvvvv')
            },
            changeEnter(value) {
                console.log(value, 'changeEnter')
            },
        }
    }
</script>

<style scoped>

</style>
