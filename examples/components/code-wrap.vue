<template>
    <div class="code-wrap">
        <Card>
            <div class="code-wrap-ui-content">
                <slot name="source"></slot>
            </div>
            <div class="code-wrap-des-content-title">
                <span><slot name="title"></slot></span>
            </div>
            <div class="code-wrap-des-content doc-article">
                <slot name="description"></slot>
            </div>
            <div class="code-wrap-code-button">
                <Tooltip placement="top" content="复制代码">
                    <Icon type="file-copy" @click="copyCodeClick"></Icon>
                </Tooltip>
                <Tooltip placement="top" :content="openedCode ? '隐藏代码' : '显示代码'">
                    <Icon :type="iconCodeClass" @click="openedCodeClick"></Icon>
                </Tooltip>
            </div>
            <SlideTransition>
                <div v-show="openedCode" class="code-wrap-code-content" ref="codeContent">
                    <slot name="highlight"></slot>
                </div>
            </SlideTransition>
        </Card>
    </div>
</template>

<script>
    import SlideTransition from 'packages/base/slide-transition.vue'

    export default {
        name: "CodeWrap",
        props: {
            title: String,
        },
        data() {
            return {
                openedCode: false,
            }
        },
        computed: {
            iconCodeClass() {
                if (this.openedCode) {
                    return 'code-open'
                }
                return 'code-close'
            }
        },
        components: {
            SlideTransition
        },
        methods: {
            openedCodeClick() {
                this.openedCode = !this.openedCode;
            },
            copyCodeClick() {
                let self = this;
                let codeText = this.$refs.codeContent && this.$refs.codeContent.textContent;
                this.$copyText(codeText).then(function () {
                    self.$Message.success('copy success')
                }, function () {
                    self.$Message.error('copy fail')
                })
            },
        },
    }
</script>
