<template>
    <div class="LayoutView">
        <h4>基础</h4>
        <Layout>
            <Header class="center">header</Header>
            <Content class="center layout-content">content</Content>
            <Footer class="center">footer</Footer>
        </Layout>

        <h4>基础</h4>
        <m-switch width="90" v-model="hideTrigger">
            <span slot="open">显示trigger</span>
            <span slot="close">隐藏trigger</span>
        </m-switch>
        <div>
            定义收起的宽度： <m-input type="number" v-model="collapsedWidth"></m-input>
        </div>
        <Layout>
            <Header class="center">header</Header>
            <Layout>
                <Sider v-model="collapsed"
                         :class="{'sider-close': collapsed}"
                         :collapsedWidth="collapsedWidth"
                         :hide-trigger="hideTrigger">
                    <Menu width="auto">
                        <Tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options1">
                            <MenuItem c-key="options1">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options1</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options2">
                            <MenuItem c-key="options2">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options2</span>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options3">
                            <MenuItem c-key="options3">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">options3</span>
                            </MenuItem>
                        </Tooltip>
                    </Menu>
                </Sider>
                <Content class="center layout-content">content</Content>
            </Layout>
            <Footer class="center">footer</Footer>
        </Layout>

        <h4>基础--固定高</h4>
        <Layout class="fixed-layout">
            <Header class="center bg-white">header</Header>
            <Layout>
                <Sider height="300px" v-model="collapsedScroll">
                    <Menu :class="{'sider-close': collapsedScroll}" :open-keys="openKeys" width="auto" theme="dark">
                        <Submenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option1" c-key="submenu-option1">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option1</span>
                            </template>
                            <MenuItem c-key="menuItem-option1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option1</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option4</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option5</span>
                            </MenuItem>
                        </Submenu>
                        <Submenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option2" c-key="submenu-option2">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option2</span>
                            </template>
                            <MenuItem c-key="menuItem-option2-1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-1</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option2-2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-2</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option2-3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-3</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option2-4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-4</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option2-5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option2-5</span>
                            </MenuItem>
                        </Submenu>
                        <Submenu class="fixed-layout-submenu" :forbidden="collapsedScroll" :hideDropIcon="collapsedScroll" name="submenu-option3" c-key="submenu-option3">
                            <template slot="title">
                                <Icon type="home" class="menu-icon"></Icon>
                                <span class="menu-name">submenu-option3</span>
                            </template>
                            <MenuItem c-key="menuItem-option3-1">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-1</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option3-2">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-2</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option3-3">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-3</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option3-4">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-4</span>
                            </MenuItem>
                            <MenuItem c-key="menuItem-option3-5">
                                <Icon type="home"></Icon>
                                <span>menuItem-option3-5</span>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content class="center layout-content">content</Content>
                    <Footer class="center bg-white">footer</Footer>
                </Layout>
            </Layout>
        </Layout>

        <h4>基础</h4>
        <Layout>
            <Header class="center">header</Header>
            <Layout>
                <Sider></Sider>
                <Content class="center layout-content">content</Content>
            </Layout>
            <Footer class="center"></Footer>
        </Layout>

        <h4>基础--自定义触发器</h4>
        <m-switch width="130" v-model="hideHeader">
            <span slot="open">显示sider-header</span>
            <span slot="close">隐藏sider-header</span>
        </m-switch>
        <Layout>
            <Sider v-model="collapsedCustom" :hide-header="hideHeader" hide-trigger>
                <div class="center" slot="header">LOGO</div>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}">
                    <Button type="text" size='large' icon="square" @click="collapsedCustom = !collapsedCustom"></Button>
                    <div class="center">header</div>
                </Header>
                <Content class="center layout-content">content</Content>
                <Footer class="center"></Footer>
            </Layout>
        </Layout>


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
