'use strict';
const gulp = require('gulp');

// npm plugins
const path = require('path'),
	del = require('del');

// gulp plugins
const gpRunSequence = require('run-sequence'),
	gpFlatten = require('gulp-flatten'),
	gpHtmlMin = require('gulp-htmlmin'),
	gpInject = require('gulp-inject'),
	gpIf = require('gulp-if'),
	gpUtil = require('gulp-util');


// task definitions
gulp.task('process-html', done => {
	gpUtil.log(gpUtil.colors.magenta('Processing HTML...'));
	gpRunSequence(['templates-html', 'main-html'], () => {
		gpUtil.log(gpUtil.colors.bgMagenta('HTML bundled succesfully.'));
		done();
	});
});

gulp.task('process-html-debug', done => {
	gpUtil.log(gpUtil.colors.magenta('Processing HTML...'));
	gpRunSequence(['templates-html-debug', 'main-html-debug'], () => {
		gpUtil.log(gpUtil.colors.bgMagenta('[DEBUG] HTML bundled succesfully.'));
		done();
	});
});

gulp.task('templates-html', createHtmlTask({
	taskName: 'templates-html',
	src: ['src/**/*.html', '!src/index.html'],
	dist: 'dist',
	debug: false,
	flatten: true
}));

gulp.task('templates-html-debug', createHtmlTask({
	taskName: 'templates-html-debug',
	src: ['src/**/*.html', '!src/index.html'],
	dist: 'dist',
	debug: true,
	flatten: true
}));

gulp.task('main-html', createHtmlTask({
	taskName: 'main-html',
	src: 'src/index.html',
	dist: './',
	debug: false,
	flatten: false,
	inject: ['dist/bundle.min.css', 'dist/bundle.min.js']
}));

gulp.task('main-html-debug', createHtmlTask({
	taskName: 'main-html-debug',
	src: 'src/**/*.html',
	dist: './',
	debug: true,
	flatten: false,
	inject: ['dist/bundle.css', 'dist/bundle.js']
}));

function createHtmlTask(opts) {
	opts.inject = opts.inject || [];

	return () => {
		//uncomment for debugging purposes
		//gpUtil.log(`Processing Task: ${JSON.stringify(opts)}`);
		const injectFiles = gulp.src(opts.inject, {read: false});
		return gulp.src(opts.src)
			.pipe(gpInject(injectFiles, {addRootSlash: false}))
			.pipe(gpIf(!opts.debug,
				gpHtmlMin({
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true, // Only if you don't use comment directives!
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true
				})
			)).pipe(gpIf(opts.flatten,
			gpFlatten()
		)).pipe(gulp.dest(opts.dist));
	};
}