<template>
    <div class="anchors-link" :style="{top: scrollTop + 'px'}">
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
        name: "AnchorsLink",
        data() {
            return {
                anchorLinkData: [],
                active: '',
                scrollTop: '',
            }
        },
        mounted() {
            this.$nextTick(()=>{
                setTimeout(()=>{
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
                this.active = '';
                let routerHash = this.$route.hash;
                if (anchors && anchors.length) {
                    let activeAnchors = null;
                    anchors.forEach(item => {
                        let text = item.attributes['data-title'].value;
                        let hash = item.attributes['href'].value;
                        let scrollHeight = document.querySelector(hash).offsetTop;
                        let offsetHeight = document.querySelector(hash).offsetHeight;

                        let obj = {text, hash, scrollHeight, offsetHeight};
                        this.anchorLinkData.push(obj);

                        if(routerHash === hash){
                            activeAnchors = obj;
                        }
                    });
                    this.active = this.anchorLinkData[0].hash;
                    if(activeAnchors){
                        this.active = activeAnchors.hash;
                        this.handleGoAnchors(activeAnchors);
                    }
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
            handleGoAnchors(item){
                let routeHash = this.$route.hash;
                let hash = item.hash;
                let scrollTo = item.scrollHeight;
                if(routeHash !== hash) {
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
