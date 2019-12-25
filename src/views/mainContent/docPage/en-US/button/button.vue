<template>
    <div class="doc-button">
        <div class="doc-article" v-html="buttonExplainMD"></div>

        <CodeWrap title="按钮类型" :code-data="buttonTypeMD">
            <div class="button-content">
                <ClButton>Default</ClButton>
                <ClButton type="primary">Primary</ClButton>
                <ClButton type="success">Success</ClButton>
                <ClButton type="danger">Danger</ClButton>
                <ClButton type="warning">Warning</ClButton>
                <ClButton type="info">Info</ClButton>
                <ClButton type="text">Text</ClButton>
            </div>

            <template slot="des-content">
                按钮有七种类型：<code>type</code>类型可设置为<code>primary</code><code>primary</code><code>danger</code><code>warning</code><code>info</code><code>text</code>，不设置为默认样式
            </template>
        </CodeWrap>

        <CodeWrap title="按钮尺寸" :code-data="buttonSizeMD">
            <div class="button-content">
                <ClButton type="primary" size="mini">Primary Mini</ClButton>
                <ClButton type="primary" size="small">Primary Small</ClButton>
                <ClButton type="primary">Primary Default</ClButton>
                <ClButton type="primary" size="large">Primary Large</ClButton>
            </div>

            <div slot="des-content">
                <p>按钮有四种尺寸：迷你、小型、中型(默认)、大型。</p>
                设置 <code>size</code>为 <code>mini</code><code>small</code><code>large</code>，不设置为默认中型按钮。
            </div>
        </CodeWrap>

        <CodeWrap title="图标按钮及按钮形状" :code-data="buttonIconMD">
            <div class="button-content">
                <ClButton size="mini" icon="cl-icon-search"></ClButton>
                <ClButton size="mini" icon="cl-icon-search">Default</ClButton>
                <ClButton size="mini" icon="cl-icon-search" circle></ClButton>
                <ClButton size="mini" icon="cl-icon-search" circle>Default</ClButton>
                <br>
                <ClButton size="small" icon="cl-icon-search"></ClButton>
                <ClButton size="small" icon="cl-icon-search">Default</ClButton>
                <ClButton size="small" icon="cl-icon-search" circle></ClButton>
                <ClButton size="small" icon="cl-icon-search" circle>Default</ClButton>
                <br>
                <ClButton icon="cl-icon-search"></ClButton>
                <ClButton icon="cl-icon-search">Default</ClButton>
                <ClButton icon="cl-icon-search" circle></ClButton>
                <ClButton icon="cl-icon-search" circle>Default</ClButton>
                <br>
                <ClButton type="primary" icon="cl-icon-search"></ClButton>
                <ClButton type="primary" icon="cl-icon-search">Primary</ClButton>
                <ClButton type="primary" icon="cl-icon-search" circle></ClButton>
                <ClButton type="primary" icon="cl-icon-search" circle>Primary</ClButton>
                <br>
                <ClButton size="large" type="primary" icon="cl-icon-search"></ClButton>
                <ClButton size="large" type="primary" icon="cl-icon-search">Primary</ClButton>
                <ClButton size="large" type="primary" icon="cl-icon-search" circle></ClButton>
                <ClButton size="large" type="primary" icon="cl-icon-search" circle>Primary</ClButton>
            </div>

            <div slot="des-content">
                带有icon图标的按钮，设置<code>icon</code>属性可以添加图标，或者可以直接在Button内部添加icon图标。
                <br>
                设置 <code>circle</code>属性可以将按钮设置为圆形。
            </div>
        </CodeWrap>

        <CodeWrap title="按钮禁用" :code-data="buttonDisabledMD">
            <div class="button-content">
                <ClButton>Default</ClButton>
                <ClButton disabled>Default</ClButton>
                <br>
                <ClButton type="primary">Primary</ClButton>
                <ClButton type="primary" disabled>Primary</ClButton>
                <br>
                <ClButton type="text">Text</ClButton>
                <ClButton type="text" disabled>Text</ClButton>
            </div>

            <div slot="des-content">
                添加 <code>disabled</code>属性可将按钮设置为禁用状态
            </div>
        </CodeWrap>

        <CodeWrap title="按钮加载中" :code-data="buttonLoadingMD">
            <div class="button-content">
                <ClButton loading>Default</ClButton>
                <ClButton icon="cl-icon-search" loading></ClButton>
                <ClButton type="primary" loading>Primary</ClButton>
                <ClButton type="primary" :loading="loading1" @click="loading1 = true">Click me!</ClButton>
                <ClButton type="primary" :loading="loading2" @click="loading2 = true" icon="cl-icon-search">Click me!</ClButton>
            </div>

            <div slot="des-content">
                添加 <code>loading</code>属性可将按钮设置为加载中的状态
            </div>
        </CodeWrap>

        <CodeWrap title="块级按钮" :code-data="buttonBlockMD">
            <div class="button-content">
                <ClButton block>Default</ClButton>
                <ClButton type="primary" icon="cl-icon-search" block></ClButton>
                <ClButton type="danger" block>Danger</ClButton>
            </div>

            <div slot="des-content">
                添加 <code>block</code>属性可将按钮设置为块级按钮
            </div>
        </CodeWrap>

        <CodeWrap title="按钮组合" :code-data="buttonGroupMD">
            <div class="button-content">
                <ClButtonGroup>
                    <ClButton>Left</ClButton>
                    <ClButton type="primary">Right</ClButton>
                </ClButtonGroup>
                <br>
                <ClButtonGroup>
                    <ClButton disabled>Left</ClButton>
                    <ClButton disabled>Center</ClButton>
                    <ClButton disabled>Right</ClButton>
                </ClButtonGroup>

                <h4>Icon</h4>
                <ClButtonGroup>
                    <ClButton type="primary">
                        <i class="cl-icon-left"></i> Left
                    </ClButton>
                    <ClButton type="primary">Right <i class="cl-icon-right"></i></ClButton>
                </ClButtonGroup>
                <ClButtonGroup>
                    <ClButton type="primary" icon="cl-icon-arrow-left"></ClButton>
                    <ClButton type="primary" icon="cl-icon-arrow-right"></ClButton>
                </ClButtonGroup>
                <ClButtonGroup>
                    <ClButton icon="cl-icon-edit"></ClButton>
                    <ClButton icon="cl-icon-square-plus"></ClButton>
                    <ClButton icon="cl-icon-check"></ClButton>
                    <ClButton icon="cl-icon-close"></ClButton>
                </ClButtonGroup>
                <h4>Circle</h4>
                <ClButtonGroup>
                    <ClButton type="primary" circle>
                        <i class="cl-icon-left"></i> Left
                    </ClButton>
                    <ClButton type="primary" circle>
                        Right <i class="cl-icon-right"></i>
                    </ClButton>
                </ClButtonGroup>
                <br>
                <ClButtonGroup>
                    <ClButton type="primary" circle>Left</ClButton>
                    <ClButton type="primary" circle>Center</ClButton>
                    <ClButton type="primary" circle>Right</ClButton>
                </ClButtonGroup>
            </div>

            <div slot="des-content">
                将多个 <code>Button</code>放入 <code>ButtonGroup</code>内，可实现按钮组合的效果。
            </div>
        </CodeWrap>

        <codeDocTable :data="buttonDocMD"></codeDocTable>
    </div>
