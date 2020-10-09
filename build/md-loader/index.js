
const {
  genInlineComponentText,
  stripStyle,
  stripScript,
  stripTemplate,
  fetch} = require('./util');
const md = require('./config');
const reg = /<template slot="highlight"><p><\/p>/g;

module.exports = function (source) {
  const content = md.render(source).replace(reg, '<template slot="highlight">');

  const startTag = '<!--monkey-view-doc:';
  const startTagLen = startTag.length;
  const endTag = ':monkey-view-doc-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `monkey-view-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));


  let dealComponent = `
    <template>
      <section class="doc-article monkey-view-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;


  return dealComponent;
};



// const container = require('./container');
// const preprocess = require('./preprocess');
// const anchor = require('./anchor');
//
//
// module.exports = {
//   preprocess: (MarkdownIt, source) => preprocess(MarkdownIt, source),
//   raw: true,
//   preventExtract: true,
//   use: [
//     anchor,
//     ...container,
//   ]
// };
