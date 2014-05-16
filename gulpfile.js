var gulp       = require('gulp');
var rename     = require("gulp-rename");
var uglify     = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');

var paths = {
    build:    'build/build.js',
    dist:     'dist',
    example:  'example'
};

gulp.task('example', function() {
    return gulp.src(paths.build)
        .pipe(rename('devtools-detect.js'))
        .pipe(gulp.dest(paths.example));
});

gulp.task('dist', function() {
    return gulp.src(paths.build)
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(rename('devtools-detect.js'))
        .pipe(gulp.dest(paths.dist));
});


gulp.task('default', ['dist']);