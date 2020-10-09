const Config = require('markdown-it-chain');
const container = require('./container');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const overWriteRenderRule = require('./render-rule');

const config = new Config();

config
    .options.html(true).end()
    .plugin('anchor').use(anchorPlugin, [
    {
        level: 2,
        slugify: slugify,
        permalink: true,
        permalinkBefore: false,
        permalinkSymbol: '#',
        callback: (token) => {
            token.attrSet('class', 'anchor-title');
            return token;
        }
    }
]).end()
    .plugin('containers').use(container).end();

const md = config.toMd();
overWriteRenderRule(md);

module.exports = md;
