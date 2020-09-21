<template>
    <div class="page-view">
        <Page :total="60"></Page>
        <h4>1 mini</h4>
        <Page :total="100" :page="1" showTotal size="mini"></Page>
        <h4>1 border</h4>
        <Page :total="10000" :page="1" showTotal border></Page>
        <h4>1 background</h4>
        <Page :total="100" :page="1" showTotal background></Page>
        <h4>preText nextText</h4>
        <Page :total="100" :page="1" showTotal background preText="上一页" nextText="下一页"></Page>

        <h4>order</h4>
        <Page :total="100" :page="1" showTotal background order="page, pageSize, jump, total" @change="pageChange"></Page>

        <h4>1</h4>
        <Page :total="100" :page="1" showTotal></Page>
        <h4>2</h4>
        <Page :total="100" :page="2"></Page>
        <h4>3</h4>
        <Page :total="100" :page="3"></Page>
        <h4>4</h4>
        <Page :total="100" :page="4"></Page>
        <h4>5</h4>
        <Page :total="100" :page="5"></Page>
        <h4>6</h4>
        <Page :total="100" :page="6"></Page>
        <h4>7</h4>
        <Page :total="100" :page="7"></Page>
        <h4>8</h4>
        <Page :total="100" :page="8"></Page>
        <h4>9</h4>
        <Page :total="100" :page="9"></Page>
        <h4>10</h4>
        <Page :total="100" :page="10"></Page>
        <h4>hidenOnlySinglePage</h4>
        <Page :total="0" :page="10" hidenOnlySinglePage></Page>
    </div>
</template>

<script>
    export default {
        name: "PageView",
        data(){
            return {

            }
        },
        methods: {
            pageChange(page, pageSize){
                console.log(page, pageSize)
            }
        }
    }
</script>

<style scoped>

</style>