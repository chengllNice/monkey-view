const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const fileSave = require('file-save');
const {resolve, basename} = path;
const localePath = resolve(__dirname, '../src/locale/lang');
const fileList = fs.readdirSync(localePath);

const transform = (filename, name, cb) => {
    require('@babel/core').transformFile(resolve(localePath, filename), {
        plugins: [
            // 'add-module-exports',
            ['@babel/plugin-transform-modules-umd', {loose: true}]
        ],
        moduleId: name
    }, cb);
};

fileList
    .filter(function(file) {
        return /\.js$/.test(file);
    })
    .forEach(function(file) {
        let name = basename(file, '.js');

        transform(file, name, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                let code = result.code;

                code = code
                    .replace("define(\"", "define(\"monkey/default/locale/")
                    .replace('global.', 'global.MONKEY.default.lang = global.MONKEY.default.lang || {}; \n    global.MONKEY.default.lang.');

                // code = UglifyJS.minify(code).code;

                const filepath = path.join(__dirname, '../dist/locale', name + '.js');
                fileSave(filepath).write(code).end();
            }
        });
    });