
export default {
    name: 'DatePaneFooterSlot',
    functional: true,
    inject: ['picker'],
    render(h, context){
        const r = context.injections.picker.$scopedSlots["paneFooter"];
        const className = context.data.class || {};
        if(r){
            return h('div',{
                'class': className
            }, r());
        }
        return null;
    }
}
