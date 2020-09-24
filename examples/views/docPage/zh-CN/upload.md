# Upload 上传

通过点击或拖拽上传文件的控件。

上传是将文件资源通过网页上传到指定服务器的过程。当需要上传一个或者多个文件你需要用到。

## 代码示例


:::demo 点击上传

点击上传，一次选择一个文件。

设置`action`属性定义上传地址。

设置`accept`属性限定选择文件类型，此属性为原生属性，只是选择文件时显示选择文件的类型，但是依然可以上传别的类型的文件。此时可以添加`format`属性限定上传文件的类型。

设置`maxSize`属性限制上传文件的大小，单位kb。

`onExceed`属性是一个方法，超出限制时触发，超出大小限制和文件类型限制和数量限制时都会触发，参数为type当前限制类型，file当前上传文件，fileList文件列表。其中`type`值为`size`(超出大小限制),`type`(超出文件类型限制),`limit`(超出文件数量限制)。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" accept=".jpg,.png" :format="['jpg', 'png']" :maxSize="500" :limit="5" :onExceed="exceedHandler">
        <Button>upload</Button>
        <div slot="tip" class="Upload__tip">只能上传jpg/png文件，大小不能超过500kb</div>
    </Upload>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        exceedHandler(type, file, fileList){
          let info = '';
          switch (type) {
            case 'limit': 
                info = '上传文件数量超出限制5个';
              break;
            case 'type': 
                info = '上传文件类型不正确，请上传jpg/png文件';
              break;
            case 'size': 
                info = '上传文件大小超过500kb，请重新上传';
              break;
          }
          this.$Message.error(info);
        }
      }
    }
</script>

```
:::


:::demo 多选

多选点击上传，一次可以选择多个文件，设置`multiple`属性实现多选上传。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" multiple>
        <Button>upload</Button>
        <div slot="tip" class="Upload__tip">可以一次选择多个文件上传</div>
    </Upload>
</template>
```
:::


:::demo 手动上传

绑定`before-upload`并返回`false`，阻止默认的上传流程，可以自己手动控制上传。绑定`fileList`手动控制上传列表。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" 
    :file-list="fileList" :before-upload="beforeUploadHandler">
        <Button>select file</Button>
    </Upload>
    <Button type="primary" :disabled="!fileList.length" :loading="loading" @click="clickHandler">click upload file</Button>
</template>
<script>
    export default {
      data(){
        return {
          fileList: [],
          loading: false,
        }
      },
      methods: {
        beforeUploadHandler(file){
          console.log(file,'file')
          this.fileList.push(file);
          return false;
        },
        clickHandler(){
          this.loading = true;
          setTimeout(()=>{
            this.fileList = [];
            this.loading = false;
            this.$Message.success('上传成功')
          }, 2000)
        }
      }
    }
</script>

```
:::


:::demo 拖拽上传

设置`drag`属性实现拖拽上传。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" drag>
        <Icon type="cloud-upload" style="color: #2d8cf0;"></Icon>
        <div class="doc-upload-title">drag upload file</div>
    </Upload>
</template>
```
:::


:::demo 照片墙

设置`listType=picture-card`实现照片墙展示上传列表。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" 
    drag 
    listType="picture-card" 
    :file-list="fileListPictureCard" 
    :onPreview="handlerPreview" 
    :onRemove="handlerRemove" 
    :onSuccess="handlerSuccess">
        <Icon type="plus"></Icon>
        <div>上传文件</div>
    </Upload>
    <Modal v-model="modalVisible" footer-hide>
        <img :src="modalFile.url" width="100%" alt="" />
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          fileListPictureCard: [
            {
              name: 'XXX1.jpg',
              url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=655054976,1593018610&fm=26&gp=0.jpg'
            },
            {
              name: 'XXX2.jpg',
              url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496520483,2043298183&fm=26&gp=0.jpg'
            }
          ],
          modalFile: {},
          modalVisible: false,
        }
      },
      methods: {
        handlerPreview(file) {
            this.modalFile = file;
            this.modalVisible = true;
        },
        handlerRemove(file, fileList){
          this.fileListPictureCard = fileList;
          this.$Message.info('删除成功');
        },
        handlerSuccess(res, file, fileList){
          this.fileListPictureCard.push(file);
        }
      }
    }
</script>

```
:::


:::demo 图标列表

设置`listType=picture`实现照片墙展示上传列表。

```html
<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" 
    listType="picture" 
    :file-list="fileListPicture" 
    :onRemove="handlerRemove" 
    :onSuccess="handlerSuccess">
        <Button>upload</Button>
    </Upload>
</template>
<script>
    export default {
      data(){
        return {
          fileListPicture: [
            {
              name: 'XXX1.jpg',
              url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=655054976,1593018610&fm=26&gp=0.jpg'
            },
            {
              name: 'XXX2.jpg',
              url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496520483,2043298183&fm=26&gp=0.jpg'
            }
          ],
        }
      },
      methods: {
        handlerRemove(file, fileList){
          this.fileListPicture = fileList;
          this.$Message.info('删除成功');
        },
        handlerSuccess(res, file, fileList){
          this.fileListPicture.push(file);
        }
      }
    }
</script>

```
:::


## API

### Upload props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 上传文件的字段名 | file |
| action | String | 上传的地址 | - |
| listType | String | 可选值`text` `picture` `picture-card`。上传列表的样式 | text |
| fileList | Array | 自己控制上传文件列表。设置fileList的格式为`[{name: 'name', url: ''}]` | [] |
| drag | Boolean | 开启拖拽上传 | - |
| multiple | Boolean | 多选 | - |
| accept | String | 原生属性，指定选择文件格式，详见 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept" target="_blank">文件类型</a> | - |
| format | Array | 支持的文件格式，与accept不同的是，accept是原生属性，会在选择文件时过滤，但是不会强制限制文件格式。此选项可以和accept配合使用，也可以单独使用，限制上传文件的格式。值类型如：`['jpg','png']`,此时上传别的格式文件时不会执行接口请求 | []] |
| showUploadList | Boolean | 是否显示文件列表 | true |
| limit | Number | 限制上传数量 | - |
| maxSize | Number | 限制上传文件的大小。默认单位KB | - |
| disabled | Boolean | 禁用选项 | - |
| headers | Object | 设置上传的请求头部 | - |
| data | Object | 上传时附带的额外参数 | - |
| beforeUpload | Function(file) | 上传之前的钩子函数。参数为当前上传的文件，若返回false或者Promise则停止上传 | - |
| onChange | Function(file, fileList) | 上传文件改变时的状态。添加文件、上传成功、上传失败都会调用 | - |
| onProgress | Function(event, file, fileList) | 上传时的钩子 | - |
| onSuccess | Function(response, file, fileList) | 上传成功的钩子 | - |
| onError | Function(error, file, fileList) | 上传失败的钩子 | - |
| onRemove | Function(file, fileList) | 文件列表移出的钩子 | - |
| onPreview | Function(file) | 点击文件列表中已上传文件的钩子 | - |
| onExceed | Function(type, file, fileList) | 文件超出限制时的钩子,`type`值为`limit`(超出文件数量限制) `size`(超出文件大小限制) `type`(超出文件类型限制) | - |




### Upload slot

| 名称 | 说明 |
| ---- | ---- |
| - | 触发上传组件的控件 |
| tip | 辅助提示内容 |

