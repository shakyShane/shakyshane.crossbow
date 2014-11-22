var gulp         = require("gulp");
var coderBlog    = require("/Users/shakyshane/code/crossbow.js/plugins/blog.js");
var browserSync  = require("browser-sync");
var htmlInjector = require("bs-html-injector");
var sass         = require("gulp-sass");
var prefix       = require("gulp-autoprefixer");
var minifyCSS    = require("gulp-minify-css");
var plumber      = require('gulp-plumber');


gulp.task("sass", function () {
    return gulp.src(["app/_scss/**/*.scss"])
        .pipe(sass())
        .on("error", function (err) {
            console.log(err.message);
            browserSync.notify(err.message, 5000);
        })
        .pipe(prefix(["last 5 versions", "> 1%", "ie 8"], { cascade: true }))
        .pipe(gulp.dest("app/css"));
});

/**
 * Start BrowserSync
 */
gulp.task("browserSync", function () {
    browserSync.use(htmlInjector, {
        excludedTags: ["BODY"],
        logLevel: "debug"
    });
    browserSync({
        server: {
            baseDir: "_site",
            routes: {
                "/img": "./app/img",
                "/css": "./app/css",
                "/fonts": "./app/fonts"
            }
        },
        logLevel: "silent",
        files: "app/css/main.css",
        logPrefix: function () {
            return this.compile("{magenta:[Crossbow] ");
        },
        open: false,
        online: false
    });
});

var blogconfig = {
    env: "dev",
    highlight: true,
    markdown: true,
    logLevel: "debug",
    postUrlFormat: "/posts/:title",
    prettyUrls: true,
    //prettyMarkup: false,
    cwd: "app"
};

/**
 * Default task
 */
gulp.task("build-blog", function () {

    return gulp.src([
        "app/**/*.html",
        "app/*.md",
        "app/_posts/*.{md,markdown}"
    ])
        .pipe(coderBlog(blogconfig))
        .pipe(gulp.dest("_site"));
});

gulp.task("watch", function () {
    gulp.watch(["app/_scss/**/*.scss", "app/fonts/**/*.scss"], ["sass"]);
    gulp.watch(["app/**/*"], function (file) {
        //console.log("File changed: " + file.path);
        return gulp.src(file.path)
            .pipe(coderBlog(blogconfig))
            .pipe(gulp.dest("_site"))
            .on("end", function () {
                //browserSync.reload();
                htmlInjector();
            }).on("error", function () {
                console.log("ERROR");
            })
    });
});

gulp.task("default", ["build-blog", "browserSync", "watch"]);