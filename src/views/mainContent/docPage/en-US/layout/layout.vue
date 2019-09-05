<template>
    <div class="doc-layout">
        <div class="doc-article" v-html="layoutExplainMd"></div>

        <code-wrap title="基本结构" :code-data="layoutBaseMd">
            <div class="doc-layout-ui-wrap">
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">
                        <cl-header class="doc-layout-header">header</cl-header>
                        <cl-content class="doc-layout-content">content</cl-content>
                        <cl-footer class="doc-layout-footer">footer</cl-footer>
                    </cl-layout>
                </div>
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">
                        <cl-header class="doc-layout-header">header</cl-header>
                        <cl-layout>
                            <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
                            <cl-content class="doc-layout-content">content</cl-content>
                        </cl-layout>
                        <cl-footer class="doc-layout-footer">footer</cl-footer>
                    </cl-layout>
                </div>
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">
                        <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
                        <cl-layout>
                            <cl-header class="doc-layout-header">header</cl-header>
                            <cl-content class="doc-layout-content">content</cl-content>
                            <cl-footer class="doc-layout-footer">footer</cl-footer>
                        </cl-layout>
                    </cl-layout>
                </div>
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">

                        <cl-header class="doc-layout-header">header</cl-header>
                        <cl-layout>
                            <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
                            <cl-layout>
                                <cl-content class="doc-layout-content">content</cl-content>
                                <cl-footer class="doc-layout-footer">footer</cl-footer>
                            </cl-layout>
                        </cl-layout>
                    </cl-layout>
                </div>
            </div>

            <template slot="des-content">
                经典的页面布局
            </template>
        </code-wrap>

        <code-wrap title="自定义sider的header" :code-data="layoutSiderSlotHeaderMd">
            <cl-layout class="doc-layout-el">
                <cl-sider class="doc-layout-sider" hide-trigger>
                    <div slot="header" class="doc-layout-sider-header">
                        LOGO
                    </div>
                    sider
                </cl-sider>
                <cl-layout>
                    <cl-header class="doc-layout-header">header</cl-header>
                    <cl-content class="doc-layout-content">content</cl-content>
                    <cl-footer class="doc-layout-footer">footer</cl-footer>
                </cl-layout>
            </cl-layout>

            <template slot="des-content">
                通常这里可以设置LOGO
            </template>
        </code-wrap>

        <code-wrap title="侧边栏布局" :code-data="layoutSiderMd">
            <div class="doc-layout-ui-wrap">
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">
                        <cl-header class="doc-layout-header">header</cl-header>
                        <cl-layout>
                            <cl-sider v-model="collapsed"
                                      class="doc-layout-sider doc-layout-sider-dark"
                                     :class="{'sider-close': collapsed}"
                                     :collapsed-width="collapsedWidth"
                                     :hide-trigger="hideTrigger">
                                <cl-menu width="auto" theme="dark">
                                    <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options1">
                                        <cl-menu-item c-key="options1">
                                            <i class="menu-icon cl-icon-home"></i>
                                            <span class="menu-name">options1</span>
                                        </cl-menu-item>
                                    </cl-tooltip>
                                    <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options2">
                                        <cl-menu-item c-key="options2">
                                            <i class="menu-icon cl-icon-home"></i>
                                            <span class="menu-name">options2</span>
                                        </cl-menu-item>
                                    </cl-tooltip>
                                    <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options3">
                                        <cl-menu-item c-key="options3">
                                            <i class="menu-icon cl-icon-home"></i>
                                            <span class="menu-name">options3</span>
                                        </cl-menu-item>
                                    </cl-tooltip>
                                </cl-menu>
                            </cl-sider>
                            <cl-layout>
                                <cl-content class="doc-layout-content">content</cl-content>
                                <cl-footer class="doc-layout-footer">footer</cl-footer>
                            </cl-layout>
                        </cl-layout>

                    </cl-layout>
                </div>
                <cl-switch width="90" v-model="hideTrigger">
                    <span slot="open">显示trigger</span>
                    <span slot="close">隐藏trigger</span>
                </cl-switch>
                <div>
                    定义收起的宽度： <cl-input type="number" v-model="collapsedWidth"></cl-input>
                </div>
            </div>

            <template slot="des-content">
                <div>默认 <code>Sider</code>组件显示trigger切换侧边栏的触发器，可以使用 <code>hide-trigger</code>属性隐藏触发器。</div>
                <div>可设置 <code>Sider</code>组件 <code>height</code>属性使内部内容超出时滚动。</div>
                <div>可设置 <code>Sider</code>组件 <code>collapsedWidth</code>属性收缩起来的宽度。当收起的宽度为0时，会自动出现特殊的trigger</div>
                <div>可通过 v-model双向绑定控制 <code>Sider</code>组件的展开收起状态</div>
            </template>
        </code-wrap>

        <code-wrap title="自定义trigger" :code-data="layoutCustomTriggerMd">
            <div class="doc-layout-ui-wrap">
                <div class="doc-layout-single">
                    <cl-layout class="doc-layout-el">
                        <cl-sider v-model="collapsedCustom"
                                  class="doc-layout-sider doc-layout-sider-dark"
                                  :class="{'sider-close': collapsedCustom}"
                                  hide-trigger>
                            <cl-menu width="auto" theme="dark">
                                <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options1">
                                    <cl-menu-item c-key="options1">
                                        <i class="menu-icon cl-icon-home"></i>
                                        <span class="menu-name">options1</span>
                                    </cl-menu-item>
                                </cl-tooltip>
                                <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options2">
                                    <cl-menu-item c-key="options2">
                                        <i class="menu-icon cl-icon-home"></i>
                                        <span class="menu-name">options2</span>
                                    </cl-menu-item>
                                </cl-tooltip>
                                <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options3">
                                    <cl-menu-item c-key="options3">
                                        <i class="menu-icon cl-icon-home"></i>
                                        <span class="menu-name">options3</span>
                                    </cl-menu-item>
                                </cl-tooltip>
                            </cl-menu>
                        </cl-sider>
                        <cl-layout>
                            <cl-header class="doc-layout-header doc-layout-header-toggle">
                                <i class="cl-icon-list1" @click="triggerClick"></i>
                            </cl-header>
                            <cl-content class="doc-layout-content">content</cl-content>
                            <cl-footer class="doc-layout-footer">footer</cl-footer>
                        </cl-layout>
                    </cl-layout>
                </div>
            </div>

            <template slot="des-content">
                <div>通过设置 <code>hide-trigger</code>属性隐藏默认的触发器。可自定义实现trigger触发器。</div>
            </template>
        </code-wrap>

        <codeDocTable :data="layoutDocMd"></codeDocTable>
    </div>
