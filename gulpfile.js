var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
	},
	src: {
		html: 'src/*.html',
		js: 'src/scripts/main.js',
		style: 'src/styles/main.scss',
	},
	watch: {
		html: 'src/*.html',
		js: 'src/sctipts/**/*.js',
		style: 'src/styles/**/*.scss',
	},
};
gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
});
gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest(path.build.css))
});
gulp.task('js:build', function () {
	gulp.src(path.src.js)

		.pipe(gulp.dest(path.build.js))
});
gulp.task('browser-sync', function () { 
	browserSync({ 
		server: { 
			baseDir: 'src'
		},
		notify: false 
	});
});

gulp.task('watch', ['browser-sync', 'style:build'], function () {
	gulp.watch('src/styles/*.scss', ['style:build']);
	gulp.watch('src/styles/*.css', ['style:build']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/scripts/*.js', browserSync.reload);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
]);
