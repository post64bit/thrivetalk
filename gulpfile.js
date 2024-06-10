const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');


function styles() {
    return src('app/scss/**')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
};

function scripts() {
    return src('app/js/main.js')
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}
function watching() {
    watch(['app/js/main.js'], scripts);
    watch(['app/scss/styles.css'], styles);
    watch(['app/scss/styles.scss'], styles);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}
function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}
function cleanDist() {
    return src('dist')
        .pipe(clean());
}
function minimizeImages() {
    return src('app/images/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            pngquant: true
        }))
        .pipe(dest('app/images'));
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(minimizeImages, cleanDist, building)

exports.default = parallel(styles, scripts, browsersync, watching);