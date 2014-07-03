// load plugins
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');


// styles
gulp.task('styles', function() {
	gulp.src('src/stylesheets/index.scss')
		.pipe(sass())
		.pipe(prefix('last 1 version', '> 1%', 'ie 8'))
		.pipe(gulp.dest('dest/stylesheets/'));
});


// scripts
gulp.task('scripts', function() {
	gulp.src('src/javascripts/track-focus.js')
		.pipe(gulp.dest('dest/javascripts/'))
		.pipe(uglify({ preserveComments: 'some' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dest/javascripts/'));
});

gulp.task('polyfills', function() {
	gulp.src('src/javascripts/polyfills/*.js')
		.pipe(concat('polyfills.js'))
		.pipe(gulp.dest('dest/javascripts/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dest/javascripts/'));
});


// clean
gulp.task('clean', function(){
	gulp.src(['dest/javascripts/*', 'dest/stylesheets/*'], { read: false })
		.pipe(clean());
});


// default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'polyfills', 'scripts');
});


// watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/*.scss', ['styles']);
	gulp.watch(['src/javascripts/polyfills/*.js'], ['polyfills']);
	gulp.watch(['src/javascripts/track-focus.js'], ['scripts']);
});
