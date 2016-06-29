import gulp from 'gulp';
import uglify from 'gulp-uglify';
import pump from 'pump';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

gulp.task('build', function(){
    gulp.src('src/*.js')
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(uglify())
      .pipe(concat('avl-tree.min.js'))
      .pipe(gulp.dest('dist'))
});
