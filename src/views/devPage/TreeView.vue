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
                        key: '0',
                        name: 'name-0',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: '0-1',
                                name: 'name-0-1',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                            {
                                key: '0-2',
                                name: 'name-0-2',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: '1',
                        name: 'name-1',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    },
                    {
                        key: '2',
                        name: 'name-2',
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
