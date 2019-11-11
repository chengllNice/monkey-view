
export default {
    name: 'ClTableSlot',
    functional: true,
    inject: ['tableRoot'],
    props: {
        column: Object,
        __id: String,
        row: Object
    },
    render(h, context){
        return h('div', context.injections.tableRoot.$scopedSlots[context.props.column.slot]({
            row: context.props.row,
            column: context.props.column,
            __id: context.props.__id
        }));
    }
}
