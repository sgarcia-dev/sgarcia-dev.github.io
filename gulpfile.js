var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    dp = {
        path: require('path'),
        del: require('del'),
        vinylSourceStream: require('vinyl-source-stream'),
        vinylBuffer: require('vinyl-buffer'),
        browserify: require('browserify'),
        watchify: require('watchify')
    },
    url = dp.path.resolve.bind(dp.path, __dirname);

gulp.task('html', function() {
    return gulp.src(url('src', '**', '*.html'))
        .pipe(gp.flatten())
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    return gulp.src(url('src', 'index.scss'))
        .pipe(gp.plumber())
        .pipe(gp.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', gp.sass.logError))
        .pipe(gp.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe(gp.sourcemaps.init())
        .pipe(gp.cssnano({safe: true, autoprefixer: false}))
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest(url('dist')));
});

gulp.task('scripts', function() {
    return dp.browserify(url('src', 'index.js'), {
        cache: {},
        packageCache: {},
        plugin: [gp.watchify]
    }).bundle()
        .on('error', function(err) { console.log(err); })
        .pipe(dp.vinylSourceStream('index.js'))
        .pipe(dp.vinylBuffer())
        .pipe(gp.sourcemaps.init())
        .pipe(gp.uglify())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(url('dist')));
});

gulp.task('images', function() {
    return gulp.src(url('src', 'images', '**', '*'))
        .pipe(gp.cache(gp.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest(url('dist', 'images')));
});

gulp.task('clean', dp.del.bind(null, ['dist']));

gulp.task('build', ['html', 'styles', 'scripts', 'images'], function() {
    return gulp.src(url('dist','**','*'))
        .pipe(gp.size({title: 'build', gzip: true}));
});

gulp.task('clean-build', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['clean-build'], function () {
    gulp.watch(url('src','**','*.html'), ['html']);
    gulp.watch(url('src','**','*.scss'), ['styles']);
    gulp.watch(url('src','**','*.js'), ['scripts']);
});

gulp.task('default', ['serve']);
