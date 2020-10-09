<template>
    <div class="dev-badge">
        <h4>综合</h4>
        <Badge :count="badgeValue" :showZero="badgeshowZero" :dot="badgeDot">
            <Button>按钮</Button>
        </Badge>
        <br>
        <ButtonGroup>
            <Button type="primary" icon="plus" @click="handleClick('add')"></Button>
            <Button type="primary" icon="minus" @click="handleClick('minus')"></Button>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                badgeValue: 10,
                badgeshowZero: false,
                badgeDot: false
            }
        },
        methods: {
            handleClick(type) {
                type === 'add' ? this.badgeValue += 10 : this.badgeValue -= 10;
            }
        }
    }
</script>
