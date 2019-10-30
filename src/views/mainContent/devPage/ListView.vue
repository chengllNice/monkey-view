<template>
    <div class="ListView">
        <h4>size border</h4>
        <cl-list>
            <cl-list-item>这是一段文本1。</cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>
        <br>
        <cl-list size="mini" border header="mini header" footer="footer">
            <cl-list-item>这是一段文本1。</cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>
        <br>
        <cl-list size="small" border header="small header" footer="footer">
            <cl-list-item>这是一段文本1。</cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>
        <br>
        <cl-list border header="default header" footer="footer">
            <cl-list-item>这是一段文本1。</cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>
        <br>
        <cl-list size="large" border header="large header" footer="footer">
            <cl-list-item>这是一段文本1。</cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>

        <br>
        <cl-list type="meta" border header="large header" footer="footer">
            <cl-list-item avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="title"
                          description="descriptiondescription">
                contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            </cl-list-item>
            <cl-list-item avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle" description="descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription"></cl-list-item>
            <cl-list-item title="title" description="descriptiondescription"></cl-list-item>
            <cl-list-item>这是一段文本2。</cl-list-item>
            <cl-list-item>这是一段文本3。</cl-list-item>
        </cl-list>
    </div>
</template>

<script>
    export default {
        name: "ListView",
        data() {
            return {}
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>
