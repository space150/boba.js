var gulp = require("gulp"),
  clean = require("gulp-clean"),
  compass = require("gulp-compass"),
  concat = require("gulp-concat"),
  deploy = require("gulp-gh-pages"),
  markdown = require("gulp-markdown"),
  merge = require("merge-stream"),
  path = require("path"),
  removeLines = require("gulp-remove-lines"),
  rename = require("gulp-rename"),

  paths = {
    ghPagesIndex: [
      "./gh-pages-src/top.html",
      "./tmp/README.html",
      "./gh-pages-src/bottom.html"
    ]
  },

  watcherLogger;

gulp.task("boba-js", function() {
  return gulp.src("./boba.js")
    .pipe(removeLines({filters: [
      /module.exports/
    ]}))
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("boba-browserify-js", function() {
  return gulp.src("./boba.js")
    .pipe(removeLines({filters: [
      /window.Boba/
    ]}))
    .pipe(rename("boba-browserify.js"))
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

gulp.task("compass", function() {
  return gulp.src("./gh-pages-src/styles/**/*.scss")
    .pipe(compass({
      project: path.join(__dirname, '/'),
      css: "gh-pages",
      sass: "gh-pages-src/styles",
      style: "compressed",
      relative: true,
      comments: false
    }))
    .pipe(gulp.dest("./tmp/"));
});

gulp.task("gh-pages-index", ["gh-pages-readme"], function() {
  return gulp.src(paths.ghPagesIndex)
    .pipe(concat("index.html"))
    .pipe(gulp.dest("./gh-pages"));
});

gulp.task("build-js", ["boba-js", "boba-browserify-js"]);

gulp.task("default", ["clean", "build-js", "compass", "gh-pages-index"]);

gulp.task("gh-pages", ["default"], function() {
  return gulp.src("./gh-pages/**/*")
    .pipe(deploy());
});


watcherLogger = function watcherLogger(event) {
  console.log(
    "File " + event.path + " was " + event.type + ", running tasks..."
  );
};

gulp.task("watch", function() {
  console.log("Watching for changes...");

  gulp.watch(paths.ghPagesIndex.concat(["./README.md"]), ["gh-pages-index"])
    .on("change", watcherLogger);

  gulp.watch("./gh-pages-src/styles/**/*.scss", ["compass"])
    .on("change", watcherLogger);
})

