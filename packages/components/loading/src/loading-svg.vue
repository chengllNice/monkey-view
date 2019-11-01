<template>
    <svg v-if="type === 'loading2'" version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :viewBox="svgViewBox" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle :fill="svgColor" stroke="none" :cx="svgCx[0]" :cy="svgCy" :r="svgR" transform="translate(0 2.5404)">
        <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 8 ; 0 -8; 0 8" repeatCount="indefinite" begin="0.1"></animateTransform>
      </circle>
      <circle :fill="svgColor" stroke="none" :cx="svgCx[1]" :cy="svgCy" :r="svgR" transform="translate(0 5.6936)">
        <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 6 ; 0 -6; 0 6" repeatCount="indefinite" begin="0.2"></animateTransform>
      </circle>
      <circle :fill="svgColor" stroke="none" :cx="svgCx[2]" :cy="svgCy" :r="svgR" transform="translate(0 4.8468)">
        <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 4 ; 0 -4; 0 4" repeatCount="indefinite" begin="0.3"></animateTransform>
      </circle>
    </svg>
    <svg v-else-if="type === 'loading3'" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :viewBox="svgViewBox" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle :fill="svgColor" stroke="none" :cx="svgCx[0]" :cy="svgCy" :r="svgR">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>
      </circle>
      <circle :fill="svgColor" stroke="none" :cx="svgCx[1]" :cy="svgCy" :r="svgR">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>
      </circle>
      <circle :fill="svgColor" stroke="none" :cx="svgCx[2]" :cy="svgCy" :r="svgR">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>
      </circle>
    </svg>

    <svg v-else-if="type === 'loading4'" version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
      <rect fill="none" stroke="#2d8cf0" stroke-width="4" x="25" y="25" width="50" height="50">
        <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform>
      </rect>
      <rect x="27" y="27" :fill="svgColor" width="46" height="45.1694">
        <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate>
      </rect>
    </svg>

    <svg v-else-if="type === 'loading5'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :viewBox="svgViewBox" enable-background="new 0 0 0 0" xml:space="preserve">
        <rect :x="svgCx[0]" :fill="svgColor" :width="svgR" :height="svgWidth" :transform="`rotate(180 ${svgR + svgCx[0] - 2.5} ${svgCy})`">
            <animate attributeName="height" attributeType="XML" dur="1s" values="6; 20; 6" repeatCount="indefinite"></animate>
        </rect>
        <rect :x="svgCx[1]" :fill="svgColor" :width="svgR" :height="svgWidth" :transform="`rotate(180 ${svgR + svgCx[1] - 2.5} ${svgCy})`">
            <animate attributeName="height" attributeType="XML" dur="1s" values="6; 20; 6" repeatCount="indefinite" begin="0.1s"></animate>
        </rect>
        <rect :x="svgCx[2]" :fill="svgColor" :width="svgR" :height="svgWidth" :transform="`rotate(180 ${svgR + svgCx[2] - 2.5} ${svgCy})`">
            <animate attributeName="height" attributeType="XML" dur="1s" values="6; 20; 6" repeatCount="indefinite" begin="0.3s"></animate>
        </rect>
    </svg>
</template>

<script>
    export default {
        name: "loadingSvg",
        props: {
            type: String,
            size: String,
            color: String,
        },
        data() {
            return {
                defaultSize: {
                    'mini': 24,
                    'small': 28,
                    'default': 32,
                    'large': 36
                },
                defaultR: {
                    'mini': 2,
                    'small': 2.5,
                    'default': 3,
                    'large': 3.5
                },
                svgColor: this.color || '#2d8cf0',
            }
        },
        computed: {
            svgWidth() {
                return this.defaultSize[this.size];
            },
            svgViewBox() {
                return `0 0 ${this.svgWidth} ${this.svgWidth}`;
            },
            svgCy() {
                return this.svgWidth / 2;
            },
            svgR() {
                return this.defaultR[this.size];
            },
            svgCx() {
                let dis = (this.svgWidth - this.svgR * 2 * 3) / 4;
                let cx1 = dis + this.svgR;
                let cx2 = dis * 2 + this.svgR * 3;
                let cx3 = dis * 3 + this.svgR * 5;
                return [cx1, cx2, cx3]
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

<style scoped>

</style>
