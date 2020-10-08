const { resolve } = require('path');
const fs = require('fs');
const localePath = resolve(__dirname, '../src/locale/lang');
const fileList = fs.readdirSync(localePath);
const entry = {};
fileList.forEach(file => {
    const name = file.split('.')[0];
    entry[name] = './src/locale/lang/' + file;
});
module.exports = entry;
