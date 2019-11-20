<template>
    <ClLayout class="views">
        <ClHeader class="views-header">
            <CHeader></CHeader>
        </ClHeader>
        <ClLayout class="views-layout">
            <ClSider hide-trigger width="220">
                <LeftNav></LeftNav>
            </ClSider>
            <ClContent class="views-main-content" ref="viewsMainContent">
                <div class="view-main-content-card">
                    <cl-row :gutter="16">
                        <cl-col style="padding: 16px;">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </cl-col>
                        <cl-col span="3">
                            <anchors-link></anchors-link>
                        </cl-col>
                    </cl-row>
                </div>
                <ClFooter class="views-main-content-footer">
                    <CFooter></CFooter>
                </ClFooter>
            </ClContent>
        </ClLayout>
    </ClLayout>
</template>

<script>
    import LeftNav from './leftNav/leftNav'
    import CHeader from './header/header'
    import CFooter from './footer/footer'
    import AnchorsLink from './anchors-link/anchors-link'

    export default {
        name: "views",
        data() {
            return {}
        },
        computed: {},
        components: {
            LeftNav,
            CHeader,
            CFooter,
            AnchorsLink
        },
        created() {
        },
        mounted() {

        },
        methods: {},
        watch: {
            '$route': function () {
                this.$nextTick(()=>{
                    this.$refs.viewsMainContent.$el.scrollTo(0, 0);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .views {
        height: 100%;
        overflow: hidden;
        .views-header {
            background-color: #ffffff;
            box-shadow: 0 2px 2px #e7eae5;
        }
        .views-layout {
            flex: 1;
            overflow: hidden;
            margin-top: 10px;
        }
        .views-main-content {
            background-color: #ffffff;
            overflow: auto;
            position: relative;
        }
        .view-main-content-card {
            overflow: hidden;
            padding: 8px 0 8px 16px;
        }
        .views-main-content-footer{
            margin-top: 50px;
        }
    }
</style>
