<template>
    <div class="dev-steps">
        <h4>type: default</h4>
        <Steps :active="1">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>label-placement="vertical"</p>
        <Steps :active="1" label-placement="vertical">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>status="error"</p>
        <Steps :active="1" status="error">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>:percent="30"</p>
        <Steps :active="1" :percent="30">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>size="small"</p>
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

        <p>size="40"</p>
        <Steps :active="1" :size="15">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>


        <Steps :active="1" :percent="30">
            <Step icon="home" title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step icon="time" title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step icon="loading" title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" size="small">
            <Step icon="home" title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step icon="time" title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step icon="loading" title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>


        <h4>type: nav</h4>
        <Steps :active="1" type="nav" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>size="small"</p>
        <Steps :active="1" type="nav" size="small" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>label-placement="vertical"</p>
        <Steps :active="1" type="nav" label-placement="vertical" algin="center" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" type="nav" direction="vertical" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <h4>type: dot</h4>
        <Steps :active="1" type="dot" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>status='error' </p>
        <Steps :active="1" type="dot" label-placement="vertical" status='error' style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>label-placement="vertical" </p>
        <Steps :active="1" type="dot" label-placement="vertical" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>size="small" </p>
        <Steps :active="1" type="dot" size="small" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>size="20"</p>
        <Steps :active="1" type="dot" size="6" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>direction="vertical"</p>
        <Steps :active="1" type="dot" direction="vertical" style="margin-bottom: 30px">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>


        <h4>direction: vertical</h4>
        <Steps :active="1" direction="vertical">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <p>size="40"</p>
        <Steps :active="1" direction="vertical" size="100">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" direction="vertical" status="error">
            <Step title="开始" description="descriptiondescriptiondescriptiondescriptiondescriptiondescription"></Step>
            <Step title="进行中" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
            <Step title="已完成" description="这里是该步骤的描述信息这里是该步骤的描述信息"></Step>
        </Steps>

        <Steps :active="1" direction="vertical" :percent="30">
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
