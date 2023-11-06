
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import { deleteAsync } from "del";
import { deleteSync } from "del";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
// import iconfont from "gulp-iconfont";
// import svgSprite from "gulp-svg-sprite";
browserSync.create();

export const plugins = {
    plumber: plumber,
    notify: notify,
    deleteAsync: deleteAsync,
    deleteSync: deleteSync,
    sass: gulpSass(dartSass),
    autoprefixer: autoprefixer,
    browserSync: browserSync,
    // svgSprite: svgSprite,
    // iconfont: iconfont,
}