"use strict";

var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require("gulp-connect"),
    Reproxy = require("gulp-connect-reproxy"),
    stylus = require('gulp-stylus'),
    uncss = require('gulp-uncss'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    sftp = require('gulp-sftp'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    include = require("gulp-include");

// Локальный сервер
gulp.task('connect', function () {
    connect.server({
        root: "app",
        port: 8000,
        livereload: true,
        middleware: function (connect, options) {
            options.rule = [/\.do/, /\.jsp/, /\.htm/];
            options.server = "127.0.0.1:8081";
            var proxy = new Reproxy(options);
            return [proxy];
        }
    });
});

// Удаленный сервер
gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: 'app',
        index: 'group.html'
      },
      // server: "./app",
      port: 8000,
      open: true
    });
});

// gulp.task('sftp', function () {
//     return gulp.src('app/css/style.min.css')
//         .pipe(sftp({
//             host: '5.63.158.229',
//             // host: 'ygrus.ru',
//             user: 'ygrus',
//             pass: 'lSfwwp0217eHOZnO',
//             remotePath: '/css/'
//         }));
// });

// Загрузка файлов на host
gulp.task('ftp', function () {
    return gulp.src('app/css/style.min.css')
      .pipe(ftp({
        host: '5.63.158.229',
        // host: 'ygrus.ru',
        user: 'ygrus',
        pass: 'lSfwwp0217eHOZnO',
        remotePath: '/css/'
      }))
      .pipe(gutil.noop());
});

// Объединение svg в один файл
gulp.task('svgstore', function () {
    return gulp
        .src('app/svg/item/*.svg')
        // .pipe(svgmin(function (file) {
        //     var prefix = path.basename(file.relative,path.extname(file.relative));
        //     return {
        //         plugins: [{
        //             cleanupIDs: {
        //                 prefix: prefix + '-',
        //                 minify: true
        //             }
        //         }]
        //     }
        // }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('app/svg'));
});

// Перезагрузка html после изменений
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(reload({stream:true}))
    .pipe(include({
      extensions: "html",
      hardFail: true,
      includePaths: __dirname
    }))
    .pipe(gulp.dest("app/"));
    //.pipe(notify('Done!'));
});

// Перезагрузка js после изменений
gulp.task('js', function () {
  gulp.src('app/js/script.js')
    .pipe(reload({stream:true}));
    //.pipe(notify('Done!'));
});

/* Stylus task */
gulp.task('css', function () {
  return gulp.src('css/*.styl')
    .pipe(stylus({
        cache: false,
        compress: true
    }))
    .pipe(concatCSS('style.css'))
    .pipe(autoprefixer('last 15 versions'))
    // .pipe(uncss({
    //   html: ['app/index.html']
    // }))
    //.pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});
/*
gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCSS('bundle.css'))
    .pipe(autoprefixer('last 15 versions'))
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
    //.pipe(notify('Done!'));
});
*/

// Отслеживать изменения в css и js
gulp.task('watch', function () {
  gulp.watch('css/*.styl', ['css']);
  gulp.watch('*.html', ['html']);
  gulp.watch('app/js/script.js', ['js']);
});

gulp.task('default', ['browser-sync', 'html', 'js', 'css', 'watch']);
