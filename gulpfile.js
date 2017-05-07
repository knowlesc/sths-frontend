const gulp = require('gulp');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');
const babelify = require('babelify');
const ngAnnotate = require('gulp-ng-annotate');
const flatten = require('gulp-flatten');

gulp.task('default',
  ['watch', 'tslint', 'build']);

gulp.task('watch', () => {
  gulp.watch(
    ['src/**/*.ts', 'src/**/*.html', 'src/**/*.scss'],
    ['tslint', 'build']);
});

gulp.task('build', ['external-css', 'external-fonts', 'html', 'scss', 'config'], () => {
  browserify()
    .add('src/app.ts')
    .plugin(tsify, { noImplicitAny: true })
    .transform(babelify, { extensions: ['.ts'], presets: ["es2015"] })
    .bundle()
    .on("error", (e) => { console.log(e.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('build-minified', ['build'], () => {
  pump([
    gulp.src('build/bundle.js'),
    ngAnnotate(),
    uglify(),
    rename('bundle.min.js'),
    gulp.dest('build')
  ], (e) => { if (e) console.log(e); });
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

gulp.task('external-css', () => {
  return gulp.src(['node_modules/bootswatch-sass/cosmo/bootstrap.min.css'])
    .pipe(gulp.dest('build/css'));
});

gulp.task('external-fonts', () => {
  return gulp.src(['node_modules/bootstrap/dist/fonts/*'])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('html', ['templates'], () => {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('templates', () => {
  return gulp.src(['src/**/*.template.html'])
    .pipe(flatten())
    .pipe(gulp.dest('build/templates'));
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