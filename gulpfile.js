var gulp = require("gulp"),
  clean = require("gulp-clean"),
  concat = require("gulp-concat"),
  deploy = require("gulp-gh-pages");

gulp.task("bobaJs", function() {
  return gulp.src("./boba.js")
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("bobaBrowserifyJs", function() {
  return gulp.src(["./boba.js", "./browserify-export.js"])
    .pipe(concat("boba-browserify.js"))
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("clean", function() {
  return gulp.src("./gh-pages", {read: false})
    .pipe(clean());
});

gulp.task("ghPages", function() {
  return gulp.src("./gh-pages/**/*")
    .pipe(deploy());
});

gulp.task("buildJs", ["bobaJs", "bobaBrowserifyJs"]);

gulp.task("default", ["clean", "buildJs"]);

