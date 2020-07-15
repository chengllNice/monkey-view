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
                        <!--<Icon :class="menuItem.icon"></Icon>-->
                        <!--<span>{{menuItem.name}}</span>-->
                    </ClMenuItem>
                </template>
            </ClMenuGroup>
        </ClMenu>
    </div>
</template>

<script>
    import Config from 'examples/config'
    export default {
        name: "leftNav",
        data() {
            return {
                siderData: [
                    {
                        type: 'group',
                        name: '开发指南',
                        childrens: [
                            {
                                key: 'introduce',
                                name: '介绍',
                                link: '/introduce',
                                query: {},
                            },
                            {
                                key: 'install',
                                name: '安装',
                                link: '/install',
                                query: {},
                            },
                            {
                                key: 'quick-start',
                                name: '快速上手',
                                link: '/quick-start',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'group',
                        name: '基础',
                        childrens: [
                            {
                                key: 'color',
                                name: 'Color色彩',
                                icon: 'home',
                                link: '/color',
                                query: {},
                            },
                            {
                                key: 'button',
                                name: 'Button按钮',
                                icon: 'button',
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
                                icon: 'square',
                                link: '/layout',
                                query: {},
                            },
                            {
                                key: 'card',
                                name: 'Card卡片',
                                icon: 'card',
                                link: '/card',
                                query: {},
                            },
                            {
                                key: 'collapse',
                                name: 'Collapse折叠面板',
                                icon: 'collapse',
                                link: '/collapse',
                                query: {},
                            },
                            {
                                key: 'grid',
                                name: 'Grid栅格',
                                icon: 'grid',
                                link: '/grid',
                                query: {},
                            },
                            {
                                key: 'list',
                                name: 'List列表',
                                icon: 'list',
                                link: '/list',
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
                                icon: 'list',
                                link: '/menu',
                                query: {},
                            },
                            {
                                key: 'tabs',
                                name: 'Tabs标签页',
                                icon: 'tab',
                                link: '/tabs',
                                query: {},
                            },
                            {
                                key: 'page',
                                name: 'Page分页',
                                icon: 'page',
                                link: '/page',
                                query: {},
                            },
                            {
                                key: 'dropdown',
                                name: 'Dropdown下拉菜单',
                                icon: 'care-down',
                                link: '/dropdown',
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
                                icon: 'edit',
                                link: '/input',
                                query: {},
                            },
                            {
                                key: 'checkbox',
                                name: 'Checkbox复选框',
                                icon: 'checkbox',
                                link: '/checkbox',
                                query: {},
                            },
                            {
                                key: 'radio',
                                name: 'Radio单选框',
                                icon: 'radio',
                                link: '/radio',
                                query: {},
                            },
                            {
                                key: 'select',
                                name: 'Select下拉选择',
                                icon: 'down',
                                link: '/select',
                                query: {},
                            },
                            {
                                key: 'cascader',
                                name: 'Cascader级联选择',
                                icon: 'down',
                                link: '/cascader',
                                query: {},
                            },
                            {
                                key: 'switch',
                                name: 'Switch开关',
                                icon: 'switch',
                                link: '/switch',
                                query: {},
                            },
                            {
                                key: 'slider',
                                name: 'Slider滑块',
                                icon: 'minus',
                                link: '/slider',
                                query: {},
                            },
                            {
                                key: 'date-picker',
                                name: 'DatePicker日期选择器',
                                icon: 'date',
                                link: '/date-picker',
                                query: {},
                            },
                            {
                                key: 'time-picker',
                                name: 'TimePicker时间选择器',
                                icon: 'time',
                                link: '/time-picker',
                                query: {},
                            },
                            {
                                key: 'upload',
                                name: 'Upload上传',
                                icon: 'cloud-upload',
                                link: '/upload',
                                query: {},
                            },
                            {
                                key: 'form',
                                name: 'Form表单',
                                icon: 'cloud-upload',
                                link: '/form',
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
                                icon: 'table',
                                link: '/table',
                                query: {},
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
                                icon: 'warning',
                                link: '/alter',
                                query: {},
                            },
                            {
                                key: 'badge',
                                name: 'Badge徽标',
                                icon: 'card',
                                link: '/badge',
                                query: {},
                            },
                            {
                                key: 'notice',
                                name: 'Notice通知提醒',
                                icon: 'notification',
                                link: '/notice',
                                query: {},
                            },
                            {
                                key: 'message',
                                name: 'Message全局提示',
                                icon: 'info',
                                link: '/message',
                                query: {},
                            },
                            {
                                key: 'modal',
                                name: 'Modal模态框',
                                icon: 'modal',
                                link: '/modal',
                                query: {},
                            },
                            {
                                key: 'drawer',
                                name: 'Drawer抽屉',
                                icon: 'list',
                                link: '/drawer',
                                query: {},
                            },
                            {
                                key: 'tag',
                                name: 'Tag标签',
                                icon: 'label',
                                link: '/tag',
                                query: {},
                            },
                            {
                                key: 'popover',
                                name: 'Popover气泡提示',
                                icon: 'popover',
                                link: '/popover',
                                query: {},
                            },
                            {
                                key: 'tooltip',
                                name: 'Tooltip文字提示',
                                icon: 'tooltip',
                                link: '/tooltip',
                                query: {},
                            },
                            {
                                key: 'progress',
                                name: 'Progress进度条',
                                icon: 'minus',
                                link: '/progress',
                                query: {},
                            },
                            {
                                key: 'time',
                                name: 'Time相对时间',
                                icon: 'time',
                                link: '/time',
                                query: {},
                            },
                            {
                                key: 'image',
                                name: 'Image图片',
                                icon: 'picture',
                                link: '/image',
                                query: {},
                            },
                            {
                                key: 'skeleton',
                                name: 'Skeleton骨架屏',
                                icon: 'list',
                                link: '/skeleton',
                                query: {},
                            },
                            {
                                key: 'tree',
                                name: 'Tree树形',
                                icon: 'list',
                                link: '/tree',
                                query: {},
                            },
                        ]
                    },
                    {
                        type: 'other',
                        name: '其他',
                        childrens: [
                            {
                                key: 'loading',
                                name: 'Loading加载中',
                                icon: 'loading',
                                link: '/loading',
                                query: {},
                            },
                            {
                                key: 'back-top',
                                name: 'BackTop回到顶部',
                                icon: 'up',
                                link: '/back-top',
                                query: {},
                            },
                            {
                                key: 'affix',
                                name: 'Affix图钉',
                                icon: 'up',
                                link: '/affix',
                                query: {},
                            },
                        ]
                    },
                ],
                activeMenu: '',
                mode: '',
                lang: Config.defaultLang
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
                this.lang = Config.langTypes.includes(path.split('/')[1]) ? path.split('/')[1] : Config.defaultLang;
                this.mode = `/${this.lang}/doc`;
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

<style lang="scss">
    .left-nav {
        padding: 20px 0;
        background-color: #ffffff;
        /*i {*/
            /*font-size: 14px;*/
        /*}*/
        span{
            font-size: 12px;
        }
    }
</style>
