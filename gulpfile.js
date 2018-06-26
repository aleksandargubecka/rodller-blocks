const gulp = require("gulp"),
    babel = require("gulp-babel"),
    paths = {
        js: {
            src: 'src/js/*.js',
            dest: 'dist/js/',
        },
    };


gulp.task("default", function(){
    gulp.watch(paths.js.src, ["babel"]);
});

gulp.task("babel", function(){
    gulp.src(paths.js.src)
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest(paths.js.dest));
});