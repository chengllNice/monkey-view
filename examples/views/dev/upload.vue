<template>
    <div class="dev-upload">
        <Upload action="//jsonplaceholder.typicode.com/posts/" :file-list="fileListBase">
            <Button>upload</Button>
        </Upload>

        <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture" :file-list="fileListBase">
            <Button>upload</Button>
        </Upload>

        <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card"
                :file-list="fileListBase" :onPreview="handlerPreview" :onSuccess="handlerSuccess">
            <Icon type="plus"></Icon>
            <div>上传文件</div>
        </Upload>

        <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card" :file-list="fileListBase"
                :onPreview="handlerPreview" drag>
            <Icon type="plus"></Icon>
            <div>拖拽上传</div>
        </Upload>

        <p>accpect</p>
        <Upload action="//jsonplaceholder.typicode.com/posts/"
                accept=".png"
                :format="['png']"
                :file-list="fileListBase"
                :onError="handlerError"
                :onExceed="handlerExceed"
                :onProgress="handlerProgress"
                :onSuccess="handlerSuccess"
                :onChange="handlerChange"
                :beforeUpload="handlerBeforeUpload"
                :onRemove="handlerRemove">
            <Button>upload</Button>
        </Upload>

        <Modal v-model="modalVisible" footer-hide>
            <img :src="modalFile.url" width="100%" alt="">
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modalVisible: false,
                modalFile: {},
                fileListBase: [
                    {
                        name: '测试文件上传1.png',
                        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2300160417,2710453054&fm=111&gp=0.jpg'
                    },
                    {
                        name: 'cesihaindhisdiandjaidiuadjiandandanjndjsandkjnaknda.jpg',
                        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3796581224,2787909871&fm=111&gp=0.jpg'
                    },
                    {
                        name: '测试文件上传2.gif',
                        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4168008361,363981833&fm=111&gp=0.jpg'
                    }
                ]
            }
        },
        methods: {
            handlerPreview(file) {
                this.modalFile = file;
                this.modalVisible = true;
            },
            handlerError(err, response, file) {
                console.log(err, response, file, 'handlerError')
            },
            handlerExceed(file, fileList) {
                console.log(file, JSON.parse(JSON.stringify(fileList)), 'handlerExceed')
            },
            handlerRemove(file, fileList) {
                console.log(file, JSON.parse(JSON.stringify(fileList)), 'handlerRemove')
            },
            handlerProgress(e, file, fileList) {
                console.log(e, file, JSON.parse(JSON.stringify(fileList)), 'handlerProgress')
            },
            handlerSuccess(res, file, fileList) {
                console.log(res, file, JSON.parse(JSON.stringify(fileList)), 'handlerSuccess');
                // this.fileListBase.push({
                //   name: res.name,
                //   url: res.url
                // });
            },
            handlerChange(file, fileList) {
                console.log(file, JSON.parse(JSON.stringify(fileList)), 'handlerChange')
            },
            handlerBeforeUpload(file) {
                console.log(file, 'handlerBeforeUpload');
                return true;
            }
        }
    }
</script>
