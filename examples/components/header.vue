<template>
    <div class="header">
        <router-link class="logo" to="/">
            <img src="https://chengllnice.github.io/static/images/cl-ui/monkey-ui.svg" alt="">
            <span>Monkey-UI</span>
        </router-link>
        <div class="header-right">
            <Menu mode="horizontal" @select="langChange" size="large" :activeKey="lang">
                <Submenu c-key="lang" :name="langMap[lang]">
                    <MenuItem c-key="zh-CN" name="中文"></MenuItem>
                    <MenuItem c-key="en-US" name="English"></MenuItem>
                </Submenu>
            </Menu>
        </div>
    </div>
</template>

<script>
    import Config from 'examples/config'
    export default {
        name: "Cheader",
        data() {
            return {
                lang: Config.defaultLang,
                langMap: {
                    'zh-CN': '中文',
                    'en-US': 'English',
                }
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.setLang();
        },
        methods: {
            langChange(value) {
                let path = this.$route.path;
                let pathArr = path.split('/');
                pathArr[1] = value;
                path = pathArr.join('/');
                this.$router.push({
                    path: path
                })
            },
            setLang(){
                this.lang = Config.langTypes.includes(this.$route.path.split('/')[1]) ? this.$route.path.split('/')[1] : Config.defaultLang;
            }
        },
        watch: {
            '$route': function () {
                this.setLang();
            }
        }
    }
</script>

<style lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .logo {
            font-size: 14px;
            color: #333333;

            img{
                width: 40px;
                height: 40px;
                vertical-align: middle;
                margin-top: -5px;
            }
            span{
                vertical-align: middle;
            }
        }

        .header-right {

        }
    }
</style>
