<template>
    <div class="left-nav">
        <Menu :activeKey="activeMenu">
            <template v-for="(item, index) in currentData">
                <MenuGroup v-if="item.type === 'group'"
                           :key="index"
                           :name="item.name">
                    <template v-if="item.childrens">
                        <MenuItem v-for="menuItem in item.childrens"
                                  :key="menuItem.item"
                                  :c-key="menuItem.key"
                                  :disabled="menuItem.disabled"
                                  :icon="menuItem.icon"
                                  :name="menuItem.name"
                                  :to="{path: '/' + lang + menuItem.link, query: menuItem.query}">
                        </MenuItem>
                    </template>
                </MenuGroup>

                <MenuItem v-else
                          :key="item.item"
                          :c-key="item.key"
                          :disabled="item.disabled"
                          :icon="item.icon"
                          :name="item.name"
                          :to="{path: '/' + lang + item.link, query: item.query}">
                </MenuItem>
            </template>
        </Menu>
    </div>
</template>

<script>
    import Config from 'examples/config'

    export default {
        name: 'LeftNav',
        data() {
            return {
                guideData: [
                    {
                        key: 'install',
                        name: '安装',
                        link: '/guide/install',
                        query: {}
                    },
                    {
                        key: 'quick-start',
                        name: '快速上手',
                        link: '/guide/quick-start',
                        query: {}
                    },
                    {
                        key: 'i18n',
                        name: '国际化',
                        link: '/guide/i18n',
                        query: {}
                    },
                    {
                        key: 'theme',
                        name: '定制主题',
                        link: '/guide/theme',
                        query: {}
                    }
                ],
                componentsData: [
                    {
                        type: 'group',
                        name: '基础',
                        childrens: [
                            {
                                key: 'color',
                                name: 'Color色彩',
                                icon: 'color',
                                link: '/component/color',
                                query: {}
                            },
                            {
                                key: 'font',
                                name: 'Font字体',
                                icon: 'font',
                                link: '/component/font',
                                query: {}
                            },
                            {
                                key: 'button',
                                name: 'Button按钮',
                                icon: 'button',
                                link: '/component/button',
                                query: {}
                            },
                            {
                                key: 'icon',
                                name: 'Icon图标',
                                icon: 'heart',
                                link: '/component/icon',
                                query: {}
                            }
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
                                link: '/component/layout',
                                query: {}
                            },
                            {
                                key: 'card',
                                name: 'Card卡片',
                                icon: 'card',
                                link: '/component/card',
                                query: {}
                            },
                            {
                                key: 'collapse',
                                name: 'Collapse折叠面板',
                                icon: 'collapse',
                                link: '/component/collapse',
                                query: {}
                            },
                            {
                                key: 'grid',
                                name: 'Grid栅格',
                                icon: 'grid',
                                link: '/component/grid',
                                query: {}
                            },
                            {
                                key: 'list',
                                name: 'List列表',
                                icon: 'list-dot',
                                link: '/component/list',
                                query: {}
                            }
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
                                link: '/component/menu',
                                query: {}
                            },
                            {
                                key: 'tabs',
                                name: 'Tabs标签页',
                                icon: 'tab',
                                link: '/component/tabs',
                                query: {}
                            },
                            {
                                key: 'page',
                                name: 'Page分页',
                                icon: 'page',
                                link: '/component/page',
                                query: {}
                            },
                            {
                                key: 'dropdown',
                                name: 'Dropdown下拉菜单',
                                icon: 'care-down',
                                link: '/component/dropdown',
                                query: {}
                            },
                            {
                                key: 'steps',
                                name: 'Steps步骤条',
                                icon: 'care-down',
                                link: '/component/steps',
                                query: {}
                            },
                            {
                                key: 'breadcrumb',
                                name: 'Breadcrumb面包屑导航',
                                icon: 'care-down',
                                link: '/component/breadcrumb',
                                query: {}
                            }
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
                                link: '/component/input',
                                query: {}
                            },
                            {
                                key: 'checkbox',
                                name: 'Checkbox复选框',
                                icon: 'checkbox',
                                link: '/component/checkbox',
                                query: {}
                            },
                            {
                                key: 'radio',
                                name: 'Radio单选框',
                                icon: 'radio',
                                link: '/component/radio',
                                query: {}
                            },
                            {
                                key: 'select',
                                name: 'Select下拉选择',
                                icon: 'down',
                                link: '/component/select',
                                query: {}
                            },
                            {
                                key: 'cascader',
                                name: 'Cascader级联选择',
                                icon: 'cascader',
                                link: '/component/cascader',
                                query: {}
                            },
                            {
                                key: 'switch',
                                name: 'Switch开关',
                                icon: 'switch',
                                link: '/component/switch',
                                query: {}
                            },
                            {
                                key: 'slider',
                                name: 'Slider滑块',
                                icon: 'minus',
                                link: '/component/slider',
                                query: {}
                            },
                            {
                                key: 'date-picker',
                                name: 'DatePicker日期选择器',
                                icon: 'date',
                                link: '/component/date-picker',
                                query: {}
                            },
                            {
                                key: 'time-picker',
                                name: 'TimePicker时间选择器',
                                icon: 'time',
                                link: '/component/time-picker',
                                query: {}
                            },
                            {
                                key: 'upload',
                                name: 'Upload上传',
                                icon: 'cloud-upload',
                                link: '/component/upload',
                                query: {}
                            },
                            {
                                key: 'form',
                                name: 'Form表单',
                                icon: 'form',
                                link: '/component/form',
                                query: {}
                            }
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
                                link: '/component/table',
                                query: {}
                            }
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
                                link: '/component/alter',
                                query: {}
                            },
                            {
                                key: 'badge',
                                name: 'Badge徽标',
                                icon: 'block',
                                link: '/component/badge',
                                query: {}
                            },
                            {
                                key: 'notice',
                                name: 'Notice通知提醒',
                                icon: 'notification',
                                link: '/component/notice',
                                query: {}
                            },
                            {
                                key: 'message',
                                name: 'Message全局提示',
                                icon: 'info',
                                link: '/component/message',
                                query: {}
                            },
                            {
                                key: 'modal',
                                name: 'Modal模态框',
                                icon: 'modal',
                                link: '/component/modal',
                                query: {}
                            },
                            {
                                key: 'drawer',
                                name: 'Drawer抽屉',
                                icon: 'drawer',
                                link: '/component/drawer',
                                query: {}
                            },
                            {
                                key: 'tag',
                                name: 'Tag标签',
                                icon: 'label',
                                link: '/component/tag',
                                query: {}
                            },
                            {
                                key: 'popover',
                                name: 'Popover气泡提示',
                                icon: 'popover',
                                link: '/component/popover',
                                query: {}
                            },
                            {
                                key: 'tooltip',
                                name: 'Tooltip文字提示',
                                icon: 'tooltip',
                                link: '/component/tooltip',
                                query: {}
                            },
                            {
                                key: 'progress',
                                name: 'Progress进度条',
                                icon: 'minus',
                                link: '/component/progress',
                                query: {}
                            },
                            {
                                key: 'time',
                                name: 'Time相对时间',
                                icon: 'time',
                                link: '/component/time',
                                query: {}
                            },
                            {
                                key: 'timeline',
                                name: 'Timeline时间轴',
                                icon: 'time',
                                link: '/component/timeline',
                                query: {}
                            },
                            {
                                key: 'image',
                                name: 'Image图片',
                                icon: 'picture',
                                link: '/component/image',
                                query: {}
                            },
                            {
                                key: 'skeleton',
                                name: 'Skeleton骨架屏',
                                icon: 'skeleton',
                                link: '/component/skeleton',
                                query: {}
                            },
                            {
                                key: 'tree',
                                name: 'Tree树形',
                                icon: 'tree',
                                link: '/component/tree',
                                query: {}
                            }
                        ]
                    },
                    {
                        type: 'group',
                        name: '其他',
                        childrens: [
                            {
                                key: 'loading',
                                name: 'Loading加载中',
                                icon: 'loading',
                                link: '/component/loading',
                                query: {}
                            },
                            {
                                key: 'back-top',
                                name: 'BackTop回到顶部',
                                icon: 'up',
                                link: '/component/back-top',
                                query: {}
                            },
                            {
                                key: 'affix',
                                name: 'Affix图钉',
                                icon: 'affix',
                                link: '/component/affix',
                                query: {}
                            }
                        ]
                    }
                ],
                currentData: [],
                activeMenu: '',
                lang: Config.defaultLang
            }
        },
        mounted() {
            this.setCurrentData();
            this.setActiveMenu();
        },
        methods: {
            setCurrentData() {
                const path = this.$route.path;
                if (path.includes('guide')) {
                    this.currentData = this.guideData;
                } else if (path.includes('component')) {
                    this.currentData = this.componentsData;
                } else {
                    this.currentData = [];
                }
            },
            setActiveMenu() {
                let path = this.$route.path;
                path = path.substring(1);
                this.lang = Config.langTypes.includes(path.split('/')[0]) ? path.split('/')[0] : Config.defaultLang;
                this.currentData.forEach(item => {
                    if (item.type === 'group') {
                        item.childrens && item.childrens.forEach(childItem => {
                            if (this.lang + childItem.link === path) {
                                this.activeMenu = childItem.key;
                            }
                        })
                    } else {
                        if (this.lang + item.link === path) {
                            this.activeMenu = item.key;
                        }
                    }
                });
            }
        },
        watch: {
            $route: function () {
                this.setCurrentData();
                this.setActiveMenu();
            }
        }
    }
</script>
