const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist/')

const deleteFilenames = [
    'demo.html',
    'monkey-ui.common.js',
    'monkey-ui.common.js.map',
];

const renameFilenames = {
    'monkey-ui.umd.js': 'monkey-ui.js',
    'monkey-ui.umd.js.map': 'monkey-ui.js.map',
    'monkey-ui.umd.min.js': 'monkey-ui.min.js',
    'monkey-ui.umd.min.js.map': 'monkey-ui.min.js.map',
}

const distFiles = fs.readdirSync(distPath);

distFiles.forEach(file => {
    if (deleteFilenames.includes(file)) {
        fs.unlink(distPath + '/' + file, (err) => {
            if (err) return console.error(err);
            console.log(deleteFilenames.join(',') + "文件删除成功！");
        })
    }
    if(renameFilenames[file]){
        const oldPath = path.join(distPath, file);
        const newPath = path.join(distPath, renameFilenames[file]);
        fs.renameSync(oldPath, newPath);
    }
})