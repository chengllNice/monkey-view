<template>
    <div class="TreeView">
        <cl-tree :data="treeData"></cl-tree>
    </div>
</template>

<script>
    export default {
        name: "TreeView",
        data() {
            return {
                treeData: [
                    {
                        key: 'node-0',
                        label: 'node-0',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'node-0-1',
                                label: 'node-0-1',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                            {
                                key: 'node-0-2',
                                label: 'node-0-2',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'node-1',
                        label: 'node-1',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    },
                    {
                        key: 'node-2',
                        label: 'node-2',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        },
        computed: {},
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
