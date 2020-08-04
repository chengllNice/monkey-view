<template>
    <div class="doc-icon-list">
        <div class="doc-icon-search">
            <Input v-model="search" placeholder="请输入关键词搜索图标，例如：success" @change="handleSearch"/>
            <p>图标数量：{{list.length}}，点击下面的图标复制代码</p>
        </div>

        <Row>
            <Col class="doc-icon-col" v-for="(item, index) in list" :key="index" :span="4" @click.native="copyIconCode(item)">
                <Icon :type="item" size="36"></Icon>
                <p>{{item}}</p>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "icon-list",
        data() {
            return {
                commonPrefix: 'cl-icon',
                search: '',
                allList: [
                    'plus',
                    'minus',
                    'close',
                    'remove',
                    'remove-fill',
                    'circle-plus',
                    'circle-plus-fill',
                    'square-remove',
                    'square-remove-fill',
                    'square-plus',
                    'square-plus-fill',
                    'square',

                    'success',
                    'success-fill',
                    'info',
                    'info-fill',
                    'warning',
                    'warning-fill',
                    'question',
                    'question-fill',



                    'form',
                    'radio',
                    'checkbox',
                    'checkbox-fill',
                    'download',
                    'upload',
                    'cloud-upload',
                    'cloud-upload-fill',
                    'date',
                    'switch',
                    'time',


                    'collapse',
                    'affix',
                    'delete',
                    'button',
                    'card',
                    'camera',
                    'camera-fill',
                    'attachment',
                    'back',


                    'down',
                    'up',
                    'left',
                    'right',
                    'd-left',
                    'd-right',
                    'd-up',
                    'd-down',
                    'd-bottom-left',
                    'd-bottom-right',
                    'd-top-left',
                    'd-top-right',
                    'arrow-down',
                    'arrow-up',
                    'arrow-left',
                    'arrow-right',
                    'care-left',
                    'care-right',
                    'care-down',
                    'care-up',


                    'check',
                    'error',
                    'error-fill',
                    'file',
                    'file-copy',
                    'file-unknown',
                    'file-text',
                    'folder',
                    'folder-open',
                    'folder-fill',


                    'eye-open',
                    'eye-close',
                    'filter',
                    'grid',
                    'home',
                    'home-fill',
                    'heart',
                    'heart-fill',
                    'list',
                    'list-dot',
                    'loading',
                    'full',
                    'pack',
                    'label',
                    'label-fill',
                    'echarts-line',
                    'echarts-bar',
                    'echarts-pie',
                    'loginout',
                    'edit',
                    'edit-outline',
                    'email',
                    'email-open',
                    'email-fill',
                    'search',
                    'setting',
                    'setting-fill',
                    'send',
                    'share',
                    'share-fill',
                    'sort',
                    'sort-up',
                    'sort-down',
                    'sound',

                    'star',
                    'star-fill',
                    'modal',
                    'more',
                    'more-v',
                    'notification',
                    'notification-fill',
                    'notification-off',
                    'notification-off-fill',
                    'page',
                    'password',
                    'picture',
                    'picture-fill',

                    'popover',
                    'tooltip',
                    'look-up',
                    'refresh',
                    'relation',
                    'user',
                    'user-fill',

                    'tab',

                    'table',
                    'undo',
                    'pause',
                    'video',
                    'video-fill',
                    'code-open',
                    'code-close',
                    'hot',
                    'hot-fill',

                    'weibo',
                    'qq',
                    'wechat',
                ],
                list: []
            }
        },
        mounted() {
            this.handleSearch();
        },
        methods: {
            handleSearch() {
                if (this.search) {
                    this.list = this.allList.filter(item => {
                        return item.includes(this.search)
                    })
                } else {
                    this.list = this.allList;
                }
            },
            copyIconCode(item) {
                console.log(item,'===')
                let self = this;
                let codeText = `<Icon type="${item}" />`;
                this.$copyText(codeText).then(function () {
                    self.$Message.success('copy success')
                }, function () {
                    self.$Message.error('copy fail')
                })
            },
        }
    }
</script>

<style scoped>

</style>