<template>
    <ClLayout class="views">
        <ClHeader><CHeader></CHeader></ClHeader>
        <ClLayout class="views-layout">
            <ClSider hide-trigger>
                <LeftNav></LeftNav>
            </ClSider>
            <ClContent class="views-main-content">
                <div class="view-main-content-card">
                    <cl-row :gutter="16">
                        <cl-col style="padding: 16px;">
                            <router-view></router-view>
                        </cl-col>
                        <cl-col span="3">
                            <anchors-link></anchors-link>
                        </cl-col>
                    </cl-row>
                </div>
                <ClFooter>
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
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
    .views {
        height: 100%;
        overflow: hidden;
        .views-layout{
            flex: 1;
            overflow: hidden;
        }
        .views-main-content {
            background-color: #ffffff;
            overflow: auto;
            position: relative;
            padding: 8px 0 8px 16px;
        }
    }
</style>
