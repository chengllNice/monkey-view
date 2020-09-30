
export default {
    name: 'TableSlotHead',
    functional: true,
    inject: ['tableRoot'],
    props: {
        column: Object,
        slotName: String
    },
    render(h, context) {
        const r = context.injections.tableRoot.$scopedSlots[context.props.slotName];
        const className = context.data.class || {};
        if (r) {
            return h('div', {
                class: className
            }, r({
                column: context.props.column
            }));
        }
        return null;
    }
}
