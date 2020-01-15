<template>
    <div class="loadingView">
        <h4>基础</h4>
        <cl-loading size="mini" :visible="true" />
        <cl-loading size="small" :visible="true" />
        <cl-loading size="default" :visible="true" />
        <cl-loading size="large" :visible="true" />

        <h4>基础</h4>
        <cl-loading fix :visible="false" />

        <h4>基础</h4>
        <cl-loading fullscreen :visible="false" text="loading..." />

        <cl-button @click="loadingInstance">$Loading 3s后关闭</cl-button>
        <cl-button @click="changeLoading('loading')">loading状态</cl-button>
        <div class="loading-d" v-loading:default:加载中...="loading"></div>
        <cl-button @click="changeLoading('loading')">loading状态</cl-button>
        <div class="loading-d" v-loading="loading"></div>
        <cl-button @click="changeLoading('loading1')">loading1状态</cl-button>
        <div class="loading-d" v-loading="loading1"></div>
    </div>
</template>

<script>
    export default {
        name: "LoadingView",
        data(){
            return {
                loading: false,
                loading1: false,
            }
        },
        methods: {
            changeLoading(type){
                this[type] = !this[type];
            },
            loadingInstance(){
                this.$Loading.open('加载中');
                setTimeout(()=>{
                    this.$Loading.close();
                }, 3000)
            }
        }
    }
</script>

<style lang="scss" scoped>
.loadingView{
    .loading-d{
        /*position: relative;*/
        height: 300px;
        border: 1px solid red;
    }
}
</style>