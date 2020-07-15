<template>
    <div class="ListView">
        <cl-list border header="large header" footer="footer">
            <cl-list-row>
                <cl-list-item label="label1" value="value"></cl-list-item>
                <cl-list-item label="label2" value="value"></cl-list-item>
                <cl-list-item label="label3" value="value"></cl-list-item>
            </cl-list-row>
            <cl-list-row>
                <cl-list-item label="label4" value="value"></cl-list-item>
                <cl-list-item label="label5" value="value"></cl-list-item>
                <cl-list-item label="label6" value="value"></cl-list-item>
            </cl-list-row>
            <cl-list-row>
                <cl-list-item label="label7" value="value"></cl-list-item>
                <cl-list-item label="label8" value="value"></cl-list-item>
                <cl-list-item label="label9" value="value"></cl-list-item>
            </cl-list-row>
            <cl-list-row>
                <cl-list-item label="label10" value="value">
                    <div slot="value">valuevaluevaluevaluevaluevalue</div>
                </cl-list-item>
            </cl-list-row>
        </cl-list>

        <!--<h4>size border</h4>-->
        <!--<cl-list>-->
            <!--<cl-list-item>这是一段文本1。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本2。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->
        <!--<br>-->
        <!--<cl-list size="mini" border header="mini header" footer="footer">-->
            <!--<cl-list-item>这是一段文本1。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本2。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->
        <!--<br>-->
        <!--<cl-list size="small" border header="small header" footer="footer">-->
            <!--<cl-list-item>这是一段文本1。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本2。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->
        <!--<br>-->
        <!--<cl-list border header="default header" footer="footer">-->
            <!--<cl-list-item>这是一段文本1。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本2。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->
        <!--<br>-->
        <!--<cl-list size="large" border header="large header" footer="footer">-->
            <!--<cl-list-item>这是一段文本1。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本2。</cl-list-item>-->
            <!--<cl-list-item>这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->

        <!--<br>-->
        <!--<cl-list type="meta" border header="large header" footer="footer">-->
            <!--<cl-list-item avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"-->
                          <!--title="title"-->
                          <!--description="descriptiondescription">-->
                <!--contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent-->
                <!--<div slot="extra">extra</div>-->
            <!--</cl-list-item>-->
            <!--<cl-list-item avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"-->
                          <!--title="titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle"-->
                          <!--description="descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription">-->
                <!--<div slot="extra">extra</div>-->
            <!--</cl-list-item>-->
            <!--<cl-list-item title="title" description="descriptiondescription"></cl-list-item>-->
            <!--<cl-list-item>-->
                <!--<div slot="title">title</div>-->
                <!--<div slot="description">description</div>-->
                <!--content-->
                <!--<div slot="extra">extra</div>-->
            <!--</cl-list-item>-->
            <!--<cl-list-item type="default">这是一段文本3。</cl-list-item>-->
        <!--</cl-list>-->


        <!--<cl-list type="meta" border :split="false" header="我的音乐列表">-->
            <!--<cl-list-item v-for="item in listData" :key="item.id" :title="item.title" :description="item.description">-->
                <!--<div slot="extra">-->
                    <!--<cl-button type="text" size="mini"><Icon type="heart"></Icon></cl-button>-->
                    <!--<cl-button type="text" size="mini"><Icon type="plus"></Icon></cl-button>-->
                <!--</div>-->
            <!--</cl-list-item>-->
        <!--</cl-list>-->
    </div>
</template>

<script>
    export default {
        name: "ListView",
        data() {
            return {
                listData: []
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setListData();
        },
        methods: {
            setListData(){
                setTimeout(()=>{
                    this.listData = [
                        {
                            id: '0',
                            title: '感谢你曾来过',
                            description: '周思涵/Ayo97'
                        },
                        {
                            id: '1',
                            title: '孤单心事',
                            description: '周思涵/Ayo97'
                        },
                        {
                            id: '2',
                            title: '云烟成雨',
                            description: '周思涵/Ayo97'
                        }
                    ]
                },3000)
            }
        }
    }
</script>

<style scoped>

</style>
