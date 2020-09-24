<template>
    <Layout class="views">
        <Header class="views-header">
            <doc-header></doc-header>
        </Header>
        <Layout class="views-layout">
            <Sider hide-trigger width="240">
                <LeftNav></LeftNav>
            </Sider>
            <Content class="views-main-content" ref="viewsMainContent">
                <div class="views-main-content-card">
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
                    <doc-footer></doc-footer>
                </Footer>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import LeftNav from '../components/left-nav'
    import DocHeader from '../components/doc-header'
    import DocFooter from '../components/doc-footer'
    import AnchorsLink from '../components/anchors-link'

    export default {
        name: "Views",
        data() {
            return {}
        },
        components: {
            LeftNav,
            DocHeader,
            DocFooter,
            AnchorsLink
        },
        watch: {
            '$route': function () {
                this.$nextTick(()=>{
                    this.$refs.viewsMainContent.$el.scrollTo(0, 0);
                })
            }
        }
    }
</script>
