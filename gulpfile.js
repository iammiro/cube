const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const processors = [
    autoprefixer({
        browsers: ['last 4 versions']
    }),
    nested
];

gulp.task('serve', ['pug'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.jade', ['pug']);
    gulp.watch('*.html').on('change', reload);
});

gulp.task('scss', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('pug', function buildHTML() {
    return gulp
        .src('src/pug/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('build/html/'));
});

gulp.task('pug:watch', function () {
    gulp.watch('src/pug/*', ['html'])
});

gulp.task('scss:watch', function () {
    gulp.watch('src/scss/*', ['scss']);
});

gulp.task('default', ['scss', 'pug']);