<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <router-link to="/buttonView">ButtonView</router-link>
            |
            <router-link to="/badgeView">BadgeView</router-link>
            |
            <router-link to="/checkboxView">CheckboxView</router-link>
            |
            <router-link to="/radioView">RadioView</router-link>
            |
            <router-link to="/inputView">InputView</router-link>
            |
            <router-link to="/selectView">SelectView</router-link>
            |
            <router-link to="/switchView">SwitchView</router-link>
            |
            <router-link to="/sliderView">SliderView</router-link>
            |
            <router-link to="/uploadView">UploadView</router-link>
            |
            <router-link to="/popoverView">PopoverView</router-link>
            |
            <router-link to="/tooltipView">TooltipView</router-link>
            |
            <router-link to="/tagView">TagView</router-link>
            |
            <router-link to="/modalView">ModalView</router-link>
            |
            <router-link to="/messageView">MessageView</router-link>
            |
            <router-link to="/noticeView">NoticeView</router-link>
            |
            <router-link to="/progressView">ProgressView</router-link>
            |
            <router-link to="/alterView">AlterView</router-link>
            |
            <router-link to="/cardView">CardView</router-link>
            |
            <router-link to="/drawerView">DrawerView</router-link>
            |
            <router-link to="/tableView">TableView</router-link>
            |
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .viewDes {
        margin-top: 50px;
        .propItem {
            border-bottom: 1px solid #eeeff1;
        }
    }
</style>
