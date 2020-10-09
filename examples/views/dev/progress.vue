<template>
    <div class="dev-progress">
        <h2>type=line时</h2>
        <p>percent：定义百分比</p>
        <Progress :percent="percentBase"></Progress>

        <p>status：定义状态（active）</p>
        <Progress :percent="percentBase" status="active"></Progress>

        <p>status：定义状态（success）</p>
        <Progress :percent="percentBase" status="success"></Progress>

        <p>status：定义状态（error）</p>
        <Progress :percent="percentBase" status="error"></Progress>

        <p>status：定义状态（warning）</p>
        <Progress :percent="percentBase" status="warning"></Progress>

        <p>stroke-width：定义宽度</p>
        <Progress :percent="percentBase" stroke-width="30px"></Progress>

        <p>infoInside：info信息显示内置</p>
        <Progress :percent="percentBase" infoInside stroke-width="30px"></Progress>

        <p>show-info：是否显示info信息</p>
        <Progress :percent="percentBase" :show-info="false"></Progress>

        <p>barColor：自定义bar颜色</p>
        <Progress :percent="percentBase" bar-color="#909399"></Progress>

        <p>railColor：自定义rail颜色</p>
        <Progress :percent="percentBase" rail-color="#e8e8e8"></Progress>

        <p>valueFormat：格式化info信息</p>
        <Progress :percent="percentBase" :valueFormat="valueFormat"></Progress>

        <p>slot定义info信息</p>
        <Progress :percent="percentBase">
            <span>slot</span>
        </Progress>

        <h2>type=circle时</h2>
        <p>基础</p>
        <Progress :percent="percentBase" type="circle"></Progress>

        <p>定义width</p>
        <Progress :percent="percentBase" type="circle" width="100"></Progress>

        <p>定义strokeWidth</p>
        <Progress :percent="percentBase" type="circle" strokeWidth="5"></Progress>

        <p>定义success状态</p>
        <Progress :percent="percentBase" type="circle" status="success"></Progress>

        <p>定义error状态</p>
        <Progress :percent="percentBase" type="circle" status="error"></Progress>

        <p>定义warning状态</p>
        <Progress :percent="percentBase" type="circle" status="warning"></Progress>

        <p>定义bar-color</p>
        <Progress :percent="percentBase" type="circle" bar-color="#909399"></Progress>

        <p>定义show-info</p>
        <Progress :percent="percentBase" type="circle" bar-color="#909399" :show-info="false"></Progress>
        <Button @click="handlePercent('add')">add</Button>
        <Button @click="handlePercent('reduce')">reduce</Button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                percentBase: 80
            }
        },
        methods: {
            handlePercent(type) {
                if (type === 'add') {
                    this.percentBase += 5;
                } else {
                    this.percentBase -= 5;
                }
            },
            valueFormat(value) {
                return value + '百分比'
            }
        }
    }
</script>

<style lang="scss">
    .dev-progress {
        padding: 10px 50px;
    }
</style>
