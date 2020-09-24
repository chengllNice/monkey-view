<template>
    <div class="loadingView">
        <h4>基础</h4>
        <Loading size="mini" :visible="true" />
        <Loading size="small" :visible="true" />
        <Loading size="default" :visible="true" />
        <Loading size="large" :visible="true" />

        <h4>基础</h4>
        <Loading fix :visible="false" />

        <h4>基础</h4>
        <Loading fullscreen :visible="false" text="loading..." />

        <Button @click="loadingInstance">$Loading 3s后关闭</Button>
        <Button @click="changeLoading('loading')">loading状态</Button>
        <div class="loading-d" v-loading:default:加载中...="loading"></div>
        <Button @click="changeLoading('loading')">loading状态</Button>
        <div class="loading-d" v-loading="loading"></div>
        <Button @click="changeLoading('loading1')">loading1状态</Button>
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