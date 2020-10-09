<template>
    <div class="anchors-link">
        <div class="anchors-link-item"
             :class="{'is-active': active === item.hash}"
             v-for="(item, index) in anchorLinkData"
             :key="index">
            <a href="javascript:void(0);" @click="handleGoAnchors(item)">{{item.text}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnchorsLink',
        data() {
            return {
                anchorLinkData: [],
                active: '',
            }
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.getAnchorLinkNav();
                })
            });
            document.querySelector('.views-main-content').addEventListener('scroll', (e) => {
                this.scrollChange(e)
            }, false)
        },
        methods: {
            getAnchorLinkNav() {
                this.anchorLinkData = [];
                const anchors = document.querySelectorAll('.code-wrap-des-content-title a');
                const anchorsApi = document.querySelectorAll('#api');
                this.active = '';
                const routerHash = this.$route.hash;
                if (anchors && anchors.length) {
                    let activeAnchors = null;
                    anchors.forEach(item => {
                        const text = item.attributes['data-title'].value;
                        const hash = item.attributes['href'].value;
                        const scrollHeight = document.querySelector(hash).offsetTop;
                        const offsetHeight = document.querySelector(hash).offsetHeight;

                        const obj = { text, hash, scrollHeight, offsetHeight };
                        this.anchorLinkData.push(obj);

                        if (routerHash === hash) {
                            activeAnchors = obj;
                        }
                    });
                    if(anchorsApi && anchorsApi.length){
                        const text = 'API';
                        const hash = '#api';
                        const scrollHeight = document.querySelector(hash).offsetTop;
                        const offsetHeight = document.querySelector(hash).offsetHeight;

                        const obj = { text, hash, scrollHeight, offsetHeight };
                        this.anchorLinkData.push(obj);

                        if (routerHash === hash) {
                            activeAnchors = obj;
                        }
                    }
                    this.active = this.anchorLinkData[0].hash;
                    if (activeAnchors) {
                        this.active = activeAnchors.hash;
                        this.handleGoAnchors(activeAnchors);
                    }
                }
            },
            scrollChange(e) {
                const scrollTop = e && e.target && e.target.scrollTop;
                const len = this.anchorLinkData.length;
                for (let i = 0; i < len; i++) {
                    if (scrollTop <= this.anchorLinkData[i].scrollHeight + this.anchorLinkData[i].offsetHeight) {
                        this.active = this.anchorLinkData[i].hash;
                        return;
                    }
                }
            },
            handleGoAnchors(item) {
                const routeHash = this.$route.hash;
                const hash = item.hash;
                const scrollTo = item.scrollHeight;
                if (routeHash !== hash) {
                    this.$router.replace({
                        hash: hash
                    });
                }
                this.$nextTick(() => {
                    document.querySelector('.views-main-content').scrollTo(0, scrollTo);
                })
            }
        },
        watch: {
            '$route.path': function () {
                this.getAnchorLinkNav();
            }
        }
    }
</script>
