const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');

gulp.task('default',
  ['watch', 'tslint', 'build']);

gulp.task('watch', () => {
  gulp.watch(
    ['src/**/*.ts', 'src/**/*.html', 'src/**/*.scss'],
    ['tslint', 'build']);
});

gulp.task('build', ['external-css', 'external-js', 'external-fonts', 'html', 'scss', 'config'], () => {
  browserify()
    .add('src/app.ts')
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on("error", (e) => { console.log(e.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('config', () => {
  return gulp.src('./config.js')
    .pipe(gulp.dest('build'));
});

gulp.task('scss', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('external-js', () => {
  return gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-material/angular-material.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery/dist/jquery.js'
  ])
    .pipe(gulp.dest('build/js'));
});

gulp.task('external-css', () => {
  return gulp.src([
    'src/css/*.css',
    'node_modules/angular-material/angular-material.css'
  ])
    .pipe(gulp.dest('build/css'));
});

gulp.task('external-fonts', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/fonts/*'
  ])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('html', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'stylish'
    }))
    .pipe(tslint.report({
      emitError: false
    }))
});