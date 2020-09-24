<template>
    <div class="DrawerView">
        <Button @click="handlerClick('Base')">普通</Button>
        <Button @click="handlerClick('FooterHide')">普通footer-hide</Button>
        <Button @click="handlerClick('FooterHideNoTitle')">普通footer-hide,noTitle</Button>
        <Button @click="handlerClick('Left')">左侧滑出</Button>
        <Button @click="handlerClick('Top')">顶部滑出</Button>
        <Button @click="handlerClick('Bottom')">底部滑出</Button>

        <Drawer v-model="drawerBase" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>

        <Drawer v-model="drawerFooterHide" footer-hide title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>

        <Drawer v-model="drawerFooterHideNoTitle" footer-hide title="">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>

        <Drawer v-model="drawerLeft" placement="left" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>

        <Drawer v-model="drawerTop" placement="top" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>

        <Drawer v-model="drawerBottom" placement="bottom" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    </div>
</template>

<script>
  export default {
    name: "DrawerView",
    data() {
      return {
        drawerBase: false,
        drawerFooterHide: false,
        drawerFooterHideNoTitle: false,
        drawerLeft: false,
        drawerTop: false,
        drawerBottom: false,
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerClick(type){
        this[`drawer${type}`] = true;
      }
    }
  }
</script>

<style scoped>

</style>
