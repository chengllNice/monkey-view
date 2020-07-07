<template>
    <div class="cl-list-row" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
    import {findComponent, findComponentDirectChildrens} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'
    export default {
        name: "ClListRow",
        mixins: [Emitter],
        data() {
            return {
                componentName: 'ClListRow',
                parentListComponent: findComponent(this, 'ClList'),
                itemLen: '',//list-item的数量
            }
        },
        computed: {
            rowStyle(){
                return {
                    marginLeft: -this.parentListComponent.gutter / 2 + 'px',
                    marginRight: -this.parentListComponent.gutter / 2 + 'px',
                }
            }
        },
        components: {

        },
        created() {
        },
        mounted() {
            this.$on('on-update-item-len', () => {
                this.parentEmit('ClList', 'on-update-item-width', this.updateItemWidth());
            })
        },
        methods: {
            updateItemWidth() {
                let listItemChildren = findComponentDirectChildrens(this, 'ClListItem');
                return listItemChildren.length;
            }
        }
    }
</script>
