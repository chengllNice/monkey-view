<template>
    <div class="cl-upload">
        <ClUploadList v-if="showUploadList && listType === 'picture-card'"
                      :listType="listType"
                      :fileList="uploadFiles"
                      @preview="handlerPreview"
                      @remove="handlerRemove"></ClUploadList>
        <div :class="[
                'cl-upload__target',
                listType && `cl-upload__${listType}`,
                drag && 'cl-upload__drag',
                drag && dragOver && 'cl-upload__dragOver',
            ]"
             @drop.prevent="onDrop"
             @dragover.prevent="dragOver = true"
             @dragleave.prevent="dragOver = false"
             @click="handlerClick">
            <input type="file"
                   ref="input"
                   class="cl-upload__input"
                   @change="handlerChange"
                   :name="name"
                   :multiple="multiple"
                   :accept="accept">
            <div class="cl-upload__target-slot">
                <slot></slot>
            </div>
        </div>
        <slot name="tip"></slot>
        <ClUploadList v-if="showUploadList && listType !== 'picture-card'"
                      :listType="listType"
                      :fileList="uploadFiles"
                      @preview="handlerPreview"
                      @remove="handlerRemove"></ClUploadList>
    </div>
</template>

<script>
    import ClUploadList from './upload-list.vue'
    import uploadAjax from './ajax'
  export default {
    name: "ClUpload",
    props: {
      name: {
        type: String,
        default: 'file'
      },
      action: String,
      listType: {
        type: String,
        default: 'text',
        validator(value){
          return ['text', 'picture', 'picture-card'].includes(value)
        }
      },
      fileList: {
        type: Array,
        default: function () {
          return []
        }
      },
      drag: Boolean,
      multiple: Boolean,
      accept: String,
      format: {
        type: Array,
        default: function () {
          return []
        }
      },
      showUploadList: {
        type: Boolean,
        default: true
      },
      limit: Number,
      maxSize: Number,
      disabled: Boolean,
      beforeUpload: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onChange: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onProgress: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onSuccess: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onError: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onRemove: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onPreview: {
        type: Function,
        default: function () {
          return {}
        }
      },
      onExceed: {
        type: Function,
        default: function () {
          return {}
        }
      },
      headers: Object,
      data: Object,
    },
    data() {
      return {
        uploadFiles: [],
        tempIndex: 1,
        dragOver: false,
      }
    },
    computed: {},
    components: {
      ClUploadList
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClick(){
        if(this.disabled) return;
        this.$refs.input.click();
      },
      onDrop(e){
        if(!this.drag) return;
        this.dragOver = false;
        if(this.disabled) return;
        this.uploadFile(e.dataTransfer.files);
      },
      handlerChange(ev){
        const files = ev.target.files;

        if(!files) return;

        this.uploadFile(files);
        this.$refs.input.value = null;
      },
      uploadFile(files){
        if(this.limit && (this.uploadFiles.length + files.length) > this.limit){
          this.onExceed && this.onExceed('limit', files, this.uploadFiles);
          return;
        }

        let postFiles = Array.prototype.slice.call(files);

        if(!this.multiple) postFiles = postFiles.slice(0,1);

        if(postFiles.length === 0) return;

        postFiles.forEach(file=>{
          this.upload(file);
        })
      },
      upload(file){
        if(this.maxSize){
          if(file.size > this.maxSize * 1024){
            this.onExceed && this.onExceed('size', file, this.uploadFiles);
            return;
          }
        }

        if(!this.formatFileType(file)){
          this.onExceed('type', file, this.uploadFiles);
          return;
        }

        if(!this.beforeUpload){
          return this.postFile(file);
        }

        const before = this.beforeUpload(file);
        if(before && before.then){
          before.then(processedFile=>{
            if(Object.prototype.toString.call(processedFile) === '[object File]'){
              this.postFile(processedFile)
            }else{
              this.postFile(file);
            }
          })
        }else if(before !== false){
          this.postFile(file);
        }else{
          // this.$emit('cancel', file);
        }
      },
      postFile(file){

        this.handlerStart(file);

        const option = {
          headers: this.headers,
          file: file,
          data: this.data,
          filename: this.name,
          action: this.action,
          onProgress: (e) => {
            this.handlerProgress(e, file)
          },
          onSuccess: (res) => {
            this.hanlderSuccess(res, file)
          },
          onError: (err, response) => {
            this.handlerError(err, response, file);
          }
        };

        uploadAjax(option);
      },
      handlerStart(file){
        file.uid = Date.now() + this.tempIndex++;
        const _file = {
          status: 'start',
          name: file.name,
          size: file.size,
          percent: 0,
          uid: file.uid,
          file:file,
        };
        _file.url = this.createFileUrl(_file);
        this.uploadFiles.push(_file);
        this.onChange(_file, this.uploadFiles);
      },
      handlerProgress(e, file){
        let _file = this.getFile(file);
        _file.percent = e.percent || 0;
        _file.status = 'uploading';
        this.onProgress(e, _file, this.uploadFiles);
      },
      hanlderSuccess(res, file){
        let _file = this.getFile(file);
        if(_file){
          _file.status = 'done';
          _file.response = res;
          this.onSuccess(res, _file, this.uploadFiles);
          this.onChange(_file, this.uploadFiles);
        }
      },
      handlerError(err, response, file){
        let _file = this.getFile(file);
        _file.status = 'fail';
        this.uploadFiles.splice(this.uploadFiles.indexOf(_file), 1);

        this.onError(err, _file, this.uploadFiles);
        this.onChange(_file, this.uploadFiles);
      },
      handlerRemove(file){
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1);
        this.onRemove(file, this.uploadFiles);
      },
      handlerPreview(file){
        if (file.status === 'done') {
          this.onPreview(file);
        }
      },
      getFile(file){
        let uploadList = this.uploadFiles;
        let target;
        uploadList.every(item => {
          target = file.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },
      formatFileType(file){
        if(!this.format.length) return true;
        let fileFormat = file.name.split('.').pop().toLocaleLowerCase();
        return this.format.includes(fileFormat)
      },
      createFileUrl(file){
        let url = null;
        if(this.listType === 'picture' || this.listType === 'picture-card'){
          if(!file.url && file.file){
            try {
              url = URL.createObjectURL(file.file)
            }catch (err) {
              console.error('[Element Error][Upload]', err)
            }
          }
        }
        return url;
      }
    },
    watch: {
      fileList: {
        handler(fileList){
          this.uploadFiles = fileList.map(item=>{
            item.uid = item.uid || (Date.now() + this.tempIndex++);
            item.status = item.status || 'done';
            return item;
          });
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
