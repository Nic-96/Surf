const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

const env = process.env.NODE_ENV;



task("clean", () => {
    return src( `${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({stream: true}));
});

task("copy:img", () => {
    return src(`${SRC_PATH}/img/*`)
        .pipe(dest(`${DIST_PATH}/img`))
        .pipe(reload({stream: true}));
});

task("copy:svg", () => {
    return src([`${SRC_PATH}/svg/sprite.svg`, `${SRC_PATH}/svg/Mapicon.svg`, `${SRC_PATH}/svg/PlayBig.svg`])
        .pipe(dest(`${DIST_PATH}/svg`))
        .pipe(reload({stream: true}));
});

task("styles", () => {
    return src([
        ...STYLES_LIBS, `${SRC_PATH}/scss/main.scss`
    ])
        .pipe(gulpif(env == 'dev',sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env == 'dev',autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env == 'prod',gcmq()))
        .pipe(gulpif(env == 'prod',cleanCSS()))
        .pipe(gulpif(env == 'dev',sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}`));
});

task("scripts", () => {
    return src([
        ...JS_LIBS, `${SRC_PATH}/js/*.js`
    ])
        .pipe(gulpif(env == 'dev',sourcemaps.init()))
        .pipe(concat('main.min.js', {newLine: ";"}))
        .pipe(gulpif(env == 'dev',babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env == 'prod',uglify()))
        .pipe(gulpif(env == 'dev',sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({stream: true}));
})

task("icons", () => {
    return src(`${SRC_PATH}/svg/*.svg`)
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs: {
                        attrs: "(fill|stroke|style|width|height|data.*)"
                    }
                }
            ]
        })
    )
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/svg/icons`))
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task ("watch", () => {
    watch(`./${SRC_PATH}/scss/**/*.scss`, series("styles"));
    watch(`./${SRC_PATH}/*.html`, series("copy:html"));
    watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
    watch(`./${SRC_PATH}/svg/*.svg`, series("icons"));
})



task(
    "default", 
    series(
        "clean", 
        parallel("copy:html", "copy:svg", "copy:img", "styles", "scripts"),
        parallel ("watch", "server")
    )
);

task(
    "build", 
    series(
        "clean", 
        parallel("copy:html", "copy:svg", "copy:img", "styles", "scripts")
    )
);

