const fs = require('fs');
const path = require('path');

let files = fs.readdirSync(path.resolve(__dirname, '../examples/views/dev'))

files.forEach(file=>{
    let name = path.basename(file, '.vue');
    name = name.replace('View', '');
    let f = name.substring(0,1).toLowerCase();
    name = f + name.substring(1) + '.vue';
    let old = path.resolve(__dirname, '../examples/views/dev', file);
    let n = path.resolve(__dirname, '../examples/views/dev', name);
    fs.renameSync(old, n)
    console.log(file);
})