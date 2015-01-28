var gulp = require('gulp');
var server = require('gulp-develop-server');
var watchify = require('watchify');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

var bundler = watchify(browserify('./app/app.js', watchify.args));

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './public',
    }
  });
});

gulp.task('build:bootstrap', function() {
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.css.map'
  ]).pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file

bundler.on('update', bundle); // on any dep update, runs the bundler

gulp.task('default', ['browserify', 'browserSync']);

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({ stream: true }));
}
