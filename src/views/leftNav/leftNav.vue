<template>
    <div class="left-nav">
        <ClMenu :activeKey="activeMenu" width="auto">
            <ClMenuGroup v-for="(groupItem, groupIndex) in siderData"
                         :key="groupIndex"
                         :name="groupItem.name">
                <template v-if="groupItem.childrens">
                    <ClMenuItem v-for="menuItem in groupItem.childrens"
                                :key="menuItem.item"
                                :c-key="menuItem.key"
                                :disabled="menuItem.disabled"
                                :icon="menuItem.icon"
                                :name="menuItem.name"
                                :to="{path: mode + menuItem.link, query: menuItem.query}">
                        <!--<router-link class="left-nav-menu-item" :to="{path: menuItem.link, query: menuItem.query}">-->
                        <!---->
                        <!--</router-link>-->
                        <!--<i :class="menuItem.icon"></i>-->
                        <!--<span>{{menuItem.name}}</span>-->
                    </ClMenuItem>
                </template>
            </ClMenuGroup>
        </ClMenu>
    </div>
</template>

<script>
    import Config from '@/config'

    export default {
        name: "leftNav",
        data() {
            return {
                siderData: [
                    {
                        type: 'group',
                        name: '基础',
                        childrens: [
                            {
                                key: 'home',
                                name: 'Home主页',
                                icon: 'cl-icon-home',
                                link: '/home',
                                query: {},
                            },
                            {
                                key: 'button',
                                name: 'Button按钮',
                                icon: 'cl-icon-block',
                                link: '/button',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '布局',
                        childrens: [
                            {
                                key: 'layout',
                                name: 'Layout布局',
                                icon: 'cl-icon-square',
                                link: '/layout',
                                query: {},
                            },
                            {
                                key: 'card',
                                name: 'Card卡片',
                                icon: 'cl-icon-card1',
                                link: '/card',
                                query: {},
                            },
                            {
                                key: 'collapse',
                                name: 'Collapse折叠面板',
                                icon: 'cl-icon-collapse',
                                link: '/collapse',
                                query: {},
                            },
                            {
                                key: 'grid',
                                name: 'Grid栅格',
                                icon: 'cl-icon-collapse',
                                link: '/grid',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '导航',
                        childrens: [
                            {
                                key: 'menu',
                                name: 'Menu导航',
                                icon: 'cl-icon-list',
                                link: '/menu',
                                query: {},
                            },
                            {
                                key: 'tabs',
                                name: 'Tabs标签页',
                                icon: 'cl-icon-tab',
                                link: '/tabs',
                                query: {},
                            },
                            {
                                key: 'page',
                                name: 'Page分页',
                                icon: 'cl-icon-page',
                                link: '/page',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '表单',
                        childrens: [
                            {
                                key: 'input',
                                name: 'Input输入框',
                                icon: 'cl-icon-edit',
                                link: '/input',
                                query: {},
                            },
                            {
                                key: 'checkbox',
                                name: 'Checkbox复选框',
                                icon: 'cl-icon-checkbox',
                                link: '/checkbox',
                                query: {},
                            },
                            {
                                key: 'radio',
                                name: 'Radio单选框',
                                icon: 'cl-icon-radio',
                                link: '/radio',
                                query: {},
                            },
                            {
                                key: 'select',
                                name: 'Select下拉选择',
                                icon: 'cl-icon-down',
                                link: '/select',
                                query: {},
                            },
                            {
                                key: 'switch',
                                name: 'Switch开关',
                                icon: 'cl-icon-switch',
                                link: '/switch',
                                query: {},
                            },
                            {
                                key: 'slider',
                                name: 'Slider滑块',
                                icon: 'cl-icon-minus',
                                link: '/slider',
                                query: {},
                            },
                            {
                                key: 'upload',
                                name: 'Upload上传',
                                icon: 'cl-icon-cloud-upload',
                                link: '/upload',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '数据',
                        childrens: [
                            {
                                key: 'table',
                                name: 'Table表格',
                                icon: 'cl-icon-table',
                                link: '/table',
                                query: {},
                                disabled: true,
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '视图',
                        childrens: [
                            {
                                key: 'alter',
                                name: 'Alter警告提示',
                                icon: 'cl-icon-warning',
                                link: '/alter',
                                query: {},
                            },
                            {
                                key: 'badge',
                                name: 'Badge徽标',
                                icon: 'cl-icon-card',
                                link: '/badge',
                                query: {},
                            },
                            {
                                key: 'notice',
                                name: 'Notice通知提醒',
                                icon: 'cl-icon-notification',
                                link: '/notice',
                                query: {},
                            },
                            {
                                key: 'message',
                                name: 'Message全局提示',
                                icon: 'cl-icon-info',
                                link: '/message',
                                query: {},
                            },
                            {
                                key: 'modal',
                                name: 'Modal模态框',
                                icon: 'cl-icon-modal',
                                link: '/modal',
                                query: {},
                            },
                            {
                                key: 'drawer',
                                name: 'Drawer抽屉',
                                icon: 'cl-icon-list1',
                                link: '/drawer',
                                query: {},
                            },
                            {
                                key: 'tag',
                                name: 'Tag标签',
                                icon: 'cl-icon-label',
                                link: '/tag',
                                query: {},
                            },
                            {
                                key: 'popover',
                                name: 'Popover气泡提示',
                                icon: 'cl-icon-popover',
                                link: '/popover',
                                query: {},
                            },
                            {
                                key: 'tooltip',
                                name: 'Tooltip文字提示',
                                icon: 'cl-icon-tooltip',
                                link: '/tooltip',
                                query: {},
                            },
                            {
                                key: 'progress',
                                name: 'Progress进度条',
                                icon: 'cl-icon-minus',
                                link: '/progress',
                                query: {},
                            },
                        ]
                    },
                ],
                activeMenu: '',
                mode: `/${Config.env}/doc`
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setActiveMenu();
        },
        methods: {
            setActiveMenu() {
                let path = this.$route.path;
                this.siderData.forEach(item => {
                    item.childrens && item.childrens.forEach(childItem => {
                        if (this.mode + childItem.link === path) {
                            this.activeMenu = childItem.key;
                        }
                    })
                });
            }
        },
        watch: {
            '$route': function () {
                this.setActiveMenu();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-nav {
        padding: 20px 0;
        background-color: #ffffff;
        .left-nav-menu-item {
            display: block;
            /*color: #515a6e;*/
            i {
                font-size: 14px;
            }
        }
    }
</style>
