<template>
    <div class="anchors-link" :style="{top: scrollTop + 'px'}">
        <div class="anchors-link-item"
             :class="{'is-active': active === item.hash}"
             v-for="(item, index) in anchorLinkData"
             :key="index">
            <a :href="item.hash">{{item.text}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "anchors-link",
        data() {
            return {
                anchorLinkData: [],
                active: '',
                scrollTop: '',
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(this.getAnchorLinkNav());
            document.querySelector('.views-main-content').addEventListener('scroll', (e) => {
                this.scrollChange(e)
            }, false)
        },
        methods: {
            getAnchorLinkNav() {
                this.anchorLinkData = [];
                const anchors = document.querySelectorAll('.code-wrap-des-content-title a');
                if (anchors && anchors.length) {
                    anchors.forEach(item => {
                        let text = item.attributes['data-title'].value;
                        let hash = item.attributes['href'].value;
                        let scrollHeight = document.querySelector(hash).offsetTop;
                        let offsetHeight = document.querySelector(hash).offsetHeight;
                        this.anchorLinkData.push({
                            text,
                            hash,
                            scrollHeight,
                            offsetHeight
                        })
                    });
                    this.active = this.anchorLinkData[0].hash;
                }
            },
            scrollChange(e) {
                this.scrollTop = e && e.target && e.target.scrollTop;
                let scrollTop = e && e.target && e.target.scrollTop;
                let len = this.anchorLinkData.length;
                for (let i = 0; i < len; i++) {
                    if (scrollTop <= this.anchorLinkData[i].scrollHeight + this.anchorLinkData[i].offsetHeight) {
                        this.active = this.anchorLinkData[i].hash;
                        return;
                    }
                }
            },
        },
        watch: {
            '$route': function () {
                this.getAnchorLinkNav();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .anchors-link {
        border-left: 1px solid #eeeeee;
        position: relative;
        top: 0;
        font-size: 12px;

        .anchors-link-item {
            padding: 8px 0 8px 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #525252;
            position: relative;

            a {
                color: #525252;

                &:hover {
                    color: #2d8cf0;
                }
            }

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                height: 60%;
                width: 0;
                border-left: 1px solid transparent;
            }

            &.is-active {
                &:before {
                    border-left: 1px solid #2d8cf0;
                }

                a {
                    color: #2d8cf0;
                }
            }
        }
    }
</style>
