<template>
    <div class="dev-card">
        <Card title="header">
            Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.
            <a href="javascript:void(0);" slot="extra">extra</a>
        </Card>

        <p>禁用鼠标悬停</p>
        <Card no-hover title="header">
            Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.
            <a href="javascript:void(0);" slot="extra">extra</a>
        </Card>

        <p>noBorder</p>
        <Card no-border title="header">
            Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.Content of no border type. Content of no border type. Content of no border type. Content of no border
            type.
            <a href="javascript:void(0);" slot="extra">extra</a>
        </Card>


        <p>bodyPadding及footer</p>
        <Card bodyPadding="0">
            <img class="dev-card-avatar"
                 src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3623139363,2281616215&fm=26&gp=0.jpg"
                 alt="">
            <div class="dev-card-content">
                <h3>动漫</h3>
                Content of no border type. Content of no border type. Content of no border type. Content of no border
                type.Content of no border type. Content of no border type. Content of no border type. Content of no
                border type.Content of no border type. Content of no border type. Content of no border type. Content of
                no border type.
            </div>

            <div class="dev-card-footer" slot="footer">
                <Icon type="list"></Icon>
                <Icon type="setting"></Icon>
                <Icon type="thumbs"></Icon>
            </div>
        </Card>
    </div>
</template>

<style lang="scss" scoped>
    .dev-card {
        .dev-card-avatar {
            width: 100%;
        }

        .dev-card-content {
            padding: 16px;
        }

        .dev-card-footer {
            display: flex;
            justify-content: space-between;

            & > * {
                flex: 1;
                font-size: 20px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: #2d8cf0;
                }
            }
        }
    }
</style>
