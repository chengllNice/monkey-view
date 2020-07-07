<template>
    <div class="cl-card"
         :class="[
            noHover && 'cl-card--noHover',
            noBorder && 'cl-card--noBorder'
         ]">
        <div class="cl-card__header" v-if="showHeader">
            <slot name="header">
                <div class="cl-card__header-title" :title="title">{{title}}</div>
                <div class="cl-card__header-extra"><slot name="extra"></slot></div>
            </slot>
        </div>
        <div class="cl-card__body" :style="bodyStyle">
            <slot></slot>
        </div>
        <div class="cl-card__footer" v-if="showFooter">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ClCard",
    props:{
      title: String,
      noBorder: Boolean,
      noHover: Boolean,
      bodyPadding: [String, Number]
    },
    data() {
      return {}
    },
    computed: {
      showHeader(){
        return this.title || this.$slots.header
      },
      showFooter(){
        return this.$slots.footer
      },
      bodyStyle(){
        return {'padding': parseFloat(this.bodyPadding) + 'px'}
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
