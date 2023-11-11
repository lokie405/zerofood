
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import { deleteAsync } from "del";
import { deleteSync } from "del";
// import del from "del";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
// import iconfont from "gulp-iconfont";
// import svgSprite from "gulp-svg-sprite";
import unzip from "gulp-unzip";
import rename from "gulp-rename";
import replace from "gulp-replace";
browserSync.create();

export const plugins = {
    plumber: plumber,
    notify: notify,
    deleteAsync: deleteAsync,
    deleteSync: deleteSync,
    sass: gulpSass(dartSass),
    autoprefixer: autoprefixer,
    browserSync: browserSync,
    // del: del,
    // svgSprite: svgSprite,
    // iconfont: iconfont,
    unzip: unzip,
    rename: rename,
    replace: replace,
}