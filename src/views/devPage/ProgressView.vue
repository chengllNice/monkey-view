<template>
    <div class="ProgressView">
        <h2>type=line时</h2>
        <p>percent：定义百分比</p>
        <ClProgress :percent="percentBase"></ClProgress>

        <p>status：定义状态（active）</p>
        <ClProgress :percent="percentBase" status="active"></ClProgress>

        <p>status：定义状态（success）</p>
        <ClProgress :percent="percentBase" status="success"></ClProgress>

        <p>status：定义状态（error）</p>
        <ClProgress :percent="percentBase" status="error"></ClProgress>

        <p>status：定义状态（warning）</p>
        <ClProgress :percent="percentBase" status="warning"></ClProgress>

        <p>stroke-width：定义宽度</p>
        <ClProgress :percent="percentBase" stroke-width="30px"></ClProgress>

        <p>infoInside：info信息显示内置</p>
        <ClProgress :percent="percentBase" infoInside stroke-width="30px"></ClProgress>

        <p>show-info：是否显示info信息</p>
        <ClProgress :percent="percentBase" :show-info="false"></ClProgress>

        <p>barColor：自定义bar颜色</p>
        <ClProgress :percent="percentBase" bar-color="#909399"></ClProgress>

        <p>railColor：自定义rail颜色</p>
        <ClProgress :percent="percentBase" rail-color="#e8e8e8"></ClProgress>

        <p>valueFormat：格式化info信息</p>
        <ClProgress :percent="percentBase" :valueFormat="valueFormat"></ClProgress>

        <p>slot定义info信息</p>
        <ClProgress :percent="percentBase">
            <span>slot</span>
        </ClProgress>

        <h2>type=circle时</h2>
        <p>基础</p>
        <ClProgress :percent="percentBase" type="circle"></ClProgress>

        <p>定义width</p>
        <ClProgress :percent="percentBase" type="circle" width="100"></ClProgress>

        <p>定义strokeWidth</p>
        <ClProgress :percent="percentBase" type="circle" strokeWidth="5"></ClProgress>

        <p>定义success状态</p>
        <ClProgress :percent="percentBase" type="circle" status="success"></ClProgress>

        <p>定义error状态</p>
        <ClProgress :percent="percentBase" type="circle" status="error"></ClProgress>

        <p>定义warning状态</p>
        <ClProgress :percent="percentBase" type="circle" status="warning"></ClProgress>

        <p>定义bar-color</p>
        <ClProgress :percent="percentBase" type="circle" bar-color="#909399"></ClProgress>

        <p>定义show-info</p>
        <ClProgress :percent="percentBase" type="circle" bar-color="#909399" :show-info="false"></ClProgress>
        <ClButton @click="percentHandler('add')">add</ClButton>
        <ClButton @click="percentHandler('reduce')">reduce</ClButton>
    </div>
</template>

<script>
  export default {
    name: "ProgressView",
    data() {
      return {
        percentBase: 80
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      percentHandler(type){
        if(type === 'add'){
          this.percentBase += 5;
        }else{
          this.percentBase -= 5;
        }
      },
      valueFormat(value){
        return value + '百分比'
      }
    }
  }
</script>

<style lang="scss">
    .ProgressView{
        padding: 10px 50px;
    }
</style>
