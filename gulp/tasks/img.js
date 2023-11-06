
export const img = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(app.gulp.dest(app.path.dist.img));
    // app.plugins.del(app.path.dist.img)
    // return app.gulp.src(app.path.src.img, {base: './src/img/'})
    //     .pipe(app.gulp.dist(app.path.dist.img));
}