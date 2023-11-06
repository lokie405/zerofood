
export const js = () => {
    return app.gulp.src(app.path.src.js)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "js",
                message: "Error <%= error.message %>",
            })
        ))
        .pipe(app.gulp.dest(app.path.dist.js));
}