<template>
    <div v-if="!(hidenOnlySinglePage && allPage <= 1)"
         :class="[
        'cl-page',
        typeof background === 'boolean' && background && 'cl-page--background',
        typeof border === 'boolean' && border && 'cl-page--border',
        size === 'mini' && 'cl-page--mini',
    ]">
        <div class="cl-page__common cl-page__total" :style="{order: orderList('total')}" v-if="orderList('total') > -1">{{totalText.replace('total', total)}}</div>

        <div class="cl-page__content" :style="{order: orderList('page')}">
            <div class="cl-page__common cl-page__item cl-page__pre"
                 :class="[currentPage === 1 && 'cl-page__item-disabled']"
                 @click.stop="changePage(currentPage - 1)">
                <template v-if="preText">{{preText}}</template><i v-else class="cl-icon-left"></i>
            </div>

            <div class="cl-page__common cl-page__item cl-page__item-first"
                 :class="[currentPage === 1 && 'cl-page__item-active']"
                 @click.stop="changePage(1)">1
            </div>

            <div class="cl-page__common cl-page__item cl-page__item-jump-pre"
                 v-if="pageItemPreShow"
                 @mouseenter="jumpMouseEnter('pre')"
                 @mouseleave="jumpMouseLeave('pre')"
                 @click.stop="jumpPage('pre')">
                <i :class="jumpPreIcon"></i>
            </div>

            <template v-for="item in allPage">
                <div class="cl-page__common cl-page__item"
                     :class="[currentPage === item && 'cl-page__item-active']"
                     v-if="pageShow(item)"
                     :key="item" @click.stop="changePage(item)">{{item}}
                </div>
            </template>

            <div class="cl-page__common cl-page__item cl-page__item-jump-next"
                 v-if="pageItemNextShow"
                 @mouseenter="jumpMouseEnter('next')"
                 @mouseleave="jumpMouseLeave('next')"
                 @click.stop="jumpPage('next')">
                <i :class="jumpNextIcon"></i>
            </div>

            <div class="cl-page__common cl-page__item cl-page__item-final"
                 v-if="allPage > 1"
                 :class="[currentPage === allPage && 'cl-page__item-active']"
                 @click.stop="changePage(allPage)">{{allPage}}
            </div>

            <div class="cl-page__common cl-page__item cl-page__next"
                 :class="[currentPage === allPage && 'cl-page__item-disabled']"
                 @click.stop="changePage(currentPage + 1)">
                <template v-if="nextText">{{nextText}}</template><i v-else class="cl-icon-right"></i>
            </div>
        </div>

        <div class="cl-page__common cl-page__page-size" :style="{order: orderList('pageSize')}" v-if="orderList('pageSize') > -1">
            <cl-select class="cl-page__page-size-select" v-model="currentPageSize" :size="size" @change="pageSizeChange">
                <cl-option v-for="item in currentPageSizeOption" :key="item.value" :value="item.value"
                           :label="item.label"></cl-option>
            </cl-select>
        </div>

        <div class="cl-page__common cl-page__jump-to" :style="{order: orderList('jump')}" v-if="orderList('jump') > -1">
            跳至
            <cl-input class="cl-page__jump-to-input" type="number" v-model="jumpToPage" :step="false" :size="size"
                      @enter="jumpToPageChange"/>
            页
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClPage",
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
                default: '共 total 条'
            },//定义总数量显示方式
            pageSizeText: {
                type: String,
                default: 'pageSize 条/页'
            },//定义pageSize选项的显示方式
        },
        data() {
            return {
                currentPage: this.page,
                currentPageSize: this.pageSize,
                jumpToPage: this.page,
                currentPageSizeOption: [],
                currentSelectPageSize: '',
                jumpPreIcon: 'cl-icon-more-solid',
                jumpNextIcon: 'cl-icon-more-solid',
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
            orderList(){
                return function (type) {
                    return this.order.split(',').findIndex(item=>{
                        return item.trim() === type
                    });
                }
            }
        },
        components: {},
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
                if(page === this.currentPage){
                    return;
                }
                this.currentPage = page;
                this.jumpToPage = parseInt(page);
                this.$emit('change', page, this.currentPageSize);
            },
            pageSizeChange(){
                if(this.allPage < this.currentPage){
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
                    this.jumpPreIcon = 'cl-icon-arrow-left';
                } else if (type === 'next') {
                    this.jumpNextIcon = 'cl-icon-arrow-right';
                }
            },
            jumpMouseLeave(type) {
                if (type === 'pre') {
                    this.jumpPreIcon = 'cl-icon-more-solid';
                } else if (type === 'next') {
                    this.jumpNextIcon = 'cl-icon-more-solid';
                }
            },
            setPageSizeOption(){
                this.pageSizeOption.forEach(item => {
                    this.currentPageSizeOption.push({
                        label: this.pageSizeText.replace('pageSize', item),
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
