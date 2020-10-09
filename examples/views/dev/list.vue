<template>
    <div class="dev-list">
        <List border header="large header" footer="footer">
            <ListRow>
                <ListItem label="label1" value="value"></ListItem>
                <ListItem label="label2" value="value"></ListItem>
                <ListItem label="label3" value="value"></ListItem>
            </ListRow>
            <ListRow>
                <ListItem label="label4" value="value"></ListItem>
                <ListItem label="label5" value="value"></ListItem>
                <ListItem label="label6" value="value"></ListItem>
            </ListRow>
            <ListRow>
                <ListItem label="label7" value="value"></ListItem>
                <ListItem label="label8" value="value"></ListItem>
                <ListItem label="label9" value="value"></ListItem>
            </ListRow>
            <ListRow>
                <ListItem label="label10" value="value">
                    <div slot="value">valuevaluevaluevaluevaluevalue</div>
                </ListItem>
            </ListRow>
        </List>

        <h4>size border</h4>
        <List>
            <ListItem>这是一段文本1。</ListItem>
            <ListItem>这是一段文本2。</ListItem>
            <ListItem>这是一段文本3。</ListItem>
        </List>
        <br>
        <List size="mini" border header="mini header" footer="footer">
            <ListItem>这是一段文本1。</ListItem>
            <ListItem>这是一段文本2。</ListItem>
            <ListItem>这是一段文本3。</ListItem>
        </List>
        <br>
        <List size="small" border header="small header" footer="footer">
            <ListItem>这是一段文本1。</ListItem>
            <ListItem>这是一段文本2。</ListItem>
            <ListItem>这是一段文本3。</ListItem>
        </List>
        <br>
        <List border header="default header" footer="footer">
            <ListItem>这是一段文本1。</ListItem>
            <ListItem>这是一段文本2。</ListItem>
            <ListItem>这是一段文本3。</ListItem>
        </List>
        <br>
        <List size="large" border header="large header" footer="footer">
            <ListItem>这是一段文本1。</ListItem>
            <ListItem>这是一段文本2。</ListItem>
            <ListItem>这是一段文本3。</ListItem>
        </List>

        <br>
        <List type="meta" border header="large header" footer="footer">
            <ListItem
                    avatar="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601062942615&di=1de480ec88bf4f5264bdf437bea79175&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F16%2F20150916235818_HVAk2.jpeg"
                    title="title"
                    description="descriptiondescription">
                contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
                <div slot="extra">extra</div>
            </ListItem>
            <ListItem
                    avatar="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601062942615&di=1de480ec88bf4f5264bdf437bea79175&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F16%2F20150916235818_HVAk2.jpeg"
                    title="titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle"
                    description="descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription">
                <div slot="extra">extra</div>
            </ListItem>
            <ListItem title="title" description="descriptiondescription"></ListItem>
            <ListItem>
                <div slot="title">title</div>
                <div slot="description">description</div>
                content
                <div slot="extra">extra</div>
            </ListItem>
            <ListItem type="default">这是一段文本3。</ListItem>
        </List>

        <List type="meta" border :split="false" header="我的音乐列表">
            <ListItem v-for="item in listData" :key="item.id" :title="item.title" :description="item.description">
                <div slot="extra">
                    <Button type="text" size="mini">
                        <Icon type="heart"></Icon>
                    </Button>
                    <Button type="text" size="mini">
                        <Icon type="plus"></Icon>
                    </Button>
                </div>
            </ListItem>
        </List>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listData: []
            }
        },
        mounted() {
            this.setListData();
        },
        methods: {
            setListData() {
                setTimeout(() => {
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
                }, 3000)
            }
        }
    }
</script>
