<template>
    <div :class="[`${classPrefix}`]" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent, findComponentDirectChildrens} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'

    export default {
        name: "ListRow",
        mixins: [Emitter],
        data() {
            return {
                classPrefix: Config.classPrefix + '-list-row',
                componentName: 'ListRow',
                parentListComponent: findComponent(this, 'List'),
                itemLen: '',//list-item的数量
            }
        },
        computed: {
            rowStyle() {
                return {
                    marginLeft: -this.parentListComponent.gutter / 2 + 'px',
                    marginRight: -this.parentListComponent.gutter / 2 + 'px',
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$on('on-update-item-len', () => {
                this.parentEmit('List', 'on-update-item-width', this.updateItemWidth());
            })
        },
        methods: {
            updateItemWidth() {
                let listItemChildren = findComponentDirectChildrens(this, 'ListItem');
                return listItemChildren.length;
            }
        }
    }
</script>