</template>

<script>
  import CodeWrap from '@/components/code-wrap.vue'
  import codeDocTable from '@/components/code-doc-table.vue'

  import buttonExplainMD from './button-explain.md'
  import buttonTypeMD from './button-type.md'
  import buttonSizeMD from './button-size.md'
  import buttonIconMD from './button-icon.md'
  import buttonDisabledMD from './button-disabled.md'
  import buttonLoadingMD from './button-loading.md'
  import buttonBlockMD from './button-block.md'
  import buttonGroupMD from './button-group.md'
  import buttonDocMD from './button-doc.md'
  // import md from 'markdown-it'

  export default {
    name: "docButton",
    data() {
      return {
        loading1: false,
        loading2: false,
        buttonExplainMD: '',
        buttonTypeMD: '',
        buttonSizeMD: '',
        buttonIconMD: '',
        buttonDisabledMD: '',
        buttonLoadingMD: '',
        buttonBlockMD: '',
        buttonGroupMD: '',
        buttonDocMD: '',
      }
    },
    computed: {},
    components: {
      CodeWrap,
      codeDocTable,
    },
    created() {
    },
    mounted() {
      // this.buttonExplainMD = md().render(buttonExplainMD);
      // this.buttonTypeMD = md().render(buttonTypeMD);
      // this.buttonSizeMD = md().render(buttonSizeMD);
      // this.buttonIconMD = md().render(buttonIconMD);
      // this.buttonDisabledMD = md().render(buttonDisabledMD);
      // this.buttonLoadingMD = md().render(buttonLoadingMD);
      // this.buttonBlockMD = md().render(buttonBlockMD);
      // this.buttonGroupMD = md().render(buttonGroupMD);
      // this.buttonDocMD = md().render(buttonDocMD);

      this.buttonExplainMD = buttonExplainMD;
      this.buttonTypeMD = buttonTypeMD;
      this.buttonSizeMD = buttonSizeMD;
      this.buttonIconMD = buttonIconMD;
      this.buttonDisabledMD = buttonDisabledMD;
      this.buttonLoadingMD = buttonLoadingMD;
      this.buttonBlockMD = buttonBlockMD;
      this.buttonGroupMD = buttonGroupMD;
      this.buttonDocMD = buttonDocMD;
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
.doc-button{
    .button-content{
        &>*{
            margin: 5px;
        }
    }
}
</style>
