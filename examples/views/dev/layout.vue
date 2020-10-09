<template>
    <div class="dev-layout">
        <h4>基础</h4>
        <Layout>
            <Header class="dev-layout-center">header</Header>
            <Content class="dev-layout-center dev-layout-content">content</Content>
            <Footer class="dev-layout-center">footer</Footer>
        </Layout>

        <h4>基础</h4>
        <m-switch width="90" v-model="hideTrigger">
            <span slot="open">显示trigger</span>
            <span slot="close">隐藏trigger</span>
        </m-switch>
        <div>
            定义收起的宽度： <Input type="number" v-model="collapsedWidth"></Input>
        </div>
        <Layout>
            <Header class="dev-layout-center">header</Header>
            <Layout>
                <Sider v-model="collapsed"
                       :collapsedWidth="collapsedWidth"
                       :hide-trigger="hideTrigger">
                    <Menu :collapse="collapsed" :collapsed-width="collapsedWidth">
                        <MenuItem c-key="options1">
                            <Icon type="home"></Icon>
                            <span>options1</span>
                        </MenuItem>
                        <MenuItem c-key="options2">
                            <Icon type="home"></Icon>
                            <span>options2</span>
                        </MenuItem>
                        <MenuItem c-key="options3">
                            <Icon type="home"></Icon>
                            <span>options3</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Content class="dev-layout-center dev-layout-content">content</Content>
            </Layout>
            <Footer class="dev-layout-center">footer</Footer>
        </Layout>

        <h4>基础--固定高</h4>
        <Layout class="dev-layout-fixed">
            <Header class="dev-layout-center dev-layout-bg-white">header</Header>
            <Layout>
                <Sider height="300px" v-model="collapsedScroll">
                    <Menu :collapse="collapsedScroll" :open-keys="openKeys" theme="dark">
                        <Submenu name="submenu-option1" c-key="submenu-option1">
                            <template slot="title">
                                <Icon type="home"></Icon>
                                <span>submenu-option1</span>
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
                        <Submenu name="submenu-option2" c-key="submenu-option2">
                            <template slot="title">
                                <Icon type="home"></Icon>
                                <span>submenu-option2</span>
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
                        <Submenu name="submenu-option3" c-key="submenu-option3">
                            <template slot="title">
                                <Icon type="home"></Icon>
                                <span>submenu-option3</span>
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
                    <Content class="dev-layout-center dev-layout-content">content</Content>
                    <Footer class="dev-layout-center dev-layout-bg-white">footer</Footer>
                </Layout>
            </Layout>
        </Layout>

        <h4>基础</h4>
        <Layout>
            <Header class="dev-layout-center">header</Header>
            <Layout>
                <Sider></Sider>
                <Content class="dev-layout-center dev-layout-content">content</Content>
            </Layout>
            <Footer class="dev-layout-center"></Footer>
        </Layout>

        <h4>基础--自定义触发器</h4>
        <m-switch width="130" v-model="hideHeader">
            <span slot="open">显示sider-header</span>
            <span slot="close">隐藏sider-header</span>
        </m-switch>
        <Layout>
            <Sider v-model="collapsedCustom" :hide-header="hideHeader" hide-trigger>
                <div class="dev-layout-center" slot="header">LOGO</div>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}">
                    <Button type="text" size='large' icon="square" @click="collapsedCustom = !collapsedCustom"></Button>
                    <div class="dev-layout-center">header</div>
                </Header>
                <Content class="dev-layout-center dev-layout-content">content</Content>
                <Footer class="dev-layout-center"></Footer>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
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
                        query: {}
                    },
                    {
                        key: 'button',
                        name: 'button',
                        icon: 'list',
                        rightIcon: 'down',
                        link: '/buttonView',
                        query: {}
                    },
                    {
                        key: 'input',
                        name: 'input',
                        icon: 'list',
                        rightIcon: 'down',
                        link: '/inputView',
                        query: {}
                    }
                ],
                collapsed: true,
                collapsedWidth: 60,
                hideTrigger: false,
                hideHeader: false,
                collapsedScroll: false,
                collapsedCustom: false,
                openKeys: ['submenu-option1']
            }
        },
        watch: {
            collapsedScroll(newVal) {
                if (newVal) this.openKeys = [];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-layout {
        .dev-layout-center {
            text-align: center;
        }

        h4 {
            text-align: left;
        }

        .dev-layout-content {
            min-height: 120px;
            line-height: 120px;
        }

        .dev-layout-bg-white {
            background-color: #ffffff;
        }

        .dev-layout-fixed {
            border: 1px solid #eee;
        }
    }
</style>
