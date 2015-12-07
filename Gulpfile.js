var gulp = require('gulp'),
	concat = require('gulp-concat'),
	react = require('gulp-react'),
	babel = require('gulp-babel'),
	watch = require('gulp-watch');
 
gulp.task('default', function () {
	return gulp.src('client/src/entry.jsx')
	.pipe(react())
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('client/dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});
