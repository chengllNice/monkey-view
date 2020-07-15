<template>
    <div class="CardView">
        <ClCard title="headerheaderheaderheaderheaderheaderheaderheaderheaderheader">
            Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.
            <a href="#" slot="extra">extra</a>
        </ClCard>

        <p>禁用鼠标悬停</p>
        <ClCard noHover title="headerheaderheaderheaderheaderheaderheaderheaderheaderheader">
            Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.
            <a href="#" slot="extra">extra</a>
        </ClCard>

        <p>noBorder</p>
        <ClCard noBorder title="headerheaderheaderheaderheaderheaderheaderheaderheaderheader">
            Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.
            <a href="#" slot="extra">extra</a>
        </ClCard>


        <p>bodyPadding及footer</p>
        <ClCard bodyPadding="0">
            <img class="avatar" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3623139363,2281616215&fm=26&gp=0.jpg" alt="">
            <div class="content">
                <h3>动漫</h3>
                Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.
            </div>

            <div class="footer" slot="footer">
                <Icon type="list"></Icon>
                <Icon type="setting"></Icon>
                <Icon type="thumbs"></Icon>
            </div>
        </ClCard>
    </div>
</template>

<script>
  export default {
    name: "CardView",
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

<style lang="scss" scoped>
.CardView{
    .avatar{
        width: 100%;
    }
    .content{
        padding: 16px;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        &>*{
            flex: 1;
            font-size: 20px;
            text-align: center;
            cursor: pointer;
            &:hover{
                color: #2d8cf0;
            }
        }
    }
}
</style>
