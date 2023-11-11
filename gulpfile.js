



import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins,
}

import { html } from "./gulp/tasks/html.js";
import { sass } from "./gulp/tasks/sass.js";
import { css } from "./gulp/tasks/css.js";
import { js } from "./gulp/tasks/js.js";
import { clearDist } from "./gulp/tasks/clearDist.js";
import { clearImg } from "./gulp/tasks/clearImg.js";
import { server } from "./gulp/tasks/server.js";
// import { cssParts } from "./gulp/tasks/cssParts.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { img } from "./gulp/tasks/img.js";
import { icomoon } from "./gulp/tasks/icomoon.js";
// import { svgSprite } from "./gulp/tasks/svgSprite.js";

function watch() {
    gulp.watch(path.watch.zip,{events: "add"}, icomoon);  // watch only when file is added
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.sass, sass);
    gulp.watch(path.watch.css, css);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.src.fonts, fonts);
    gulp.watch(path.src.img, {delay: 1000}, gulp.series(clearImg, img));
}

gulp.task("default", gulp.series(clearDist, gulp.parallel(html, fonts, img, sass, css, js), gulp.parallel(server, watch)));

