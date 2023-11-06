
export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error <%= error.message %>",
            })
        ))
        .pipe(app.gulp.dest(app.path.dist.html))
        .pipe(app.plugins.browserSync.stream());
}