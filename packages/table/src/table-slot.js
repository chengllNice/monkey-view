
export default {
    name: 'TableSlot',
    functional: true,
    inject: ['tableRoot'],
    props: {
        column: Object,
        row: Object
    },
    render(h, context) {
        const r = context.injections.tableRoot.$scopedSlots[context.props.column.slot];
        if (r) {
            return h('div', r({
                row: context.props.row,
                column: context.props.column
            }));
        }
        return null;
    }
}
