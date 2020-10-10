<template>
    <div class="dev-timeline">
        <h4>基础用法</h4>
        <Timeline>
            <TimelineItem>发布1.0版本</TimelineItem>
            <TimelineItem>发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>

        <h4>幽灵节点</h4>
        <Timeline pending>
            <TimelineItem> <Icon type="home" size="40" slot="node"></Icon>发布1.0版本</TimelineItem>
            <TimelineItem>发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>

        <h4>不同颜色的node</h4>
        <Timeline>
            <TimelineItem color="blue">发布1.0版本</TimelineItem>
            <TimelineItem color="green">发布2.0版本</TimelineItem>
            <TimelineItem color="red">发布3.0版本</TimelineItem>
            <TimelineItem color="gray">发布4.0版本</TimelineItem>
        </Timeline>

        <h4>node-type: solid,实心node</h4>
        <Timeline node-type="solid">
            <TimelineItem color="blue">发布1.0版本</TimelineItem>
            <TimelineItem color="green">发布2.0版本</TimelineItem>
            <TimelineItem color="red">发布3.0版本</TimelineItem>
            <TimelineItem color="gray">发布4.0版本</TimelineItem>
        </Timeline>

        <h4>自定义node图标</h4>
        <Timeline>
            <TimelineItem> <Icon type="home" size="14" slot="node"></Icon> 发布1.0版本</TimelineItem>
            <TimelineItem>发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>

        <h4>内容在左侧</h4>
        <Timeline position="left">
            <TimelineItem>发布1.0版本</TimelineItem>
            <TimelineItem>发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>


        <h4>position: right,内容在右侧</h4>
        <Timeline>
            <TimelineItem> <span slot="label">2020-01-01</span> <Icon type="home" size="30" slot="node"></Icon> 发布1.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-02</span> 发布2.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-03</span> 发布3.0版本</TimelineItem>
        </Timeline>

        <h4>position: left,内容在左侧</h4>
        <Timeline position="left">
            <TimelineItem> <span slot="label">2020-01-01</span> 发布1.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-02</span> 发布2.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-03</span> 发布3.0版本</TimelineItem>
        </Timeline>

        <h4>left-width: 200px,左侧宽度</h4>
        <Timeline left-width="200px">
            <TimelineItem> <span slot="label">2020-01-01</span> 发布1.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-02</span> 发布2.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-03</span> 发布3.0版本</TimelineItem>
        </Timeline>

        <h4>right-width: 200px,右侧宽度</h4>
        <Timeline right-width="200px">
            <TimelineItem> <span slot="label">2020-01-01</span> 发布1.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-02</span> 发布2.0版本</TimelineItem>
            <TimelineItem> <span slot="label">2020-01-03</span> 发布3.0版本</TimelineItem>
        </Timeline>
    </div>
</template>
