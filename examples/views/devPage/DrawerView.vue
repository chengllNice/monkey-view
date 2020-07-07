<template>
    <div class="DrawerView">
        <ClButton @click="handlerClick('Base')">普通</ClButton>
        <ClButton @click="handlerClick('FooterHide')">普通footer-hide</ClButton>
        <ClButton @click="handlerClick('FooterHideNoTitle')">普通footer-hide,noTitle</ClButton>
        <ClButton @click="handlerClick('Left')">左侧滑出</ClButton>
        <ClButton @click="handlerClick('Top')">顶部滑出</ClButton>
        <ClButton @click="handlerClick('Bottom')">底部滑出</ClButton>

        <ClDrawer v-model="drawerBase" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>

        <ClDrawer v-model="drawerFooterHide" footer-hide title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>

        <ClDrawer v-model="drawerFooterHideNoTitle" footer-hide title="">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>

        <ClDrawer v-model="drawerLeft" placement="left" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>

        <ClDrawer v-model="drawerTop" placement="top" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>

        <ClDrawer v-model="drawerBottom" placement="bottom" title="title">
            <p>Some contents...Some contents...Some contents...Some contents...Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ClDrawer>
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
