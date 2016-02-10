var gulp                = require('gulp'),
svgSprite               = require('gulp-svg-sprite');

var config                  = {
    svg                   : {
        xmlDeclaration    : false,
        doctypeDeclaration: false,
        rootAttributes    : {
          display         : "none"
        }
    },
    mode                  : {
        symbol            : {
          sprite          : "_svg.html.erb"
        },
        inline            : true
    }
}

gulp.task('default', function() {
  
  gulp.src('source/images/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('source/images/svg/'));

});
