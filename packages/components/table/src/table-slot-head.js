
export default {
    name: 'ClTableSlotHead',
    functional: true,
    inject: ['tableRoot'],
    props: {
        column: Object,
        slotName: String
    },
    render(h, context){
        const r = context.injections.tableRoot.$scopedSlots[context.props.slotName];
        if(r){
            return h('div', r({
                column: context.props.column,
            }));
        }
        return null;
    }
}
