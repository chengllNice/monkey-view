<template>
    <div class="dev-switch">
        <p>基础</p>
        <m-switch size="small" @change="handleChange"></m-switch>
        <m-switch v-model="defaultValue" @change="handleChange"></m-switch>
        <m-switch size="large" @change="handleChange"></m-switch>

        <p>disabled</p>
        <m-switch disabled @change="handleChange"></m-switch>
        <m-switch disabled v-model="disabledValue" @change="handleChange"></m-switch>

        <p>slot</p>
        <m-switch size="small" @change="handleChange">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </m-switch>
        <m-switch @change="handleChange">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </m-switch>
        <m-switch size="large" @change="handleChange">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </m-switch>

        <p>自定义背景色</p>
        <m-switch v-model="defaultValue" checkedColor="red" @change="handleChange"></m-switch>

        <p>自定义宽度</p>
        <m-switch v-model="defaultValue" width="80px" @change="handleChange">
            <span slot="open">已经开启</span>
            <span slot="close">已经关闭</span>
        </m-switch>

        <p>loading状态</p>
        <m-switch v-model="defaultValue" :loading="true" @change="handleChange"></m-switch>

        <p>定义trueValue和falseValue</p>
        <m-switch v-model="value" trueValue="1" falseValue="0" @change="handleChange"></m-switch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                disabledValue: true,
                defaultValue: true,
                value: '0'
            }
        },
        methods: {
            handleChange(value) {
                console.log(value, 'switch--')
            }
        }
    }
</script>
