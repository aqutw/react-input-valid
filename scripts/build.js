import webpack from 'webpack'
import webConf from '../webpack.config'
import del from 'del'
import gulp from 'gulp'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'

del.sync('dist')
webpack(webConf, (er, stats)=> {
  gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
})

