
'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    cssnext = require('postcss-cssnext');

var path = {
    build: {
        html: '',
        js: 'js/',
        css: 'css/',
        img: 'img/'
    },
    dev: {
        js: '_dev/js/*.js',
        html: '_dev/html/*.html',
        css: '_dev/css/*.css',
        img: '_dev/img/*.*'
    }
};

gulp
    .task('js:build', function () {
        gulp.src(path.dev.js)
            .pipe(plumber())
            .pipe(rigger())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.build.js));
    })
    .task('css:build', function () {
        gulp.src(path.dev.css)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(postcss([
                cssnext(),
                cssnano({
                    discardComments: {
                        removeAll: true
                    }
                })
            ]))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.build.css));
    })
    .task('img:build', function () {
        gulp.src(path.dev.img)
            .pipe(plumber())
            .pipe(imagemin({
                progressive: true,
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.build.img));
    })
    .task('html:build', function () {
        gulp.src(path.dev.html)
            .pipe(plumber())
            .pipe(rigger())
            .pipe(plumber.stop())
            .pipe(gulp.dest(path.build.html));
    })
    .task('build', [
        'js:build',
        'css:build',
        'img:build',
        'html:build'
    ])
    .task('watch', function () {
        watch([path.dev.img], function (e, cb) {
            gulp.start('img:build');
        });
        watch([path.dev.css], function (e, cb) {
            gulp.start('css:build');
        });
        watch([path.dev.js], function (e, cb) {
            gulp.start('js:build');
        });
        watch([path.dev.html], function (e, cb) {
            gulp.start('html:build');
        });
    });
