
export const icomoon = () => {  // Unzip to "zip/icomoon/" folder;
    const promise = new Promise((resolve, reject) => {
        app.gulp.src(app.path.src.zipFrom, {allowEmpty: true})
        .pipe(app.plugins.unzip())
        .pipe(app.gulp.dest(`${app.path.src.zip}/icomoon/`))
        .on("end", resolve);
    })
    .then(() => {  // Delete zip file
        app.plugins.deleteSync(app.path.src.zipFrom, {allowEmpty: true});
    })
    .then(() => { // Corrected file path
        return new Promise((resolve, reject) => {  // promise guaranty wait for ending this operation
            app.gulp.src(`${app.path.src.zip}/icomoon/style.css`)
            .pipe(app.plugins.replace("url('fonts/icomoon.","url('/fonts/icomoon."))
            .pipe(app.gulp.dest(`${app.path.src.zip}/icomoon/`))
            .on("end", resolve);

        })
    })
    .then(() => {  // Rename style.css => icomoon.css
        return new Promise((resolve, reject) => {
            app.gulp.src(`${app.path.src.zip}/icomoon/style.css`)
            .pipe(app.plugins.rename("icomoon.css", {allowEmpty: true}))
            .pipe(app.gulp.dest(app.path.dist.srcCss))
            .on("end", resolve);

        })
    })
    .then(() => {  // Replace font file from temporary to src font folder
        return new Promise((resolve, reject) => {
            app.gulp.src(`${app.path.src.zip}/icomoon/fonts/*.{eot,ttf,woff}`)
            .pipe(app.gulp.dest(app.path.dist.srcFonts))
            .on("end", resolve);
        })
    })
    .then(() => {  // Delete all temporary files
        app.plugins.deleteAsync(`${app.path.src.zip}/icomoon`, {allowEmpty: true});
    })

    return promise;
}
