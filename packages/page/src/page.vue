<template>
    <div v-if="!(hidenOnlySinglePage && allPage <= 1)"
         :class="[
            `${classPrefix}`,
            typeof background === 'boolean' && background && `${classPrefix}--background`,
            typeof border === 'boolean' && border && `${classPrefix}--border`,
            size === 'mini' && `${classPrefix}--mini`,
        ]">
        <div :style="{order: orderList('total')}"
             v-if="orderList('total') > -1"
             :class="[
                 `${classPrefix}__common`,
                  `${classPrefix}__total`
             ]">
            {{localeTotalText.replace('{total}', total)}}
        </div>

        <div :class="[`${classPrefix}__content`]" :style="{order: orderList('page')}">
            <div :class="[
                    `${classPrefix}__common`,
                    `${classPrefix}__item`,
                    `${classPrefix}__pre`,
                    currentPage === 1 && `${classPrefix}__item-disabled`
                 ]"
                 @click.stop="changePage(currentPage - 1)">
                <template v-if="preText">{{preText}}</template>
                <Icon v-else type="icon-left"></Icon>
            </div>

            <div :class="[
                     `${classPrefix}__common`,
                     `${classPrefix}__item`,
                     `${classPrefix}__item-first`,
                     currentPage === 1 && `${classPrefix}__item-active`
                 ]"
                 @click.stop="changePage(1)">1
            </div>

            <div :class="[
                     `${classPrefix}__common`,
                     `${classPrefix}__item`,
                     `${classPrefix}__item-jump-pre`,
                 ]"
                 v-if="pageItemPreShow"
                 @mouseenter="jumpMouseEnter('pre')"
                 @mouseleave="jumpMouseLeave('pre')"
                 @click.stop="jumpPage('pre')">
                <Icon :type="jumpPreIcon"></Icon>
            </div>

            <template v-for="item in allPage">
                <div :class="[
                         `${classPrefix}__common`,
                         `${classPrefix}__item`,
                         currentPage === item && `${classPrefix}__item-active`
                     ]"
                     v-if="pageShow(item)"
                     :key="item" @click.stop="changePage(item)">{{item}}
                </div>
            </template>

            <div :class="[
                     `${classPrefix}__common`,
                     `${classPrefix}__item`,
                     `${classPrefix}__item-jump-next`,
                 ]"
                 v-if="pageItemNextShow"
                 @mouseenter="jumpMouseEnter('next')"
                 @mouseleave="jumpMouseLeave('next')"
                 @click.stop="jumpPage('next')">
                <Icon :type="jumpNextIcon"></Icon>
            </div>

            <div :class="[
                     `${classPrefix}__common`,
                     `${classPrefix}__item`,
                     `${classPrefix}__item-final`,
                     currentPage === allPage && `${classPrefix}__item-active`
                 ]"
                 v-if="allPage > 1"
                 @click.stop="changePage(allPage)">{{allPage}}
            </div>

            <div :class="[
                     `${classPrefix}__common`,
                     `${classPrefix}__item`,
                     `${classPrefix}__next`,
                     currentPage === allPage && `${classPrefix}__item-disabled`
                 ]"
                 @click.stop="changePage(currentPage + 1)">
                <template v-if="nextText">{{nextText}}</template>
                <Icon v-else type="icon-right"></Icon>
            </div>
        </div>

        <div :class="[
                 `${classPrefix}__common`,
                 `${classPrefix}__page-size`,
             ]"
             :style="{order: orderList('pageSize')}"
             v-if="orderList('pageSize') > -1">
            <sn-select :class="[`${classPrefix}__page-size-select`]" v-model="currentPageSize" :size="size"
                       @change="pageSizeChange">
                <sn-option v-for="item in currentPageSizeOption"
                           :key="item.value"
                           :value="item.value"
                           :label="item.label"></sn-option>
            </sn-select>
        </div>

        <div :class="[
                `${classPrefix}__common`,
                 `${classPrefix}__jump-to`
             ]"
             :style="{order: orderList('jump')}"
             v-if="orderList('jump') > -1">
                {{t('cl.page.goto')}}
                <sn-input :class="[`${classPrefix}__jump-to-input`]"
                          type="number"
                          v-model="jumpToPage"
                          :step="false"
                          :size="size"
                          @enter="jumpToPageChange"/>
                {{t('cl.page.page')}}
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Locale from 'main/mixins/locale'
    import Input from 'packages/input'
    import Select from 'packages/select'
    import Option from 'packages/option'
    import Icon from 'packages/icon'

    export default {
        name: "Page",
        mixins: [Locale],
        props: {
            page: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeOption: {
                type: Array,
                default() {
                    return [10, 20, 30, 40]
                }
            },//pageSize切换配置
            maxPage: {
                type: Number,
                default: 5,
                validator(value) {
                    return value >= 5;
                }
            },
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['default', 'mini'].includes(value)
                }
            },
            background: Boolean,//是否为分页添加背景
            border: Boolean,//是否为分页添加边框
            hidenOnlySinglePage: Boolean,//当只有一页时是否隐藏
            preText: String,
            nextText: String,
            order: {
                type: String,
                default: ''
            },//排序及显示
            totalText: {
                type: String,
                default: ''
            },//定义总数量显示方式
            pageSizeText: {
                type: String,
                default: ''
            },//定义pageSize选项的显示方式
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-page',
                currentPage: this.page,
                currentPageSize: this.pageSize,
                jumpToPage: this.page,
                currentPageSizeOption: [],
                currentSelectPageSize: '',
                jumpPreIcon: 'icon-more',
                jumpNextIcon: 'icon-more',
            }
        },
        computed: {
            allPage() {
                return Math.ceil(this.total / this.currentPageSize);
            },
            // page前后多少项展示
            pagePreNextItemLenSHow() {
                return (this.maxPage - 3) / 2;//3为 第一页 最后一页和当前页
            },
            pageItemPreShow() {
                return this.allPage > this.maxPage && this.currentPage >= this.maxPage - this.pagePreNextItemLenSHow
            },
            pageItemNextShow() {
                return this.allPage > this.maxPage && (this.allPage - this.currentPage > this.pagePreNextItemLenSHow + 1)
            },
            pageShow() {
                return function (pageItem) {
                    if (pageItem === 1 || pageItem === this.allPage) {
                        return false;
                    } else if (
                        this.allPage <= this.maxPage ||
                        Math.abs(this.currentPage - pageItem) <= this.pagePreNextItemLenSHow ||
                        (!this.pageItemPreShow && pageItem < this.maxPage) ||
                        (!this.pageItemNextShow && this.allPage - pageItem < this.maxPage - this.pagePreNextItemLenSHow)) {
                        return true
                    }
                }
            },
            orderList() {
                return function (type) {
                    return this.order.split(',').findIndex(item => {
                        return item.trim() === type
                    });
                }
            },
            localeTotalText() {
                if (!this.totalText) {
                    return this.t('cl.page.total') + ' {total} ' + this.t('cl.page.item');
                } else {
                    return this.totalText
                }
            },
            localePageSizeText() {
                if (!this.pageSizeText) {
                    return '{pageSize} ' + this.t('cl.page.item') + '/' + this.t('cl.page.page');
                } else {
                    return this.pageSizeText
                }
            }
        },
        components: {
            'sn-input': Input,
            'sn-select': Select,
            'sn-option': Option,
            Icon
        },
        created() {
        },
        mounted() {
        },
        methods: {
            changePage(page) {
                if (page <= 1) {
                    page = 1
                }
                if (page >= this.allPage) {
                    page = this.allPage
                }
                if (page === this.currentPage) {
                    return;
                }
                this.currentPage = page;
                this.jumpToPage = parseInt(page);
                this.$emit('change', page, this.currentPageSize);
            },
            pageSizeChange() {
                if (this.allPage < this.currentPage) {
                    this.changePage(this.allPage);
                }
            },
            jumpPage(type) {
                if (type === 'pre') {
                    this.changePage(this.currentPage - this.maxPage);
                } else if (type === 'next') {
                    this.changePage(this.currentPage + this.maxPage);
                }
            },
            jumpToPageChange(value) {
                this.changePage(value);
            },
            jumpMouseEnter(type) {
                if (type === 'pre') {
                    this.jumpPreIcon = 'icon-arrow-left';
                } else if (type === 'next') {
                    this.jumpNextIcon = 'icon-arrow-right';
                }
            },
            jumpMouseLeave(type) {
                if (type === 'pre') {
                    this.jumpPreIcon = 'icon-more';
                } else if (type === 'next') {
                    this.jumpNextIcon = 'icon-more';
                }
            },
            setPageSizeOption() {
                this.pageSizeOption.forEach(item => {
                    this.currentPageSizeOption.push({
                        label: this.localePageSizeText.replace('{pageSize}', item),
                        value: item
                    })
                })
            }
        },
        watch: {
            page(newVal) {
                this.currentPage = newVal;
                this.jumpToPage = parseInt(newVal);
            },
            pageSize(newVal) {
                this.currentPageSize = newVal;
            },
            pageSizeOption: {
                handler() {
                    this.setPageSizeOption();
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
