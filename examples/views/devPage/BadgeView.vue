<template>
    <div class="BadgeView">
        <h4>综合</h4>
        <ClBadge :count="badgeValue" :showZero="badgeshowZero" :dot="badgeDot">
            <ClButton>按钮</ClButton>
        </ClBadge>
        <br>
        <ClButtonGroup>
            <ClButton type="primary" icon="plus" @click="handlerClick('add')"></ClButton>
            <ClButton type="primary" icon="minus" @click="handlerClick('minus')"></ClButton>
        </ClButtonGroup>
        <ClSwitch v-model="badgeshowZero" width="120px">
            <span slot="open">showZero=true</span>
            <span slot="close">showZero=false</span>
        </ClSwitch>
        <ClSwitch v-model="badgeDot" width="80px">
            <span slot="open">dot=true</span>
            <span slot="close">dot=false</span>
        </ClSwitch>

        <h4>普通</h4>
        <ClBadge :count="10">
            <ClButton>按钮</ClButton>
        </ClBadge>
        <br>
        <ClBadge :count="150">
            <ClButton>按钮</ClButton>
        </ClBadge>

        <h4>dot点</h4>
        <ClBadge :count="150" dot>
            <ClButton>按钮dot</ClButton>
        </ClBadge>

        <h4>text</h4>
        <ClBadge :count="150" text="new">
            <ClButton>按钮Text</ClButton>
        </ClBadge>

        <h4>独立使用</h4>
        <ClBadge :count="10"></ClBadge>
        <ClBadge :count="10" dot></ClBadge>

        <h4>内置颜色</h4>
        <ClBadge :count="150" color="primary">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" color="error">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" color="success">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" color="warning">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" color="info">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" dot color="primary">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" dot color="error">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" dot color="success">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" dot color="warning">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <ClBadge :count="150" dot color="info">
            <ClButton>按钮Text</ClButton>
        </ClBadge>
        <h4>自定义颜色</h4>
        <ClBadge :count="150" color="#c8c8c8">
            <ClButton>#c8c8c8</ClButton>
        </ClBadge>
        <ClBadge :count="150" color="#ffa2d3">
            <ClButton>#ffa2d3</ClButton>
        </ClBadge>
        <h4>多彩</h4>
        <ClBadge text="150" color="#c8c8c8"></ClBadge>
        <h4>状态status</h4>
        <ClBadge status="success" text="success"></ClBadge>
        <br>
        <ClBadge status="warning" text="warning"></ClBadge>
        <br>
        <ClBadge status="error" text="error"></ClBadge>
        <br>
        <ClBadge status="default" text="default"></ClBadge>
        <br>
        <ClBadge status="processing" text="processing"></ClBadge>
        <h4>offset偏移</h4>
        <ClBadge :count="20" :offset="[20, 0]">
            <ClButton>按钮offset</ClButton>
        </ClBadge>


        <div class="viewDes">
            <h3>API</h3>
            <h4>badge props</h4>

            <div class="propItem">
                <p><b>属性：count</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>-</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：overflowCount</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>-</p>
                <p><b>默认值：</b>99</p>
            </div>
            <div class="propItem">
                <p><b>属性：dot</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：showZero</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：text</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义显示内容，如果设置了status则为点状态的文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：status</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值success/error/warning/processing/default</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：color</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义badge的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：offset</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>badge的位置偏移，格式为[x,y]</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：title</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>设置鼠标经过badge的提示，默认text或者count</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "BadgeView",
    data() {
      return {
        badgeValue: 10,
        badgeshowZero: false,
        badgeDot: false,
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClick(type){
        type === 'add' ? this.badgeValue += 10 : this.badgeValue -= 10;
      }
    }
  }
</script>
