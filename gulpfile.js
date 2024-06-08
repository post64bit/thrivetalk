const { src, dest } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function styles() {
    return src('app/scss/**')
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(dest('app/css'));
};

exports.styles = styles;