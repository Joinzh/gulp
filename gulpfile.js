let gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat')
;
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({
    browsers: ['last 10 versions']
});
gulp.task('sleep', () => console.log('sleeping'));
gulp.task('eat', () => console.log('eating'));
gulp.task('study', ['sleep', 'eat'], () => console.log('studing'));
gulp.task('default',['clean', 'study', 'copy-html', 'watch', 'server', 'less'], () => {
    console.log('hello world');
});

gulp.task('copy-html', () => {
    return gulp.src('index.html').pipe(gulp.dest('dist/')).pipe(connect.reload());
})

gulp.task('watch',['watch-html', 'watch-less'])
gulp.task('watch-html', () => {
    return gulp.watch('index.html', ['copy-html'])
})
gulp.task('watch-less', () => {
    return gulp.watch('./src/styles/**/*.less', ['less']);
})
gulp.task('server', () => {
    connect.server({
        root: 'dist', //  服务根目录
        port: 8081, //  端口号
        livereload: true
    })
})

gulp.task('less', () => {
    return gulp.src([
        'src/styles/index.less'
    ])
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cssmin())
        .pipe(concat('bundle.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('clean', () => {
    del(['dist/*'])
})
