<template>
    <div class="MenuView">

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


        <div class="viewDes">
            <h3>API</h3>
            <h4>menu props</h4>

            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>mode=vertical时有效</p>
                <p><b>默认值：</b>240</p>
            </div>
            <div class="propItem">
                <p><b>属性：theme</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>主题，可选值light/dark/green</p>
                <p><b>默认值：</b>light</p>
            </div>
            <div class="propItem">
                <p><b>属性：size</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>尺寸，可选值small/default/large</p>
                <p><b>默认值：</b>default</p>
            </div>
            <div class="propItem">
                <p><b>属性：activeKey</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>当前激活菜单的key值，只对menuItem组件的key值有效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：openKeys</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>展开的submenu的key值集合</p>
                <p><b>默认值：</b>[]</p>
            </div>
            <div class="propItem">
                <p><b>属性：accordion</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否开始手风琴模式，开启后每次最多展开一个submenu</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：mode</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单类型，可选值vertical(垂直)/horizontal(水平)</p>
                <p><b>默认值：</b>vertical</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>menuItem props</h4>

            <div class="propItem">
                <p><b>属性：cKey</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>必填，菜单的位置标识</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单的名字</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>菜单是否禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：icon</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单名字左侧的图标</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：to</b></p>
                <p><b>类型：Object, String</b></p>
                <p><b>说明：</b>router-link的to属性</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>submenu props</h4>

            <div class="propItem">
                <p><b>属性：cKey</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>必填，菜单的位置标识</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单的名字</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>菜单是否禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：icon</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单名字左侧的图标</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：hideDropIcon</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否隐藏右侧下拉图标</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：forbidden</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否禁用展开收起，和disabled不一样的是不控制样式，在某些情况下会比较有用</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>menuGroup props</h4>

            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>菜单的名字</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>menu event</h4>

            <div class="propItem">
                <p><b>事件名：select</b></p>
                <p><b>说明：</b>选中菜单时触发,返回当前选中的菜单的key值</p>
                <p><b>返回值：</b>key</p>
            </div>
            <div class="propItem">
                <p><b>事件名：open-change</b></p>
                <p><b>说明：</b>submenu展开收起时触发，返回第一个参数为当前触发展开收起的submenu的key值，第二个参数为所有展开项的key数组</p>
                <p><b>返回值：</b>key, openedKeys</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>menuGroup slot</h4>

            <div class="propItem">
                <p><b>名称：title</b></p>
                <p><b>说明：</b>自定义title标题</p>
            </div>
        </div>
        <div class="viewDes">
            <h3>API</h3>
            <h4>submenu slot</h4>

            <div class="propItem">
                <p><b>名称：title</b></p>
                <p><b>说明：</b>自定义title标题</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "MenuView",
    data() {
      return {
          collapse: false
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerSelect(key){
        console.log(key, 'handlerSelect')
      },
      handlerOpenChange(key, selectKeys){
        console.log(key, selectKeys, 'handlerOpenChange')
      }
    }
  }
</script>

<style lang="scss" scoped>
.MenuView{
    padding-bottom: 200px;
}
</style>
