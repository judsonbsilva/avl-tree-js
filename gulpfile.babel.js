import gulp from 'gulp';
import uglify from 'gulp-uglify';
import pump from 'pump';

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
