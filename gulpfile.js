var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel');

gulp.task('css', function() {
  return gulp.src('src/css/*.scss')
    .pipe(plumber({ handleError: function (err) {
        console.log(err);
        this.emit('end');
     }}))
    .pipe(sass({ style: 'compact', noCache: true }))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe( minifycss() )
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(plumber({ handleError: function (err) {
        console.log(err);
        this.emit('end');
     }}))
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function() {
  return gulp.src('src/**/*.jade')
    .pipe(plumber({ handleError: function (err) {
        console.log(err);
        this.emit('end');
      }}))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({ server: { baseDir: "build", index: "index.html" } });
});

gulp.task('default', ['js','css','templates']);

gulp.task('watch',['js','css','templates', 'browser-sync'], function () {
  gulp.watch("src/**/*.js", ['js', browserSync.reload]);
  gulp.watch("src/css/*.scss", ['css', browserSync.reload]);
  gulp.watch("src/*.jade", ['templates', browserSync.reload]);
});

