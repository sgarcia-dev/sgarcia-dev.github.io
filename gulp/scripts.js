'use strict';
const gulp = require('gulp');

// npm plugins
const path = require('path'),
	vinylSourceStream = require('vinyl-source-stream'),
	vinylBuffer = require('vinyl-buffer'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	gpUtil = require('gulp-util');

// gulp plugins
const gpRunSequence = require('run-sequence'),
	gpRename = require('gulp-rename'),
	gpUglify = require('gulp-uglify'),
	gpInsert = require('gulp-insert');

// dask definitions
gulp.task('process-js', callback => {
	gpUtil.log(gpUtil.colors.yellow('Processing JavaScript...'));
	gpRunSequence(['sgarcia-js'], () => {
		gpUtil.log(gpUtil.colors.bgYellow('JavaScript bundled succesfully.'));
		callback();
	});
});

gulp.task('process-js-debug', callback => {
	gpUtil.log(gpUtil.colors.yellow('Processing JavaScript...'));
	gpRunSequence(['sgarcia-js-debug'], () => {
		gpUtil.log(gpUtil.colors.bgYellow('JavaScript bundled succesfully.'));
		callback();
	});
});

gulp.task('process-js-and-html-debug', done => {
	gpUtil.log(gpUtil.colors.white('[DEBUG] Re-Processing JS and HTML...'));
	gpRunSequence('process-js-debug', 'process-html-debug', done);
});

gulp.task('sgarcia-js', createJsTask({
	src: 'src/index.js',
	dest: 'dist',
	filename: 'bundle.min.js',
	debug: false
}));

gulp.task('sgarcia-js-debug', createJsTask({
	src: 'src/index.js',
	dest: 'dist',
	filename: 'bundle.js',
	debug: true
}));



function createJsTask(opts) {
	let task;
	if (opts.debug) {
		task = () => browserify(opts.src, {
			debug: true,
			cache: {},
			packageCache: {}
		}).transform('babelify', {
			presets: ['es2015']})
			.bundle()
			.on('error', function (err) {
				console.log(err);
				this.emit('end');
			})
			.pipe(vinylSourceStream('index.js'))
			.pipe(vinylBuffer())
			.pipe(gpRename(opts.filename))
			.pipe(gulp.dest(opts.dest));
	} else {
		task = () => browserify(opts.src, {
			cache: {},
			packageCache: {}
		}).transform('babelify', {
			presets: ['es2015']})
			.bundle()
			.on('error', function (err) {
				console.log(err);
				this.emit('end');
			})
			.pipe(vinylSourceStream('index.js'))
			.pipe(vinylBuffer())
			.pipe(gpUglify({ mangle: false }))
			.pipe(gpRename(opts.filename))
			.pipe(gpInsert.append(`console.info('BUILD DATE: ${new Date().toGMTString()}');`))
			.pipe(gulp.dest(opts.dest));
	}
	return task;
}