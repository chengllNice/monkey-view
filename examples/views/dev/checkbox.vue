<template>
    <div class="dev-checkbox">
        <h4>基础</h4>
        <Checkbox v-model="checkboxBase" @change="checkboxChange">基础</Checkbox>

        <h4>disabled</h4>
        <Checkbox v-model="checkboxDisabled" disabled @change="checkboxChange">disabled</Checkbox>

        <h4>设置true-value和false-value</h4>
        <Checkbox v-model="checkboxCustom" @change="checkboxChange" trueValue="1" falseValue="0">
            设置true-value和false-value
        </Checkbox>

        <h4>size</h4>
        <Checkbox v-model="checkboxSmall" @change="checkboxChange" size="small">small</Checkbox>
        <Checkbox v-model="checkboxDefault" @change="checkboxChange">default</Checkbox>
        <Checkbox v-model="checkboxLarge" @change="checkboxChange" size="large">large</Checkbox>

        <h4>indeterminate状态</h4>
        <Checkbox v-model="checkboxIndeterminate" indeterminate @change="checkboxChange">indeterminate</Checkbox>

        <h4>复选框组--设置属性option</h4>
        <CheckboxGroup v-model="checkboxGroupOptionValue" :options="checkboxGroupOption"
                       @change="checkboxChange"></CheckboxGroup>

        <h4>复选框组--slot插槽</h4>
        <CheckboxGroup size="mini" v-model="checkboxGroupSlotValue" @change="checkboxChange">
            <Checkbox label="checkbox1">测试Group1</Checkbox>
            <Checkbox label="checkbox2">测试Group2</Checkbox>
            <Checkbox label="checkbox3">测试Group3</Checkbox>
            <Checkbox label="checkbox4">测试Group4</Checkbox>
        </CheckboxGroup>

        <h4>复选框组--disabled</h4>
        <CheckboxGroup v-model="checkboxGroupDisabled" disabled @change="checkboxChange">
            <Checkbox label="checkbox1">测试Group1</Checkbox>
            <Checkbox label="checkbox2">测试Group2</Checkbox>
            <Checkbox label="checkbox3">测试Group3</Checkbox>
            <Checkbox label="checkbox4">测试Group4</Checkbox>
        </CheckboxGroup>

        <h4>复选框组--单独设置某项disabled</h4>
        <CheckboxGroup v-model="checkboxGroupSingleDisabled" @change="checkboxChange">
            <Checkbox label="checkbox1">测试Group1</Checkbox>
            <Checkbox label="checkbox2" disabled>测试Group2</Checkbox>
            <Checkbox label="checkbox3">测试Group3</Checkbox>
            <Checkbox label="checkbox4">测试Group4</Checkbox>
        </CheckboxGroup>

        <h4>全选</h4>
        <Checkbox v-model="checkboxAll" :indeterminate="indeterminateAll" @change="checkboxChangeAll">全选</Checkbox>
        <br>
        <CheckboxGroup v-model="checkboxGroupAll" :options="checkboxGroupOption"
                       @change="checkboxChangeAllChildren"></CheckboxGroup>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                checkboxBase: true,
                checkboxDisabled: false,
                checkboxCustom: '0',
                checkboxSmall: false,
                checkboxDefault: false,
                checkboxLarge: false,
                checkboxIndeterminate: false,

                checkboxGroupOptionValue: ['复选框value1'],
                checkboxGroupOption: [
                    {
                        label: '复选框1',
                        value: '复选框value1'
                    },
                    {
                        label: '复选框2',
                        value: '复选框value2'
                    },
                    {
                        label: '复选框3',
                        value: '复选框value3'
                    },
                    {
                        label: '复选框4',
                        value: '复选框value5'
                    }
                ],

                checkboxGroupSlotValue: [],

                checkboxGroupDisabled: [],

                checkboxGroupSingleDisabled: [],

                checkboxAll: false,
                indeterminateAll: false,
                checkboxGroupAll: []
            }
        },
        methods: {
            checkboxChange(value) {
                console.log(value, 'vvvcheckboxvvv')
            },
            checkboxChangeAllChildren() {
                if (this.checkboxGroupAll.length === this.checkboxGroupOption.length) {
                    this.checkboxAll = true;
                } else if (this.checkboxGroupAll.length && this.checkboxGroupAll.length !== this.checkboxGroupOption.length) {
                    this.indeterminateAll = true;
                    this.checkboxAll = false;
                } else {
                    this.checkboxAll = false;
                    this.indeterminateAll = false;
                }
            },
            checkboxChangeAll() {
                if (this.checkboxAll) {
                    this.checkboxGroupOption.forEach(item => {
                        this.checkboxGroupAll.push(item.value)
                    })
                } else {
                    this.checkboxGroupAll = [];
                    this.indeterminateAll = false;
                }
            }
        }
    }
</script>
