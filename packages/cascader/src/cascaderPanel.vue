<template>
    <div :class="[
        `${classPrefix}`,
        !parentComponent && `${classPrefix}--border`
    ]">
        <cascader-item v-if="parentComponent && parentComponent.showFilterablePanel" :data="parentComponent.currentFilterableData" show-path-label></cascader-item>
        <cascader-item v-else :data="parentComponent ? data : currentData"></cascader-item>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import CascaderItem from './cascaderItem'
    import Mixin from './mixin'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "CascaderPanel",
        mixins: [Mixin],
        data() {
            let cascader = findComponent(this, 'Cascader');
            return {
                classPrefix: Config.classPrefix + '-cascader-panel',
                componentName: 'CascaderPanel',
                currentValue: [],
                parentComponent: cascader || null
            }
        },
        components: {
            CascaderItem
        },
        watch: {
            data: {
                handler(){
                    if(!this.parentComponent){
                        this.initCurrentData();
                    }
                },
                deep: true,
                immediate: true
            },

        }
    }
</script>
