
const markdownRender = require('markdown-it')();
const cheerio = require('cheerio'); // 服务器版的jQuery
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const convert = require('chinese2pinyin');

const findContent = (tokens, idx) => {
  let index = tokens.length;
  let sourceContent = '';
  let descriptionContent = '';
  let start = idx;
  while (index > 0 && (!sourceContent || !descriptionContent)) {
    start++;
    if (tokens[start] && tokens[start].type === 'fence' && tokens[start].info === 'html') {
      sourceContent = tokens[start] && tokens[start].content;
    } else if (tokens[start] && tokens[start].nesting !== '-1') {
      descriptionContent += tokens[start].content ? markdownRender.render(tokens[start].content) : '';
      tokens[start].children && (tokens[start].children = []);
    }
    index--;
  }
  return {
    descriptionContent,
    sourceContent
  };
};

/**
 * 在生成组件效果展示时,解析出的VUE组件有些是带<script>和<style>的,我们需要先将其剔除,之后使用
 * @param  {[String]}       str   需要剔除的标签名 e.g'script'或['script','style']
 * @param  {[Array|String]} tags  e.g '<template></template><script></script>''
 * @return {[String]}             e.g '<html><head><template></template></head><body></body></html>'
 */
const strip = (str, tags) => {
  var $ = cheerio.load(str, {decodeEntities: false});

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  var len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html(); // cheerio 转换后会将代码放入<head>中
};


/**
 * 获取标签中的文本内容
 * @param  {[String]} str e.g '<html><body><h1>header</h1></body><script></script></html>'
 * @param  {[String]} tag e.g 'h1'
 * @return {[String]}     e.g 'header'
 */
const fetch = (str, tag) => {
  var $ = cheerio.load(str, {decodeEntities: false});
  if (!tag) return str;

  return $(tag).html();
};

const pad = (source) => {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
};


const genInlineComponentText = (template, script) => {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
      compiled.errors.map(e => `  - ${e}`).join('\n') +
      '\n'
    );
  }
  let demoComponentContent = `
    ${compiled.code}
  `;
  // todo: 这里采用了硬编码有待改进
  script = script && script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return demoComponentContent;
};


const uniqueSlug = (slug, slugs) => {
  const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
  slug = slugify(slug);
  let uniq = slug;
  let i = 2;
  while (Object.prototype.hasOwnProperty.call(slugs, uniq)) uniq = `${slug}-${i++}`;
  slugs[uniq] = true;
  return uniq;
};


const renderContent = (tokens, idx) => {
  if (tokens[idx].nesting === 1) {
    let contentObj = findContent(tokens, idx);
    let demoInfo = tokens[idx].info
      .trim()
      .match(/^demo\s+(.*)$/);
    let title =
      demoInfo && demoInfo.length > 1
        ? demoInfo[1]
        : '';
    let titleHtml = title || '';

    let titleId = convert({
      cn: titleHtml,
      result: 'F'
    });

    let descriptionHtml = contentObj.descriptionContent
      ? contentObj.descriptionContent
      : '';

    let sourceContent = contentObj.sourceContent;

    return `<code-wrap id="${titleId}">
                <div slot="description">${descriptionHtml}</div>
                <span slot="title">${titleHtml} <a href="#${titleId}" data-title="${titleHtml}">#</a></span>
                <!--monkey-ui-doc: ${sourceContent} :monkey-ui-doc-->`;
  }
  return '</code-wrap>\n';
};
// <div class="source" slot="source">${sourceContent}</div>

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

module.exports = {
  findContent,
  renderContent,
  strip,
  fetch,
  genInlineComponentText,
  stripScript,
  stripStyle,
  stripTemplate
};
