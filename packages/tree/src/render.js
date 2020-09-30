
import Vue from 'vue'

export default {
    name: 'RenderNode',
    functional: true,
    inject: ['treeRoot'],
    props: {
        type: String,
        renderContent: Function,
        data: Object,
        root: Array
    },
    render: (h, ctx) => {
        if (ctx.props.type === 'slot') {
            const r = ctx.injections.treeRoot.$scopedSlots.default;
            if (r) {
                return h('div', r({
                    root: ctx.props.root,
                    data: ctx.props.data
                }));
            }
            return null;
        } else if (ctx.props.type === 'render') {
            const params = {
                root: ctx.props.root,
                data: ctx.props.data
            };
            let renderContent = ctx.props.renderContent(h, params);

            if (typeof renderContent === 'string') {
                renderContent = Vue.extend({
                    template: renderContent
                });
                return h(renderContent);
            }
            return renderContent;
        }
        return h('div', ctx.props.data && ctx.props.data.label);
    }
};
