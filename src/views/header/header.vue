<template>
    <div class="header">
        <router-link class="logo" to="/">Cl-UI</router-link>
        <div class="header-right">
            <!--<cl-menu mode="horizontal" theme="dark" @select="envChange">-->
                <!--<cl-submenu c-key="env" name="切换环境">-->
                    <!--<cl-menu-item c-key="env-dev" name="dev"></cl-menu-item>-->
                    <!--<cl-menu-item c-key="env-doc" name="doc"></cl-menu-item>-->
                <!--</cl-submenu>-->
            <!--</cl-menu>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: "Cheader",
    data() {
      return {

      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      envChange(value){
        console.log(value,'====')
      }
    }
  }
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
        font-size: 20px;
        color: #19be6b;
    }
    .header-right{

    }
}
</style>
