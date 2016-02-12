var gulp                = require('gulp'),
svgSprite               = require('gulp-svg-sprite');

var config                  = {
    shape                   : {
        dimension           : {
          maxWidth          : 50,
          maxHeight         : 50
        },
        spacing             : {
          padding           : 0,
          box               : 'icon'
        }
    },
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
