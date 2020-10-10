<template>
    <div class="dev-steps">
        <Steps :active="1">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" size="small">
            <Step>
                <span slot="title">开始</span>
                <span slot="description">descriptiondescriptiondescriptiondescriptiondescriptiondescription</span>
            </Step>
            <Step>
                <span slot="title">进行中</span>
                <span slot="description">这里是该步骤的描述信息这里是该步骤的描述信息</span>
            </Step>
            <Step>
                <span slot="title">已完成</span>
                <span slot="description">这里是该步骤的描述信息这里是该步骤的描述信息</span>
            </Step>
        </Steps>


        <Steps :active="1">
            <Step icon="home" title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step icon="time" title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step icon="loading" title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" size="small">
            <Step icon="home" title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step icon="time" title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step icon="loading" title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" direction="vertical">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" direction="vertical" size="small">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" direction="vertical">
            <Step title="开始"></Step>
            <Step title="进行中"></Step>
            <Step title="已完成"></Step>
        </Steps>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
