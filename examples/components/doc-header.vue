<template>
    <div class="doc-header">
        <router-link class="doc-header-logo" to="/">
            <img src="https://chengllnice.github.io/static/images/monkey-ui/monkey-ui.svg" alt="">
            <span>Monkey-UI</span>
        </router-link>
        <div class="doc-header-right">
            <Menu mode="horizontal" :item-height="60">
                <MenuItem c-key="docs" name="文档"></MenuItem>
                <MenuItem c-key="components" name="组件"></MenuItem>
            </Menu>
            <Dropdown class="doc-header-drop" trigger="click" @click-item="handleChangeVersion">
                {{version}} <Icon type="down"></Icon>
                <DropdownMenu slot="menu">
                    <DropdownItem v-for="(item, index) in versionMap" :key="index" :name="item">{{item}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown class="doc-header-drop" trigger="click" @click-item="langChange">
                {{langMap[lang]}} <Icon type="down"></Icon>
                <DropdownMenu slot="menu">
                    <DropdownItem v-for="(value, key) in langMap" :key="key" :name="key">{{value}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span class="doc-header-drop doc-header-github" @click="handleGo('github')"><Icon type="github" size="20"></Icon></span>
        </div>
    </div>
</template>

<script>
    import Config from 'examples/config'

    export default {
        name: "DocHeader",
        data() {
            return {
                lang: Config.defaultLang,
                langMap: {
                    'zh-CN': '中文',
                    'en-US': 'English',
                },
                version: Config.defaultVersion,
                versionMap: Config.versionTypes
            }
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
            setLang() {
                this.lang = Config.langTypes.includes(this.$route.path.split('/')[1]) ? this.$route.path.split('/')[1] : Config.defaultLang;
            },
            handleChangeVersion(value){
                this.version = value;
            },
            handleGo(type){
                let url = '';
                if(type === 'github'){
                    url = 'https://github.com/chengllNice/monkey-ui'
                }
                window.open(url, '_black');
            }
        },
        watch: {
            '$route': function () {
                this.setLang();
            }
        }
    }
</script>
