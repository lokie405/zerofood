
export const XXXXXX = () => {
    return app.gulp.src(app.path.src.XXXXXX)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "XXXXXX",
                message: "Error <%= error.message %>",
            })
        ))
        .pipe(app.gulp.dest(app.path.dist.XXXXXX));
}