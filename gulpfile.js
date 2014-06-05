var gulp = require("gulp"),
  clean = require("gulp-clean"),
  concat = require("gulp-concat"),
  deploy = require("gulp-gh-pages"),
  markdown = require("gulp-markdown"),
  merge = require("merge-stream"),
  removeLines = require("gulp-remove-lines");

gulp.task("boba-js", function() {
  return gulp.src("./boba.js")
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("boba-browserify-js", function() {
  return gulp.src(["./boba.js", "./browserify-export.js"])
    .pipe(concat("boba-browserify.js"))
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("clean", function() {
  return merge(
    gulp.src("./gh-pages/**/*", {read: false})
      .pipe(clean()),
    gulp.src("./tmp", {read: false})
      .pipe(clean())
  );
});

gulp.task("gh-pages-readme", function() {
  return gulp.src("./README.md")
    .pipe(markdown())
    .pipe(removeLines({filters: [
      /id="boba-js"/,
      /id="contributing"/,
      /the contributing guide/
    ]}))
    .pipe(gulp.dest("./tmp"));
});

gulp.task("gh-pages-index", ["gh-pages-readme"], function() {
  return gulp.src(["./gh-pages-src/top.html", "./tmp/README.html", "./gh-pages-src/bottom.html"])
    .pipe(concat("index.html"))
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("build-js", ["boba-js", "boba-browserify-js"]);

gulp.task("default", ["clean", "build-js", "gh-pages-index"]);

gulp.task("gh-pages", ["default"], function() {
  return gulp.src("./gh-pages/**/*")
    .pipe(deploy());
});

