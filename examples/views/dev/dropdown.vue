<template>
    <div class="dev-dropdown">
        <Dropdown :hide-on-click="false" @click="handleClick" @click-outside="handleClickOutside" :renderHtml="false">
            <Button type="text">下拉菜单
                <Icon type="down"></Icon>
            </Button>
            <DropdownMenu slot="menu">
                <DropdownItem name="name-1">name-1</DropdownItem>
                <DropdownItem name="name-2">name-2</DropdownItem>
                <DropdownItem name="name-3">name-3</DropdownItem>
                <DropdownItem name="name-4">name-4</DropdownItem>
                <DropdownItem name="name-5" divided>name-5</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown trigger="click">
            <Button type="primary">下拉菜单
                <Icon type="down"></Icon>
            </Button>
            <DropdownMenu slot="menu">
                <DropdownItem>333</DropdownItem>
                <DropdownItem>22</DropdownItem>
                <DropdownItem>22</DropdownItem>
                <DropdownItem>年</DropdownItem>
                <DropdownItem divided>22</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown trigger="contextmenu">
            <Button type="primary">下拉菜单
                <Icon type="down"></Icon>
            </Button>
            <DropdownMenu slot="menu">
                <DropdownItem>333</DropdownItem>
                <DropdownItem>22</DropdownItem>
                <DropdownItem>22</DropdownItem>
                <DropdownItem>22</DropdownItem>
                <DropdownItem divided>22</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown trigger="custom" :visible="visible">
            <Button type="text" @click="visible = true">下拉菜单
                <Icon type="down"></Icon>
            </Button>
            <DropdownMenu slot="menu">
                <p>常用于各种自定义下拉内容的场景。</p>
                <div style="text-align: right;">
                    <Button type="primary" @click="visible = false">关闭</Button>
                </div>
            </DropdownMenu>
        </Dropdown>

        <Dropdown @click="handleClick">
            <Button type="primary">下拉菜单
                <Icon type="down"></Icon>
            </Button>
            <DropdownMenu slot="menu">
                <DropdownItem name="name-1">name-1</DropdownItem>
                <DropdownItem name="name-2">name-2</DropdownItem>
                <Dropdown placement="right-start">
                    <DropdownItem name="name-3">name-3
                        <Icon type="right"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="menu">
                        <DropdownItem name="name-3-1">name-3-1</DropdownItem>
                        <DropdownItem name="name-3-2">name-3-1</DropdownItem>
                        <DropdownItem name="name-3-3">name-3-3</DropdownItem>
                        <DropdownItem name="name-3-4">name-3-4</DropdownItem>
                        <DropdownItem name="name-3-5" divided>name-3-5</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <DropdownItem name="name-4">name-4</DropdownItem>
                <DropdownItem name="name-5" divided>name-5</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
        methods: {
            handleClick(name) {
                console.log('click-', name)
            },
            handleClickOutside() {
                console.log('handleClickOutside')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-dropdown {
        padding-bottom: 200px;
    }
</style>
