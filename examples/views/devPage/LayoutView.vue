<template>
    <div class="LayoutView">
        <h4>基础</h4>
        <ClLayout>
            <ClHeader class="center">header</ClHeader>
            <ClContent class="center layout-content">content</ClContent>
            <ClFooter class="center">footer</ClFooter>
        </ClLayout>

        <h4>基础</h4>
        <ClSwitch width="90" v-model="hideTrigger">
            <span slot="open">显示trigger</span>
            <span slot="close">隐藏trigger</span>
        </ClSwitch>
        <div>
            定义收起的宽度： <ClInput type="number" v-model="collapsedWidth"></ClInput>
        </div>
        <ClLayout>
            <ClHeader class="center">header</ClHeader>
            <ClLayout>
                <ClSider v-model="collapsed"
                         :class="{'sider-close': collapsed}"
                         :collapsedWidth="collapsedWidth"
                         :hide-trigger="hideTrigger">
                    <ClMenu width="auto">
                        <ClTooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options1">
                            <ClMenuItem c-key="options1">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options1</span>
                            </ClMenuItem>
                        </ClTooltip>
                        <ClTooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options2">
                            <ClMenuItem c-key="options2">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options2</span>
                            </ClMenuItem>
                        </ClTooltip>
                        <ClTooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options3">
                            <ClMenuItem c-key="options3">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options3</span>
                            </ClMenuItem>
                        </ClTooltip>
                    </ClMenu>
                </ClSider>
                <ClContent class="center layout-content">content</ClContent>
            </ClLayout>
            <ClFooter class="center">footer</ClFooter>
        </ClLayout>

        <h4>基础--固定高</h4>
        <ClLayout class="fixed-layout">
            <ClHeader class="center bg-white">header</ClHeader>
            <ClLayout>
                <ClSider height="300px" v-model="collapsedScroll">
                    <ClMenu :class="{'sider-close': collapsedScroll}" :open-keys="openKeys" width="auto" theme="dark">
                        <ClSubmenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option1" c-key="submenu-option1">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option1</span>
                            </template>
                            <ClMenuItem c-key="menuItem-option1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option1</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option4</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option5</span>
                            </ClMenuItem>
                        </ClSubmenu>
                        <ClSubmenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option2" c-key="submenu-option2">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option2</span>
                            </template>
                            <ClMenuItem c-key="menuItem-option2-1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-1</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option2-2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-2</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option2-3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-3</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option2-4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-4</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option2-5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-5</span>
                            </ClMenuItem>
                        </ClSubmenu>
                        <ClSubmenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option3" c-key="submenu-option3">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option3</span>
                            </template>
                            <ClMenuItem c-key="menuItem-option3-1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-1</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option3-2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-2</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option3-3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-3</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option3-4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-4</span>
                            </ClMenuItem>
                            <ClMenuItem c-key="menuItem-option3-5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-5</span>
                            </ClMenuItem>
                        </ClSubmenu>
                    </ClMenu>
                </ClSider>
                <ClLayout>
                    <ClContent class="center layout-content">content</ClContent>
                    <ClFooter class="center bg-white">footer</ClFooter>
                </ClLayout>
            </ClLayout>
        </ClLayout>

        <h4>基础</h4>
        <ClLayout>
            <ClHeader class="center">header</ClHeader>
            <ClLayout>
                <ClSider></ClSider>
                <ClContent class="center layout-content">content</ClContent>
            </ClLayout>
            <ClFooter class="center"></ClFooter>
        </ClLayout>

        <h4>基础--自定义触发器</h4>
        <ClSwitch width="130" v-model="hideHeader">
            <span slot="open">显示sider-header</span>
            <span slot="close">隐藏sider-header</span>
        </ClSwitch>
        <ClLayout>
            <ClSider v-model="collapsedCustom" :hide-header="hideHeader" hide-trigger>
                <div class="center" slot="header">LOGO</div>
            </ClSider>
            <ClLayout>
                <ClHeader :style="{padding: 0}">
                    <ClButton type="text" size='large' icon="square" @click="collapsedCustom = !collapsedCustom"></ClButton>
                    <div class="center">header</div>
                </ClHeader>
                <ClContent class="center layout-content">content</ClContent>
                <ClFooter class="center"></ClFooter>
            </ClLayout>
        </ClLayout>


        <div class="viewDes">
            <h3>API</h3>
            <h4>sider props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>控制展开收起，可以使用v-model双向绑定，true(收起),false(展开)</p>
                <p><b>默认值：</b></p>
            </div>
            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>宽度</p>
                <p><b>默认值：</b>200</p>
            </div>
            <div class="propItem">
                <p><b>属性：height</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>设置滚动的高度</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：collapsedWidth</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>收起时的宽度</p>
                <p><b>默认值：</b>60</p>
            </div>
            <div class="propItem">
                <p><b>属性：hideTrigger</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否隐藏trigger</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>sider event</h4>

            <div class="propItem">
                <p><b>事件名：collapse</b></p>
                <p><b>说明：</b>展开收起时触发</p>
                <p><b>返回值：</b>value</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>sider slot</h4>

            <div class="propItem">
                <p><b>名称：header</b></p>
                <p><b>说明：</b>定义header</p>
            </div>
            <div class="propItem">
                <p><b>名称：trigger</b></p>
                <p><b>说明：</b>自定义trigger</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "LayoutView",
    data() {
      return {
        siderKey: 'home',
        siderData: [
          {
            key: 'home',
            name: 'home',
            icon: 'list',
            rightIcon: 'down',
            link: '/homeView',
            query: {},
          },
          {
            key: 'button',
            name: 'button',
            icon: 'list',
            rightIcon: 'down',
            link: '/buttonView',
            query: {},
          },
          {
            key: 'input',
            name: 'input',
            icon: 'list',
            rightIcon: 'down',
            link: '/inputView',
            query: {},
          },
        ],
        collapsed: true,
        collapsedWidth: 60,
        hideTrigger: false,
        hideHeader: false,
        collapsedScroll: false,
        collapsedCustom: false,
        openKeys: ['submenu-option1'],
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {},
    watch: {
      collapsedScroll(newVal){
        if(newVal) this.openKeys = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
.LayoutView{
    .center{
        text-align: center;
    }
    h4{
        text-align: left;
    }
    .sider-option{
        height: 40px;
        line-height: 40px;
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
    .layout-content{
        min-height: 120px;
        line-height: 120px;
    }
    .bg-white{
        background-color: #ffffff;
    }
    .fixed-layout{
        border: 1px solid #eee;
    }
}
</style>
<style lang="scss">
    .sider-close{
        .fixed-layout-submenu{
            .cl-submenu__title{
                padding: 0 16px;
            }
        }
    }
</style>
