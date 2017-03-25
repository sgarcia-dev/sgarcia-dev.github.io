'use strict';
const gulp = require('gulp');

// gulp plugins
const gpUtil = require('gulp-util'),
	gpImageMin = require('gulp-imagemin'),
	gpCache = require('gulp-cache');

// task definitions
gulp.task('process-images', function() {
	gpUtil.log(gpUtil.colors.white('Processing images...'));
	return gulp.src('src/images/**/*')
		.pipe(gpCache(gpImageMin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
		})))
		.pipe(gulp.dest('dist/images'))
		.on('end', () =>
			gpUtil.log(gpUtil.colors.bgWhite('Image process complete.')));
});