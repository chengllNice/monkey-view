const renderRule = (md) => {
    const defaultRender = md.renderer.rules.fence;

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (token.info === 'html' && token.content) {
            let isDemo = 'demo' in token;
            if(isDemo){
                return `<div v-highlight><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></div>`;
            }
            return `<div class="md-html-no-demo" v-highlight><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></div>`;
        } else if (token.info === 'shell' && token.content) {
            return `<div class="md-html-no-demo" v-highlight><pre v-pre><code class="shell">${token.content}</code></pre></div>`;
        }else if (token.info === 'javascript' && token.content) {
            return `<div class="md-html-no-demo" v-highlight><pre v-pre><code class="javascript">${token.content}</code></pre></div>`;
        }
        return defaultRender(tokens, idx, options, env, self);
    };
};

const table = (md) => {
    md.renderer.rules.table_open = () => {
        return '<table class="doc-table">';
    };
};

// const link = (md) => {
//   const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
//     return self.renderToken(tokens, idx, options);
//   };
//   md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
//     let aIndex = tokens[idx].attrIndex('target');
//
//     if (aIndex < 0) {
//       tokens[idx].attrPush(['target', '_blank']);
//     } else {
//       tokens[idx].attrs[aIndex][1] = '_blank';
//     }
//     return defaultRender(tokens, idx, options, env, self);
//   };
// };


// 覆盖默认的 fence 渲染策略
module.exports = md => {
    renderRule(md);
    table(md);
};
