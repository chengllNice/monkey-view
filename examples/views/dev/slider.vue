<template>
    <div class="dev-slider">
        normal:
        <Slider v-model="sliderValue" @change="handleChange"></Slider>
        railColor:
        <Slider v-model="sliderValue" railColor="#ccc" disabled @change="handleChange"></Slider>
        barColor:
        <Slider v-model="sliderValue" barColor="red" disabled @change="handleChange"></Slider>
        always:
        <Slider v-model="sliderValueAlways" tooltipVisible="always" @change="handleChange"></Slider>
        never:
        <Slider v-model="sliderValueNever" tooltipVisible="never" @change="handleChange"></Slider>
        disabled:
        <Slider v-model="sliderValueDis" disabled @change="handleChange"></Slider>
        step=0.1:
        <Slider v-model="sliderValueStep" :step="0.1" @change="handleChange"></Slider>
        min:10,max:80:
        <Slider v-model="sliderValue1" :min="10" :max="80" @change="handleChange"></Slider>
        tipFormat:
        <Slider v-model="sliderValueFormat" :tipFormat="tipFormat" @change="handleChange"></Slider>

        <p>vertical</p>
        <div class="dev-slider-vertical">
            <Slider v-model="sliderValueVer" vertical @change="handleChange"></Slider>
            step=10:
            <Slider v-model="sliderValueVerStep" vertical :step="10" @change="handleChange"></Slider>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sliderValue: 10,
                sliderValueAlways: 10,
                sliderValueNever: 10,
                sliderValueStep: 10,
                sliderValueDis: 10,
                sliderValue1: 20,
                sliderValueFormat: 20,

                sliderValueVer: 10,
                sliderValueVerStep: 10
            }
        },
        methods: {
            tipFormat(value) {
                return `${value}%`
            },
            handleChange(value) {
                console.log(value, 'change')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-slider {
        & > * {
            width: 500px;
        }

        .dev-slider-vertical {
            height: 200px;
            margin: 0 50px;
            display: flex;
            padding-bottom: 50px;
        }
    }

</style>
