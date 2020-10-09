<template>
    <Layout class="views">
        <Header class="views-header">
            <doc-header></doc-header>
        </Header>
        <Layout class="views-layout">
            <Sider class="views-sider" hide-trigger width="240">
                <left-nav></left-nav>
            </Sider>
            <Content class="views-main-content" ref="viewsMainContent">
                <div class="views-main-content-card">
                    <Row :gutter="16">
                        <Col style="padding: 16px;">
                            <router-view></router-view>
                        </Col>
                        <Col span="4">
                            <anchors-link></anchors-link>
                        </Col>
                    </Row>
                </div>
                <doc-footer></doc-footer>
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
        name: 'Views',
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
            '$route.path': function () {
                this.$nextTick(() => {
                    this.$refs.viewsMainContent.$el.scrollTo(0, 0);
                })
            }
        }
    }
</script>
