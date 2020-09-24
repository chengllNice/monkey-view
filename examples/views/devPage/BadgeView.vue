<template>
    <div class="BadgeView">
        <h4>综合</h4>
        <Badge :count="badgeValue" :showZero="badgeshowZero" :dot="badgeDot">
            <Button>按钮</Button>
        </Badge>
        <br>
        <ButtonGroup>
            <Button type="primary" icon="plus" @click="handlerClick('add')"></Button>
            <Button type="primary" icon="minus" @click="handlerClick('minus')"></Button>
        </ButtonGroup>
        <m-switch v-model="badgeshowZero" width="120px">
            <span slot="open">showZero=true</span>
            <span slot="close">showZero=false</span>
        </m-switch>
        <m-switch v-model="badgeDot" width="80px">
            <span slot="open">dot=true</span>
            <span slot="close">dot=false</span>
        </m-switch>

        <h4>普通</h4>
        <Badge :count="10">
            <Button>按钮</Button>
        </Badge>
        <br>
        <Badge :count="150">
            <Button>按钮</Button>
        </Badge>

        <h4>dot点</h4>
        <Badge :count="150" dot>
            <Button>按钮dot</Button>
        </Badge>

        <h4>text</h4>
        <Badge :count="150" text="new">
            <Button>按钮Text</Button>
        </Badge>

        <h4>独立使用</h4>
        <Badge :count="10"></Badge>
        <Badge :count="10" dot></Badge>

        <h4>内置颜色</h4>
        <Badge :count="150" color="primary">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" color="error">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" color="success">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" color="warning">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" color="info">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" dot color="primary">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" dot color="error">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" dot color="success">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" dot color="warning">
            <Button>按钮Text</Button>
        </Badge>
        <Badge :count="150" dot color="info">
            <Button>按钮Text</Button>
        </Badge>
        <h4>自定义颜色</h4>
        <Badge :count="150" color="#c8c8c8">
            <Button>#c8c8c8</Button>
        </Badge>
        <Badge :count="150" color="#ffa2d3">
            <Button>#ffa2d3</Button>
        </Badge>
        <h4>多彩</h4>
        <Badge text="150" color="#c8c8c8"></Badge>
        <h4>状态status</h4>
        <Badge status="success" text="success"></Badge>
        <br>
        <Badge status="warning" text="warning"></Badge>
        <br>
        <Badge status="error" text="error"></Badge>
        <br>
        <Badge status="default" text="default"></Badge>
        <br>
        <Badge status="processing" text="processing"></Badge>
        <h4>offset偏移</h4>
        <Badge :count="20" :offset="[20, 0]">
            <Button>按钮offset</Button>
        </Badge>


        <div class="views-dev">
            <h3>API</h3>
            <h4>badge props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：count</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>-</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：overflowCount</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>-</p>
                <p><b>默认值：</b>99</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：dot</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：showZero</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：text</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义显示内容，如果设置了status则为点状态的文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：status</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值success/error/warning/processing/default</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：color</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义badge的颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：offset</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>badge的位置偏移，格式为[x,y]</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
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
