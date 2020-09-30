
export default {
    name: 'TableExpand',
    functional: true,
    inject: ['tableRoot'],
    props: {
        columns: Array,
        row: Object
    },
    render(h, context) {
        const r = context.injections.tableRoot.$scopedSlots['expand'];
        if (r) {
            return h('div', r({
                row: context.props.row,
                columns: context.props.columns
            }));
        }
        return null;
    }
}