</template>

<script>
  import CodeWrap from '@/components/code-wrap.vue'
  import codeDocTable from '@/components/code-doc-table.vue'

  import layoutExplainMd from './layout-explain.md'
  import layoutBaseMd from './layout-base.md'
  import layoutSiderSlotHeaderMd from './layout-sider-slot-header.md'
  import layoutSiderMd from './layout-sider.md'
  import layoutCustomTriggerMd from './layout-custom-trigger.md'
  import layoutDocMd from './layout-doc.md'

  // import md from 'markdown-it'
  export default {
    name: "docLayout",
    data() {
      return {
        collapsed: true,
        collapsedWidth: 60,
        hideTrigger: false,
        collapsedCustom: false,
        layoutExplainMd: '',
        layoutBaseMd: '',
        layoutSiderSlotHeaderMd: '',
        layoutSiderMd: '',
        layoutCustomTriggerMd: '',
        layoutDocMd: '',
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
      // this.layoutExplainMd = md().render(layoutExplainMd);
      // this.layoutBaseMd = md().render(layoutBaseMd);
      // this.layoutSiderSlotHeaderMd = md().render(layoutSiderSlotHeaderMd);
      // this.layoutSiderMd = md().render(layoutSiderMd);
      // this.layoutCustomTriggerMd = md().render(layoutCustomTriggerMd);
      // this.layoutDocMd = md().render(layoutDocMd);


      this.layoutExplainMd = layoutExplainMd;
      this.layoutBaseMd = layoutBaseMd;
      this.layoutSiderSlotHeaderMd = layoutSiderSlotHeaderMd;
      this.layoutSiderMd = layoutSiderMd;
      this.layoutCustomTriggerMd = layoutCustomTriggerMd;
      this.layoutDocMd = layoutDocMd;
    },
    methods: {
      triggerClick(){
        this.collapsedCustom = !this.collapsedCustom;
      }
    }
  }
</script>

<style lang="scss" scoped>
.doc-layout{
    .doc-layout-single{
        margin-bottom: 40px;
    }
    .doc-layout-el{
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
    .doc-layout-header, .doc-layout-footer{
        background-color: #86d8af;
    }
    .doc-layout-content{
        min-height: 120px;
        line-height: 120px;
        background-color: #19be6b;
    }
    .doc-layout-sider{
        line-height: 120px;
        background-color: #62c191;
    }
    .doc-layout-sider-header{
        background-color: #02b7a5;
    }
    .doc-layout-sider-dark{
        background-color: #344058;
        text-align: left;
        line-height: normal;
    }
    .doc-layout-header-toggle{
        text-align: left;
        i{
            cursor: pointer;
        }
    }
    .menu-tooltip{
        display: block;
    }
    .sider-close{
        text-align: center;
        .menu-icon{
            transition: all 0.2s ease-in-out;
            font-size: 18px;
        }
        .menu-name{
            width: 0;
            transition: all 0.1s;
            margin: auto;
        }
    }

}
</style>
