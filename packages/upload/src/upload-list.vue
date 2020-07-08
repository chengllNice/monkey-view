<template>
    <div :class="[
             `${classPrefix}`,
             listType && `${classPrefix}--${listType}`
         ]">
        <div :class="[`${classPrefix}__item`]"
             v-for="(file, fileIndex) in fileList"
             :key="fileIndex">
            <img v-if="file.status !== 'uploading' && ['picture-card', 'picture'].includes(listType)"
                 :class="[`${classPrefix}__thumbnial`]"
                 :src="file.url"
                 alt="">
            <span v-if="listType !== 'picture-card'"
                  :class="[
                      `${classPrefix}__file`,
                      !(listType !== 'picture-card' && (file.status === 'uploading' || file.status === 'start')) && `${classPrefix}__hide-progress`
                  ]">
                <span :class="[`${classPrefix}__file-name`]">
                    <Icon v-if="listType === 'text'" type="icon-file"></Icon>
                    {{file.name}}
                </span>
                <Progress v-if="listType !== 'picture-card' && (file.status === 'uploading' || file.status === 'start')"
                          :stroke-width="2"
                          :percent="parsePercentage(file.percent)"></Progress>
            </span>
            <Icon v-if="listType !== 'picture-card'"
                  type="icon-close"
                  :class="[`${classPrefix}__remove`]"
                  @click="handlerRemove(file)"></Icon>
            <span v-if="listType === 'picture-card'" :class="[`${classPrefix}__picture-cover`]">
                <span :class="[`${classPrefix}__preview`]"
                      @click="handlerPreview(file)">
                    <Icon type="icon-eye-open"></Icon>
                </span>
                <span :class="[`${classPrefix}__delete`]" @click="handlerRemove(file)">
                    <Icon type="icon-delete"></Icon>
                </span>
            </span>
            <span v-if="listType === 'picture-card' && (file.status === 'start' || file.status === 'uploading')"
                  :class="[`${classPrefix}__picture-progress`]">
                <span :class="[`${classPrefix}__picture-progress-inner`]">
                    <Progress :stroke-width="5"
                              type="circle"
                              width="100%"
                              :percent="parsePercentage(file.percent)"></Progress>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Progress from 'packages/progress'
    import Icon from 'packages/icon'

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
            return {
                classPrefix: Config.classPrefix + '-upload-list',
            }
        },
        computed: {},
        components: {
            Progress,
            Icon
        },
        created() {
        },
        mounted() {
        },
        methods: {
            parsePercentage(val) {
                return parseInt(val, 10) || 0;
            },
            handlerRemove(file) {
                this.$emit('remove', file)
            },
            handlerPreview(file) {
                this.$emit('preview', file)
            }
        }
    }
</script>
