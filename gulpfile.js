const gulp = require('gulp');

const gpSize = require('gulp-size'),
	gpRunSequence = require('run-sequence'),
	gpUtil = require('gulp-util');

const del = require('del');

require('./gulp/scripts');
require('./gulp/styles');
require('./gulp/html');
require('./gulp/images');

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build-project', [], done => {
	gpRunSequence([
		'process-css',
		'process-js',
		'process-images'
	], 'process-html', () => {
		gpUtil.log(gpUtil.colors.bgGreen('Build completed.'));
		done();
	});
});


gulp.task('dev-build-project', done => {
	gpRunSequence([
		'process-css-debug',
		'process-js-debug',
		'process-images'
	], 'process-html-debug', () => {
		gpUtil.log(gpUtil.colors.bgGreen('Dev build completed.'));
		done();
	});
});

gulp.task('build', [], (done) => {
	gpRunSequence('clean', 'build-project', () => {
		done();
	});
});

gulp.task('dev', [], (done) => {
	gpRunSequence('clean', 'dev-build-project', 'watch', () => {
		done();
	});
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['process-html-debug']);
    gulp.watch('src/**/*.scss', ['process-css-and-html-debug']);
    gulp.watch('src/**/*.js', ['process-js-and-html-debug']);
});

gulp.task('default', ['dev']);
