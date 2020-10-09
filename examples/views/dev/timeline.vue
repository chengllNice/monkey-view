<template>
    <div>
        <Timeline>
            <TimelineItem> <Icon type="home" size="16" slot="node"></Icon>发布1.0版本</TimelineItem>
            <TimelineItem>发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>

        <Timeline node-type="disc">
            <TimelineItem color="blue"> <Icon type="home" size="13" slot="node"></Icon>发布1.0版本</TimelineItem>
            <TimelineItem color="green">发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>


        <Timeline>
            <TimelineItem color="red"> <Icon type="home" size="16" slot="node"></Icon>发布1.0版本</TimelineItem>
            <TimelineItem color="green">发布2.0版本</TimelineItem>
            <TimelineItem>发布3.0版本</TimelineItem>
        </Timeline>
    </div>
</template>

<script>
    export default {
        name: "timeline"
    }
</script>

<style scoped>

</style>
