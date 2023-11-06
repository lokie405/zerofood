

export function cssParts() {
    // console.log('SERYOGGAA');
    return app.gulp.src(app.path.src.cssParts)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "CSSPARTS",
            message: "Error <%= error.message %>",
        })
    ))
    .pipe(app.plugins.sass({
        outputStyle: "expanded",
    }).on('error', app.plugins.sass.logError))
    .pipe(app.plugins.autoprefixer({
        grid: true,
        overrideBrowserlist: ["last 3 version"],
        cascade: true,
    }))
    .pipe(app.gulp.dest(app.path.dist.sass))
    .pipe(app.plugins.browserSync.stream());
}