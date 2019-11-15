
export default {
    name: 'ClTableSlotHead',
    functional: true,
    inject: ['tableRoot'],
    props: {
        column: Object,
    },
    render(h, context){
        const r = context.injections.tableRoot.$scopedSlots[context.props.column.slotHead];
        if(r){
            return h('div', r({
                column: context.props.column,
            }));
        }
        return null;
    }
}
