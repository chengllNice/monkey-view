<template>
    <div class="page-view">
        <cl-page :total="60"></cl-page>
        <h4>1 mini</h4>
        <cl-page :total="100" :page="1" showTotal size="mini"></cl-page>
        <h4>1 border</h4>
        <cl-page :total="100" :page="1" showTotal border></cl-page>
        <h4>1 background</h4>
        <cl-page :total="100" :page="1" showTotal background></cl-page>
        <h4>preText nextText</h4>
        <cl-page :total="100" :page="1" showTotal background preText="上一页" nextText="下一页"></cl-page>

        <h4>order</h4>
        <cl-page :total="100" :page="1" showTotal background order="page, pageSize, jump, total" @change="pageChange"></cl-page>

        <h4>1</h4>
        <cl-page :total="100" :page="1" showTotal></cl-page>
        <h4>2</h4>
        <cl-page :total="100" :page="2"></cl-page>
        <h4>3</h4>
        <cl-page :total="100" :page="3"></cl-page>
        <h4>4</h4>
        <cl-page :total="100" :page="4"></cl-page>
        <h4>5</h4>
        <cl-page :total="100" :page="5"></cl-page>
        <h4>6</h4>
        <cl-page :total="100" :page="6"></cl-page>
        <h4>7</h4>
        <cl-page :total="100" :page="7"></cl-page>
        <h4>8</h4>
        <cl-page :total="100" :page="8"></cl-page>
        <h4>9</h4>
        <cl-page :total="100" :page="9"></cl-page>
        <h4>10</h4>
        <cl-page :total="100" :page="10"></cl-page>
        <h4>hidenOnlySinglePage</h4>
        <cl-page :total="0" :page="10" hidenOnlySinglePage></cl-page>
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