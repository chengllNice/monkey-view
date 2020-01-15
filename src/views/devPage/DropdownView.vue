<template>
    <div class="dropdown-view">
        <cl-dropdown>
            <cl-button type="text">下拉菜单 <i class="cl-icon-down"></i></cl-button>
            <cl-dropdown-menu slot="menu">
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item divided>22</cl-dropdown-item>
            </cl-dropdown-menu>
        </cl-dropdown>

        <cl-dropdown trigger="click">
            <cl-button type="primary">下拉菜单 <i class="cl-icon-down"></i></cl-button>
            <cl-dropdown-menu slot="menu">
                <cl-dropdown-item>333</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item divided>22</cl-dropdown-item>
            </cl-dropdown-menu>
        </cl-dropdown>

        <cl-dropdown trigger="contextmenu">
            <cl-button type="primary">下拉菜单 <i class="cl-icon-down"></i></cl-button>
            <cl-dropdown-menu slot="menu">
                <cl-dropdown-item>333</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item divided>22</cl-dropdown-item>
            </cl-dropdown-menu>
        </cl-dropdown>

        <cl-dropdown trigger="custom" :visible="visible">
            <cl-button type="text" @click="visible = true">下拉菜单 <i class="cl-icon-down"></i></cl-button>
            <cl-dropdown-menu slot="menu">
                <p>常用于各种自定义下拉内容的场景。</p>
                <div style="text-align: right;">
                    <cl-button type="primary" @click="visible = false">关闭</cl-button>
                </div>
            </cl-dropdown-menu>
        </cl-dropdown>


        <cl-dropdown>
            <cl-button type="primary">下拉菜单 <i class="cl-icon-down"></i></cl-button>
            <cl-dropdown-menu slot="menu">
                <cl-dropdown-item>333</cl-dropdown-item>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown placement="right-start">
                    <cl-dropdown-item>right <i class="cl-icon-right"></i></cl-dropdown-item>
                    <cl-dropdown-menu slot="menu">
                        <cl-dropdown-item>333</cl-dropdown-item>
                        <cl-dropdown-item>22</cl-dropdown-item>
                        <cl-dropdown-item>22</cl-dropdown-item>
                        <cl-dropdown-item>22</cl-dropdown-item>
                        <cl-dropdown-item divided>22</cl-dropdown-item>
                    </cl-dropdown-menu>
                </cl-dropdown>
                <cl-dropdown-item>22</cl-dropdown-item>
                <cl-dropdown-item divided>22</cl-dropdown-item>
            </cl-dropdown-menu>
        </cl-dropdown>
    </div>
</template>

<script>
    export default {
        name: "DropdownView",
        data(){
            return {
                visible: false,
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
.dropdown-view{
    padding-bottom: 200px;
}
</style>
