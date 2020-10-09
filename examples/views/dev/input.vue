<template>
    <div class="dev-input">
        <h2>input</h2>
        normal:
        <Input placeholder="placeholder" v-model="inputValueNormal" @change="handleChange"></Input>
        clearable:
        <Input placeholder="placeholder" v-model="inputValueClearable" clearable @change="handleChange"></Input>
        maxLength,showLimitLabel,size:mini:
        <Input placeholder="placeholder" v-model="inputValueMaxLength" size="mini" :maxLength="3000"
               showLimitLabel @change="handleChange"></Input>
        maxLength,showLimitLabel,size:small:
        <Input placeholder="placeholder" v-model="inputValueMaxLength" size="small" :maxLength="3000"
               showLimitLabel @change="handleChange"></Input>
        maxLength,showLimitLabel,size:default:
        <Input placeholder="placeholder" v-model="inputValueMaxLength" size="default" :maxLength="3000"
               showLimitLabel @change="handleChange"></Input>
        maxLength,showLimitLabel,size:large:
        <Input placeholder="placeholder" v-model="inputValueMaxLength" size="large" :maxLength="3000"
               showLimitLabel @change="handleChange"></Input>
        disabled:
        <Input v-model="inputValueDisabled" placeholder="placeholder" disabled @change="handleChange"></Input>
        mini:
        <Input v-model="inputValueMini" placeholder="placeholder" size="mini" @change="handleChange"></Input>
        small:
        <Input v-model="inputValueSmall" placeholder="placeholder" size="small" @change="handleChange"></Input>
        large:
        <Input v-model="inputValueLarge" placeholder="placeholder" size="large" @change="handleChange"></Input>
        prefix
        <Input v-model="inputValuePrefix" placeholder="placeholder" prefix="home"
               @change="handleChange"></Input>
        suffix
        <Input v-model="inputValueSuffix" placeholder="placeholder" suffix="home"
               @change="handleChange"></Input>
        suffix,disabled
        <Input v-model="inputValueSuffixDisabled" placeholder="placeholder" suffix="home" disabled
               @change="handleChange"></Input>
        prepend
        <Input v-model="inputValuePrepend" placeholder="placeholder" @change="handleChange"><span
                slot="prepend">.com</span>
        </Input>
        prepend,size=small
        <Input v-model="inputValuePrependSmall" placeholder="placeholder" size="small" @change="handleChange">
            <span slot="prepend">.com</span></Input>
        append
        <Input v-model="inputValueAppend" placeholder="placeholder" @change="handleChange"><span
                slot="append">.com</span>
        </Input>
        append,size=small
        <Input v-model="inputValueAppendSmall" placeholder="placeholder" size="small" @change="handleChange"><span
                slot="append">.com</span></Input>
        prepend,append, size:mini
        <Input placeholder="placeholder" v-model="valuePrepend" size="mini">
            <span slot="prepend">http://</span>
            <span slot="append">.com</span>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valueAppend" size="mini">
            <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"
                    :option="inputPrependSelectOptions"></Select>
            <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"
                    :option="inputAppendSelectOptions"></Select>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valuePrepend" size="mini">
            <Icon slot="append" type="setting"></Icon>
        </Input>

        prepend,append, size:small
        <Input placeholder="placeholder" v-model="valuePrepend" size="small">
            <span slot="prepend">http://</span>
            <span slot="append">.com</span>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valueAppend" size="small">
            <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"
                    :option="inputPrependSelectOptions"></Select>
            <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"
                    :option="inputAppendSelectOptions"></Select>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valuePrepend" size="small">
            <Icon slot="append" type="setting"></Icon>
        </Input>

        prepend,append, size:default
        <Input placeholder="placeholder" v-model="valuePrepend" size="default">
            <span slot="prepend">http://</span>
            <span slot="append">.com</span>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valueAppend" size="default">
            <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"
                    :option="inputPrependSelectOptions"></Select>
            <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"
                    :option="inputAppendSelectOptions"></Select>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valuePrepend" size="default">
            <Icon slot="append" type="setting"></Icon>
        </Input>

        prepend,append, size:large
        <Input placeholder="placeholder" v-model="valuePrepend" size="large">
            <span slot="prepend">http://</span>
            <span slot="append">.com</span>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valueAppend" size="large">
            <Select slot="prepend" style="width: 70px;" v-model="inputPrependSelect"
                    :option="inputPrependSelectOptions"></Select>
            <Select slot="append" style="width: 70px;" v-model="inputAppendSelect"
                    :option="inputAppendSelectOptions"></Select>
        </Input>
        <br>
        <Input placeholder="placeholder" v-model="valuePrepend" size="large">
            <Icon slot="append" type="setting"></Icon>
        </Input>

        <h2>password</h2>
        <Input v-model="passwordValue" placeholder="placeholder" type="password" @change="handleChange"></Input>
        disabled:
        <Input v-model="passwordValueDisabled" placeholder="placeholder" type="password" disabled
               @change="handleChange"></Input>
        showPasswordIcon=false:
        <Input v-model="passwordValueShowPasswordIcon" placeholder="placeholder" type="password"
               :showPasswordIcon="false" @change="handleChange"></Input>

        <h2>number</h2>
        默认step=1:
        <Input placeholder="placeholder" v-model="numberValue" type="number"></Input>
        默认step=1,disabled
        <Input placeholder="placeholder" v-model="numberValueDisabled" type="number" disabled></Input>
        step=2:
        <Input placeholder="placeholder" v-model="numberValueStep" type="number" :step="2"></Input>
        step=false:
        <Input placeholder="placeholder" v-model="numberValueStepFalse" type="number" :step="false"></Input>
        stepType=right:
        <Input placeholder="placeholder" v-model="numberValueStepType" type="number" stepType="right"></Input>
        stepType=right,size=large:
        <Input placeholder="placeholder" v-model="numberValueStepTypeLarge" type="number" stepType="right"
               size="large"></Input>
        min:-50,max:100
        <Input placeholder="placeholder" v-model="numberValueMinMax" type="number" :min="-50"
               :max='100'></Input>
        小数位precision:2
        <Input placeholder="placeholder" v-model="numberValuePrecision2" type="number" :precision="2"></Input>
        小数位precision:0
        <Input placeholder="placeholder" v-model="numberValuePrecision" type="number" :precision="0"></Input>
        size:small:
        <Input placeholder="placeholder" v-model="numberValueSmall" type="number" size="small"></Input>
        size:large
        <Input placeholder="placeholder" v-model="numberValueLarge" type="number" size="large"></Input>

        <h2>search</h2>
        <Input v-model="searchValueBase" placeholder="placeholder" type="search" @change="handleChange"
               @enter="changeEnter"></Input>
        suffixButton
        <Input v-model="searchValueSuffixButton" placeholder="placeholder" type="search" suffixButton></Input>
        suffixButton,size:small
        <Input v-model="searchValueSuffixButtonSmall" placeholder="placeholder" type="search" size="small"
               suffixButton></Input>
        suffixButton,disabled
        <Input v-model="searchValueSuffixButtonDisabled" placeholder="placeholder" type="search" suffixButton
               disabled></Input>
        suffixButton:search
        <Input v-model="searchValueSuffixButtonText" placeholder="placeholder" type="search"
               suffixButton="search"></Input>

        <h2>textarea</h2>
        <Input v-model="textareaValueBase" placeholder="placeholder" type="textarea"></Input>
        disabled
        <Input v-model="textareaValueDisabled" placeholder="placeholder" type="textarea" disabled></Input>
        maxLength:20
        <Input v-model="textareaValueMaxLength" placeholder="placeholder" type="textarea"
               :maxLength="20"></Input>
        maxLength:20
        <Input v-model="textareaValueMaxLength" size="mini" placeholder="placeholder" type="textarea"
               :maxLength="20" showLimitLabel></Input>
        maxLength:20
        <Input v-model="textareaValueMaxLength" size="small" placeholder="placeholder" type="textarea"
               :maxLength="20" showLimitLabel></Input>
        maxLength:20
        <Input v-model="textareaValueMaxLength" size="large" placeholder="placeholder" type="textarea"
               :maxLength="20" showLimitLabel></Input>
        maxLength:20,showLimitLabel
        <Input v-model="textareaValueMaxLengthShowLimitLabel" placeholder="placeholder" type="textarea"
               :maxLength="20" showLimitLabel></Input>
        rows:5, cols:300
        <Input v-model="textareaValueRowsCols" placeholder="placeholder" type="textarea" :rows="5"
               :cols="30"></Input>
        autosize:true
        <Input v-model="textareaValueAutosize" placeholder="placeholder" type="textarea" autosize :maxLength="20"
               showLimitLabel></Input>
        autosize:{minRows: 2, maxRows: 5}
        <Input v-model="textareaValueAutosizeObject" placeholder="placeholder" type="textarea"
               :autosize="{minRows: 2, maxRows: 5}"></Input>
        size:mini
        <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="mini"></Input>
        size:small
        <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="small"></Input>
        size:default
        <Input v-model="textareaValueSmall" placeholder="placeholder" type="textarea" size="default"></Input>
        size:large
        <Input v-model="textareaValueLarge" placeholder="placeholder" type="textarea" size="large"></Input>
    </div>
</template>

<script>
    export default {
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
                        value: '0'
                    },
                    {
                        label: 'https://',
                        value: '1'
                    }
                ],
                inputAppendSelect: '0',
                inputAppendSelectOptions: [
                    {
                        label: '.com',
                        value: '0'
                    },
                    {
                        label: '.cn',
                        value: '1'
                    },
                    {
                        label: '.net',
                        value: '2'
                    },
                    {
                        label: '.org',
                        value: '3'
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
                textareaValueLarge: ''
            }
        },
        methods: {
            handleChange(value) {
                console.log(value, 'vvvvvv')
            },
            changeEnter(value) {
                console.log(value, 'changeEnter')
            }
        }
    }
</script>
