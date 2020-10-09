<template>
    <div class="dev-radio">
        <h4>基础--没有设置label--单独使用</h4>
        <Radio v-model="radioBase" @change="handleChange">基础</Radio>

        <h4>基础--设置label--单独使用</h4>
        <Radio v-model="radioBaseLable" label="1" @change="handleChange">基础Label</Radio>

        <h4>disabled--单独使用</h4>
        <Radio v-model="radioDisabled" disabled @change="handleChange">基础</Radio>

        <h4>size--单独使用</h4>
        <Radio v-model="radioSize" label="small" size="small" @change="handleChange">small</Radio>
        <Radio v-model="radioSize" label="default" @change="handleChange">default</Radio>
        <Radio v-model="radioSize" label="large" size="large" @change="handleChange">large</Radio>

        <h4>组合使用--使用属性options</h4>
        <RadioGroup v-model="radioGroupOptionValue" :options="radioOptions" @change="handleChange"></RadioGroup>

        <h4>组合使用--使用slot</h4>
        <RadioGroup v-model="radioGroupSlotValue" @change="handleChange">
            <Radio label="0">radio0</Radio>
            <Radio label="1">radio1</Radio>
            <Radio label="2">radio2</Radio>
            <Radio label="3">radio3</Radio>
            <Radio label="4">radio4</Radio>
        </RadioGroup>

        <h4>组合使用--size</h4>
        <RadioGroup v-model="radioGroupOptionValueSizeSmall" size="small" :options="radioOptions"
                    @change="handleChange"></RadioGroup>
        <RadioGroup v-model="radioGroupOptionValueSizeDefault" :options="radioOptions"
                    @change="handleChange"></RadioGroup>
        <RadioGroup v-model="radioGroupOptionValueSizeLarge" size="large" :options="radioOptions"
                    @change="handleChange"></RadioGroup>

        <h4>组合使用--disabled</h4>
        <RadioGroup v-model="radioGroupOptionValueDisabled" disabled :options="radioOptions"
                    @change="handleChange"></RadioGroup>

        <h4>组合使用--单独设置某项disabled</h4>
        <RadioGroup v-model="radioGroupSlotValueSingleDisabled" @change="handleChange">
            <Radio label="0" disabled>radio0--disabled</Radio>
            <Radio label="1">radio1</Radio>
            <Radio label="2">radio2</Radio>
            <Radio label="3">radio3</Radio>
            <Radio label="4">radio4</Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                radioBase: false,
                radioBaseLable: '',
                radioDisabled: false,
                radioSize: '',

                radioGroupOptionValue: '',
                radioOptions: [
                    {
                        value: '0',
                        label: '测试1'
                    },
                    {
                        value: '1',
                        label: '测试2'
                    },
                    {
                        value: '2',
                        label: '测试3'
                    },
                    {
                        value: '3',
                        label: '测试4'
                    }
                ],

                radioGroupSlotValue: '',

                radioGroupOptionValueSizeSmall: '',
                radioGroupOptionValueSizeDefault: '',
                radioGroupOptionValueSizeLarge: '',

                radioGroupOptionValueDisabled: '',

                radioGroupSlotValueSingleDisabled: ''
            }
        },
        methods: {
            handleChange(value) {
                console.log(value, 'vvvvvv')
            }
        }
    }
</script>
