const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const del = require('del');

// 编译sass
gulp.task('css', () => {
    return gulp.src('../packages/theme-default/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(uglifycss())
        .pipe(rename('monkey-ui.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 拷贝fonts
gulp.task('fonts', () => {
    return gulp.src('../packages/theme-default/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
});


// 删除styles
gulp.task('clean', async (done) => {
    await del(['../dist/styles/**'], {
        force: true
    });
    done();
});

gulp.task('default', gulp.series('clean', 'css', 'fonts'));
