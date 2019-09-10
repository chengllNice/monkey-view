<template>
    <div class="code-wrap">
        <ClCard>
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
                <ClTooltip placement="top" content="复制代码">
                    <i class="cl-icon-copy" @click="copyCodeClick"></i>
                </ClTooltip>
                <ClTooltip placement="top" :content="openedCode ? '隐藏代码' : '显示代码'">
                    <i :class="iconCodeClass" @click="openedCodeClick"></i>
                </ClTooltip>
            </div>
            <SlideTransition>
                <div v-show="openedCode" class="code-wrap-code-content" ref="codeContent" v-highlight>
                    <slot name="highlight"></slot>
                </div>
            </SlideTransition>
        </ClCard>
    </div>
</template>

<script>
  import SlideTransition from 'cl-ui/packages/components/base/slide-transition.vue'

  export default {
    name: "codeWrap",
    props: {
      title: String,
    },
    data() {
      return {
        openedCode: false,
      }
    },
    computed: {
      iconCodeClass(){
        if(this.openedCode){
          return 'cl-icon-code-open'
        }
        return 'cl-icon-code-close'
      }
    },
    components: {
      SlideTransition
    },
    created() {
    },
    mounted() {

    },
    methods: {
      openedCodeClick(){
        this.openedCode = !this.openedCode;
      },
      copyCodeClick(){
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

<style lang="scss">
.code-wrap{
    margin-bottom: 20px;
    .code-wrap-ui-content{
        padding: 20px 0;
    }
    .code-wrap-des-content{
        padding: 20px 0;
    }
    .code-wrap-code-button{
        border-top: 1px dashed #dcdee2;
        border-bottom: 1px dashed #dcdee2;
        padding: 10px 0;
        margin-bottom: 10px;
        text-align: center;
        i{
            font-size: 14px;
            cursor: pointer;
            margin: 0 10px;
            transition: transform 0.2s ease-in-out;
            &:hover{
                color: #000;
                transform: scale(1.2);
            }
        }
    }
    .code-wrap-code-content{

    }
    .code-wrap-des-content-title{
        background-color: #ffffff;
        color: #000;
        padding: 0 10px;
        position: relative;
        font-size: 14px;
        a{
            opacity: 0;
        }
        &>span{
            position: relative;
            background-color: #ffffff;
            padding: 0 10px;
            i{
                margin-left: 5px;
            }
        }
        &::before{
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 1px;
            width: 100%;
            background-color: #dcdee2;
        }
    }
}
</style>
