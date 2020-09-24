<template>
    <div class="UploadView">
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


        <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card" :file-list="fileListBase" :onPreview="handlerPreview" drag>
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


        <div class="views-dev">
            <h3>API</h3>
            <h4>upload props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>上传文件的字段名</p>
                <p><b>默认值：</b>file</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：action</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>上传的地址</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：listType</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值text/picture/picture-card。上传列表的样式</p>
                <p><b>默认值：</b>text</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：fileList</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>上传文件列表。设置fileList的格式为[{name: 'name', url: ''}]</p>
                <p><b>默认值：</b>[]</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：drag</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启拖拽上传</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：multiple</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>多选</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：accept</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>原生属性，指定文件格式</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：format</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>支持的文件格式，与accept不同的是，accept是原生属性，会在选择文件时过滤，但是不会强制限制文件格式。此选项可以和accept配合使用，也可以单独使用，限制上传文件的格式。值类型如：['jpg','png'],此时上传别的格式文件时不会执行接口请求</p>
                <p><b>默认值：</b>[]</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：showUploadList</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否显示文件列表</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：limit</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>限制上传数量</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：maxSize</b></p>
                <p><b>类型：Number</b></p>
                <p><b>说明：</b>限制上传文件的大小。默认单位KB</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用选项</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：headers</b></p>
                <p><b>类型：Object</b></p>
                <p><b>说明：</b>设置上传的请求头部</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：data</b></p>
                <p><b>类型：Object</b></p>
                <p><b>说明：</b>上传时附带的额外参数</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：beforeUpload</b></p>
                <p><b>类型：Function(file)</b></p>
                <p><b>说明：</b>上传之前的钩子函数。参数为当前上传的文件，若返回false或者Promise则停止上传</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onChange</b></p>
                <p><b>类型：Function(file, fileList)</b></p>
                <p><b>说明：</b>上传文件改变时的状态。添加文件、上传成功、上传失败都会调用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onProgress</b></p>
                <p><b>类型：Function(event, file, fileList)</b></p>
                <p><b>说明：</b>上传时的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onSuccess</b></p>
                <p><b>类型：Function(response, file, fileList)</b></p>
                <p><b>说明：</b>上传成功的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onError</b></p>
                <p><b>类型：Function(error, file, fileList)</b></p>
                <p><b>说明：</b>上传失败的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onRemove</b></p>
                <p><b>类型：Function(file, fileList)</b></p>
                <p><b>说明：</b>文件列表移出的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onPreview</b></p>
                <p><b>类型：Function(file)</b></p>
                <p><b>说明：</b>点击文件列表中已上传文件的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：onExceed</b></p>
                <p><b>类型：Function(file, fileList)</b></p>
                <p><b>说明：</b>文件超出限制时的钩子</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>upload slot</h4>

            <div class="views-dev-prop-item">
                <p><b>名称：-</b></p>
                <p><b>说明：</b>触发上传组件的控件</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：tip</b></p>
                <p><b>说明：</b>辅助提示内容</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "UploadView",
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
    computed: {},
    components: {
    },
    created() {
    },
    mounted() {
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
      },
    }
  }
</script>

<style scoped>

</style>
