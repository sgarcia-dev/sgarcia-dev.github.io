'use strict';
const gulp = require('gulp');

// npm plugins
const path = require('path'),
	cssnano = require('cssnano');

// gulp plugins
const gpRunSequence = require('run-sequence'),
	gpIf = require('gulp-if'),
	gpRename = require('gulp-rename'),
	gpSass = require('gulp-sass'),
	gpPostCSS = require('gulp-postcss'),
	gpSourceMaps = require('gulp-sourcemaps'),
	gpUtil = require('gulp-util'),
	gpConnect = require('gulp-connect');

// task definitions
gulp.task('process-css', done => {
	gpUtil.log(gpUtil.colors.blue('Processing CSS...'));
	gpRunSequence(['sgarcia-css'], () => {
		gpUtil.log(gpUtil.colors.bgBlue('CSS bundled succesfully.'));
		done();
	});
});

gulp.task('process-css-debug', done => {
	gpUtil.log(gpUtil.colors.blue('Processing CSS...'));
	gpRunSequence(['sgarcia-css-debug'], () => {
		gpUtil.log(gpUtil.colors.bgBlue('[DEBUG] CSS bundled succesfully.'));
		done();
	});
});

gulp.task('process-css-and-html-debug', done => {
	gpUtil.log(gpUtil.colors.white('[DEBUG] Re-Processing CSS and HTML...'));
	gpRunSequence('process-css-debug', 'process-html-debug', done);
});

gulp.task('sgarcia-css', createSassTask({
	src: 'src/index.scss',
	dist: 'dist',
	filename: 'bundle.min.css',
	debug: false }));

gulp.task('sgarcia-css-debug', createSassTask({
	src: 'src/index.scss',
	dist: 'dist',
	filename: 'bundle.css',
	debug: true }));

function createSassTask(opts) {
	let task;
	if (opts.debug) {
		task = () => gulp.src(opts.src)
			.pipe(gpSourceMaps.init())
			.pipe(gpSass().on('error', gpSass.logError))
			.pipe(gpSourceMaps.write())
			.pipe(gpRename(opts.filename))
			.pipe(gulp.dest(opts.dist))
			.pipe(gpConnect.reload());
	} else {
		task = () => gulp.src(opts.src)
			.pipe(gpSass().on('error', gpSass.logError))
			.pipe(gpPostCSS([
				cssnano({
					//core: true,
					//discardDuplicates: true,
					//discardOverridden: true,
					//mergeLonghand: true,
					//minifyFontValues: true,
					//minifyParams: true,
					//discardComments: true,
					//mergeRules: true,
					//minifyGradients: true,
					//normalizeString: true,
					//normalizeUrl: true,
				})
			]))
			.pipe(gpRename(opts.filename))
			.pipe(gulp.dest(opts.dist))
			.pipe(gpConnect.reload());
	}
	return task;
}
