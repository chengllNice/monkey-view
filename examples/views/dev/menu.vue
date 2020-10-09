<template>
    <div class="dev-menu">

        <m-switch v-model="collapse">
            <span slot="open">展开</span>
            <span slot="close">收起</span>
        </m-switch>

        <Menu :collapse="collapse">
            <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
            <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
                <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
                <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
            </Submenu>

            <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
            <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
        </Menu>

        <Menu mode="horizontal">
            <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
            <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
                <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
                <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
            </Submenu>
            <Submenu c-key="echarts" icon='echarts-pie' name="统计分析">
                <MenuGroup name="图表">
                    <MenuItem c-key="echarts-bar" icon="echarts-bar" name="柱状图"></MenuItem>
                    <MenuItem c-key="echarts-line" icon="echarts-line" name="折线图"></MenuItem>
                </MenuGroup>
                <MenuGroup name="数据">
                    <MenuItem c-key="heart" icon="heart" name="最受欢迎"></MenuItem>
                    <MenuItem c-key="table" icon="table" name="表格"></MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu c-key="user-manage" icon='user' name="用户管理">
                <MenuItem c-key="user-role-manage" name="用户角色管理"></MenuItem>
                <MenuItem c-key="user-vip-manage" name="专属用户管理"></MenuItem>
                <Submenu c-key="user-bill-manage" name="用户账单管理">
                    <MenuItem c-key="one-month" name="近一个月消费"></MenuItem>
                    <MenuItem c-key="three-month" name="近三个月消费"></MenuItem>
                    <MenuItem c-key="one-year" name="近一年消费"></MenuItem>
                </Submenu>
            </Submenu>
            <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
            <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
        </Menu>

        <h4>mode=vertical,theme=light</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" width="300px" :collapse="true">
            <MenuItem c-key="button-item-1" name="button-item" disabled to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" icon="home" name="submenu">
                <MenuItem c-key="button-1" disabled name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" icon="home" disabled name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" icon="home" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>

        <h4>mode=vertical,theme=light</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" icon="home" name="submenu">
                <MenuItem c-key="button-1" disabled name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" icon="home" disabled name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" icon="home" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>

        <h4>mode=vertical,theme=light,accordion(手风琴模式)</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" accordion width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" name="submenu">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>

        <h4>mode=vertical,theme=dark</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" theme="dark" width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" name="submenu">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
        <h4>mode=vertical,theme=dark,accordion(手风琴模式)</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" accordion theme="dark" width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" name="submenu">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>

        <h4>mode=vertical,theme=green</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" theme="green" width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" name="submenu">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
        <h4>mode=vertical,theme=green,accordion(手风琴模式)</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" accordion theme="green" width="300px">
            <MenuItem c-key="button-item-1" name="button-item" to="/buttonView">
                <Icon type="list"></Icon>
                <span>button-item</span>
            </MenuItem>
            <Submenu c-key="submenu-sub-1" name="submenu">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    <span>button</span>
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    <span>input</span>
                </MenuItem>
                <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                    <Icon type="list"></Icon>
                    <span>badge</span>
                </MenuItem>
                <Submenu c-key="submenu-sub-1-2" name="submenu1-2">
                    <MenuItem c-key="button-1-2" name="button" to="/buttonView">
                        <Icon type="list"></Icon>
                        <span>button</span>
                    </MenuItem>
                    <MenuGroup name="groupTitle1-2-1">
                        <MenuItem c-key="button-1-2-1" name="button" to="/buttonView">
                            <Icon type="list"></Icon>
                            <span>button</span>
                        </MenuItem>
                        <MenuItem c-key="input-1-2-1" name="input" to="/inputView" icon="list">
                            <Icon type="list"></Icon>
                            <span>input</span>
                        </MenuItem>
                        <MenuItem c-key="badge-1-2-1" name="badge" to="/badgeView">
                            <Icon type="list"></Icon>
                            <span>badge</span>
                        </MenuItem>
                    </MenuGroup>

                    <MenuItem c-key="input-1-2" name="input" to="/inputView" icon="list">
                        <Icon type="list"></Icon>
                        <span>input</span>
                    </MenuItem>
                    <MenuItem c-key="badge-1-2" name="badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        <span>badge</span>
                    </MenuItem>
                </Submenu>
            </Submenu>
            <Submenu c-key="submenu-sub-2" name="submenu2">
                <MenuItem c-key="button-2" name="button2" to="/buttonView"></MenuItem>
                <MenuItem c-key="input-2" name="input2" to="/inputView" icon="list"></MenuItem>
                <MenuItem c-key="badge-2" name="badge2" to="/badgeView"></MenuItem>
            </Submenu>
            <Submenu c-key="submenu-sub-3" name="submenu3">
                <MenuGroup name="groupTitle3">
                    <MenuItem c-key="button-3-1" name="button3-1" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-1" name="input3-1" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-1" name="badge3-1" to="/badgeView"></MenuItem>
                </MenuGroup>
                <MenuGroup name="groupTitle3-2">
                    <MenuItem c-key="button-3-2" name="button3-2" to="/buttonView"></MenuItem>
                    <MenuItem c-key="input-3-2" name="input3-2" to="/inputView" icon="list"></MenuItem>
                    <MenuItem c-key="badge-3-2" name="badge3-2" to="/badgeView"></MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>

        <h4>mode=horizontal,theme=light</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" mode="horizontal">
            <Submenu c-key="submenu-1" name="submenusubmenu-1">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    buttonbuttonbuttonbuttonbuttonbuttonbuttonbutton
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    input
                </MenuItem>
            </Submenu>
            <Submenu c-key="submenu-2" name="submenusubmenu-2">
                <MenuGroup name="group1">
                    <MenuItem c-key="group1-badge-1" name="group1-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group1-badge
                    </MenuItem>
                </MenuGroup>
                <MenuGroup name="group2">
                    <MenuItem c-key="group2-badge-1" name="group2-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group2-badge
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                <Icon type="list"></Icon>
                badge
            </MenuItem>
            <MenuItem c-key="list-1" name="list" to="/badgeView">
                <Icon type="list"></Icon>
                list
            </MenuItem>
            <MenuItem c-key="test-1" name="test" to="/badgeView">
                <Icon type="list"></Icon>
                test
            </MenuItem>
            <MenuItem c-key="checkbox-1" name="checkbox" to="/badgeView">
                <Icon type="list"></Icon>
                checkbox
            </MenuItem>
            <MenuItem c-key="radio-1" name="radio" to="/badgeView">
                <Icon type="list"></Icon>
                radio
            </MenuItem>
        </Menu>


        <h4>mode=horizontal,theme=dark</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" theme="dark" mode="horizontal">
            <Submenu c-key="submenu-1" name="submenusubmenu-1">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    buttonbuttonbuttonbuttonbuttonbuttonbuttonbutton
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    input
                </MenuItem>
            </Submenu>
            <Submenu c-key="submenu-2" name="submenusubmenu-2">
                <MenuGroup name="group1">
                    <MenuItem c-key="group1-badge-1" name="group1-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group1-badge
                    </MenuItem>
                </MenuGroup>
                <MenuGroup name="group2">
                    <MenuItem c-key="group2-badge-1" name="group2-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group2-badge
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                <Icon type="list"></Icon>
                badge
            </MenuItem>
            <MenuItem c-key="list-1" name="list" to="/badgeView">
                <Icon type="list"></Icon>
                list
            </MenuItem>
            <MenuItem c-key="test-1" name="test" to="/badgeView">
                <Icon type="list"></Icon>
                test
            </MenuItem>
            <MenuItem c-key="checkbox-1" name="checkbox" to="/badgeView">
                <Icon type="list"></Icon>
                checkbox
            </MenuItem>
            <MenuItem c-key="radio-1" name="radio" to="/badgeView">
                <Icon type="list"></Icon>
                radio
            </MenuItem>
        </Menu>


        <h4>mode=horizontal,theme=green</h4>
        <Menu @open-change="handlerOpenChange" @select="handlerSelect" theme="green" mode="horizontal">
            <Submenu c-key="submenu-1" name="submenusubmenu-1">
                <MenuItem c-key="button-1" name="button" to="/buttonView">
                    <Icon type="list"></Icon>
                    buttonbuttonbuttonbuttonbuttonbuttonbuttonbutton
                </MenuItem>
                <MenuItem c-key="input-1" name="input" to="/inputView" icon="list">
                    <Icon type="list"></Icon>
                    input
                </MenuItem>
            </Submenu>
            <Submenu c-key="submenu-2" name="submenusubmenu-2">
                <MenuGroup name="group1">
                    <MenuItem c-key="group1-badge-1" name="group1-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group1-badge
                    </MenuItem>
                </MenuGroup>
                <MenuGroup name="group2">
                    <MenuItem c-key="group2-badge-1" name="group2-badge" to="/badgeView">
                        <Icon type="list"></Icon>
                        group2-badge
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem c-key="badge-1" name="badge" to="/badgeView">
                <Icon type="list"></Icon>
                badge
            </MenuItem>
            <MenuItem c-key="list-1" name="list" to="/badgeView">
                <Icon type="list"></Icon>
                list
            </MenuItem>
            <MenuItem c-key="test-1" name="test" to="/badgeView">
                <Icon type="list"></Icon>
                test
            </MenuItem>
            <MenuItem c-key="checkbox-1" name="checkbox" to="/badgeView">
                <Icon type="list"></Icon>
                checkbox
            </MenuItem>
            <MenuItem c-key="radio-1" name="radio" to="/badgeView">
                <Icon type="list"></Icon>
                radio
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapse: false
            }
        },
        methods: {
            handlerSelect(key) {
                console.log(key, 'handlerSelect')
            },
            handlerOpenChange(key, selectKeys) {
                console.log(key, selectKeys, 'handlerOpenChange')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-menu {
        padding-bottom: 200px;
    }
</style>
