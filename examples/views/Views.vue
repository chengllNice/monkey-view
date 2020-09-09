<template>
    <Layout class="views">
        <Header class="views-header">
            <CHeader></CHeader>
        </Header>
        <Layout class="views-layout">
            <Sider hide-trigger width="240">
                <LeftNav></LeftNav>
            </Sider>
            <Content class="views-main-content" ref="viewsMainContent">
                <div class="view-main-content-card">
                    <Row :gutter="16">
                        <Col style="padding: 16px;">
<!--                            <keep-alive>-->
<!--                                -->
<!--                            </keep-alive>-->
                            <router-view></router-view>
                        </Col>
                        <Col span="3">
                            <anchors-link></anchors-link>
                        </Col>
                    </Row>
                </div>
                <Footer class="views-main-content-footer">
                    <CFooter></CFooter>
                </Footer>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import LeftNav from '../components/left-nav'
    import CHeader from '../components/header'
    import CFooter from '../components/footer'
    import AnchorsLink from '../components/anchors-link'

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
