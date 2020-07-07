<template>
    <div class="cl-upload-list"
         :class="[
            listType && `cl-upload-list--${listType}`
         ]">
        <div class="cl-upload-list__item"
             v-for="(file, fileIndex) in fileList"
             :key="fileIndex">
            <img v-if="file.status !== 'uploading' && ['picture-card', 'picture'].includes(listType)"
                 class="cl-upload-list__thumbnial"
                 :src="file.url"
                 alt="">
            <span v-if="listType !== 'picture-card'"
                  class="cl-upload-list__file"
                  :class="[
                    !(listType !== 'picture-card' && (file.status === 'uploading' || file.status === 'start')) && 'cl-upload-list__hide-progress'
                  ]">
                <span class="cl-upload-list__file-name">
                    <i v-if="listType === 'text'" class="cl-icon-file"></i>
                    {{file.name}}
                </span>
                <progress v-if="listType !== 'picture-card' && (file.status === 'uploading' || file.status === 'start')"
                            :stroke-width="2"
                            :percent="parsePercentage(file.percent)"></progress>
            </span>
            <i v-if="listType !== 'picture-card'" class="cl-icon-close cl-upload-list__remove" @click="handlerRemove(file)"></i>
            <span v-if="listType === 'picture-card'" class="cl-upload-list__picture-cover">
                <span class="cl-upload-list__preview" @click="handlerPreview(file)"><i class="cl-icon-eye-open"></i></span>
                <span class="cl-upload-list__delete" @click="handlerRemove(file)"><i class="cl-icon-delete"></i></span>
            </span>
            <span v-if="listType === 'picture-card' && (file.status === 'start' || file.status === 'uploading')" class="cl-upload-list__picture-progress">
                <span class="cl-upload-list__picture-progress-inner">
                    <progress :stroke-width="5"
                                type="circle"
                                width="100%"
                                :percent="parsePercentage(file.percent)"></progress>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    import Progress from '../../progress/src/progress.vue'
  export default {
    name: "UploadList",
    props: {
      fileList: {
        type: Array,
        default: function () {
          return []
        }
      },
      listType: String,
    },
    data() {
      return {}
    },
    computed: {},
    components: {
      Progress
    },
    created() {
    },
    mounted() {
    },
    methods: {
      parsePercentage (val) {
        return parseInt(val, 10) || 0;
      },
      handlerRemove(file){
        this.$emit('remove', file)
      },
      handlerPreview(file){
        this.$emit('preview', file)
      }
    }
  }
</script>
