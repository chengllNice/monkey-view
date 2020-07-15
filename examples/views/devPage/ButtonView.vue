<template>
    <div class="ButtonView">
        <!--<div>
            <h4>size</h4>
            mini:<ClButton type="info" size="mini">你好</ClButton>
            small:<ClButton type="info" size="small">你好</ClButton>
            default:<ClButton type="info">你好</ClButton>
            large:<ClButton type="info" size="large">你好</ClButton>

            <h4>type=default(默认)</h4>
            文字：<ClButton>你好</ClButton>
            纯图标：<ClButton icon="list"></ClButton>
            文字+图标：<ClButton icon="list">你好</ClButton>
            文字disabled：<ClButton disabled>你好</ClButton>
            纯图标disabled：<ClButton disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton disabled icon="list">你好</ClButton>
            loading：<ClButton loading>你好</ClButton>

            <h4>type=primary</h4>
            文字：<ClButton type="primary">你好</ClButton>
            纯图标：<ClButton type="primary" icon="list"></ClButton>
            文字+图标：<ClButton type="primary" icon="list">你好</ClButton>
            文字disabled：<ClButton type="primary" disabled >你好</ClButton>
            纯图标disabled：<ClButton type="primary" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="primary" disabled icon="list">你好</ClButton>
            loading：<ClButton type="primary" loading>你好</ClButton>

            <h4>type=danger</h4>
            文字：<ClButton type="danger">你好</ClButton>
            纯图标：<ClButton type="danger" icon="list"></ClButton>
            文字+图标：<ClButton type="danger" icon="list">你好</ClButton>
            文字disabled：<ClButton type="danger" disabled>你好</ClButton>
            纯图标disabled：<ClButton type="danger" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="danger" disabled icon="list">你好</ClButton>
            loading：<ClButton type="danger" loading>你好</ClButton>

            <h4>type=warning</h4>
            文字：<ClButton type="warning">你好</ClButton>
            纯图标：<ClButton type="warning" icon="list"></ClButton>
            文字+图标：<ClButton type="warning" icon="list">你好</ClButton>
            文字disabled：<ClButton type="warning" disabled>你好</ClButton>
            纯图标disabled：<ClButton type="warning" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="warning" disabled icon="list">你好</ClButton>
            loading：<ClButton type="warning" loading>你好</ClButton>

            <h4>type=success</h4>
            文字：<ClButton type="success">你好</ClButton>
            纯图标：<ClButton type="success" icon="list"></ClButton>
            文字+图标：<ClButton type="success" icon="list">你好</ClButton>
            文字disabled：<ClButton type="success" disabled>你好</ClButton>
            纯图标disabled：<ClButton type="success" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="success" disabled icon="list">你好</ClButton>
            loading：<ClButton type="success" loading>你好</ClButton>

            <h4>type=info</h4>
            文字：<ClButton type="info">你好</ClButton>
            纯图标：<ClButton type="info" icon="list"></ClButton>
            文字+图标：<ClButton type="info" icon="list">你好</ClButton>
            文字disabled：<ClButton type="info" disabled>你好</ClButton>
            纯图标disabled：<ClButton type="info" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="info" disabled icon="list">你好</ClButton>
            loading：<ClButton type="info" loading>你好</ClButton>

            <h4>type=text</h4>
            文字：<ClButton type="text">你好</ClButton>
            纯图标：<ClButton type="text" icon="list"></ClButton>
            文字+图标：<ClButton type="text" icon="list">你好</ClButton>
            文字disabled：<ClButton type="text" disabled>你好</ClButton>
            纯图标disabled：<ClButton type="text" disabled icon="list"></ClButton>
            文字+图标disabled：<ClButton type="text" disabled icon="list">你好</ClButton>
            loading：<ClButton type="text" loading>你好</ClButton>

            <h4>block</h4>
            文字：<ClButton type="primary" block>你好</ClButton>
            纯图标：<ClButton type="primary" block icon="list"></ClButton>
            文字+图标：<ClButton type="primary" block icon="list">你好</ClButton>
            文字disabled：<ClButton type="primary" disabled block>你好</ClButton>
            纯图标disabled：<ClButton type="primary" disabled block icon="list"></ClButton>
            文字+图标disabled：<ClButton type="primary" disabled block icon="list">你好</ClButton>
            loading：<ClButton type="primary" block loading>你好</ClButton>

            <h4>circle</h4>
            文字：<ClButton type="primary" circle>你好</ClButton>
            纯图标：<ClButton type="primary" circle icon="plus"></ClButton>
            文字+图标：<ClButton type="primary" circle icon="plus">你好</ClButton>
            文字disabled：<ClButton type="primary" disabled circle>你好</ClButton>
            纯图标disabled：<ClButton type="primary" disabled circle icon="plus"></ClButton>
            文字+图标disabled：<ClButton type="primary" disabled circle icon="plus">你好</ClButton>
            loading：<ClButton type="primary" circle loading>你好</ClButton>


            <h4>按钮组</h4>
            <ClButtonGroup>
                <ClButton icon="left">你好</ClButton>
                <ClButton>你好</ClButton>
                <ClButton>你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="primary" icon="left">你好</ClButton>
                <ClButton type="primary">你好</ClButton>
                <ClButton type="primary">你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="success" icon="left">你好</ClButton>
                <ClButton type="success">你好</ClButton>
                <ClButton type="success">你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="info" icon="left">你好</ClButton>
                <ClButton type="info">你好</ClButton>
                <ClButton type="info">你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="danger" icon="left">你好</ClButton>
                <ClButton type="danger">你好</ClButton>
                <ClButton type="danger">你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="warning" icon="left">你好</ClButton>
                <ClButton type="warning">你好</ClButton>
                <ClButton type="warning">你好<Icon type="right"></Icon></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton icon="left"></ClButton>
                <ClButton icon="list"></ClButton>
                <ClButton icon="right"></ClButton>
            </ClButtonGroup>
            <br>
            <ClButtonGroup>
                <ClButton type="info" icon="plus" circle></ClButton>
                <ClButton type="info" icon="plus" circle></ClButton>
                <ClButton type="info" icon="plus" circle></ClButton>
            </ClButtonGroup>
        </div>-->

        <ClButton type="info" icon="plus" circle></ClButton>
        <ClButton type="info" icon="plus" circle>BUtton</ClButton>
        <ClButton type="info" circle><Icon type="plus"></Icon>BUtton</ClButton>

        <div class="viewDes">
            <h3>API</h3>
            <h4>Button props</h4>

            <div class="propItem">
                <p><b>属性：type</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值primary/success/warning/danger/info/default</p>
                <p><b>默认值：</b>default</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：loading</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：block</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：circle</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>可选值true/false</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：icon</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>icon图标名称</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值mini/small/default/large</p>
                <p><b>默认值：</b>default</p>
            </div>
        </div>

    </div>
</template>

<script>

  export default {
    name: "ButtonView",
    data() {
      return {

      }
    },
    computed: {},
    components: {

    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
