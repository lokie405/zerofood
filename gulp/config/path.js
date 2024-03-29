
const src = "./src";
const dist = "./dist";

export const path = {
    src: {
        html: `${src}/html/*.html`,
        sass: `${src}/scss/**/style.{sass,scss}`,
        css: `${src}/css/**/*.css`,
        // cssParts: `${src}/scss/parts/fonts.{sass,scss}`,
        js: `${src}/js/**/*.js`,
        fonts: `${src}/fonts/**/*.{ttf,woff,woff2,svg,eot}`,
        img: `${src}/img/**/*.{jpg,jpeg,svg,ico,png,webp,gif,jfif}`,
        svgSprite: `${src}/fonts/svg/*.svg`,
        zipFrom: `${src}/zip/*.zip`,
        // zipTo: `${src}/zip/`,
        zip: `${src}/zip`,
        php: `${src}/php/*.php`,
    },
    dist: {
        html: `${dist}/`,
        sass: `${dist}/css/`,
        css: `${dist}/css/`,
        js: `${dist}/js/`,
        fonts: `${dist}/fonts/`,
        img: `${dist}/img`,
        svgSprite: `${dist}/fonts/`,
        srcCss: `${src}/css/`,
        srcFonts: `${src}/fonts/`,
        php: `${dist}/php/`,
        // distAll: `${dist}/**/*.*`,

    },
    watch: {
        html: `${src}/html/*.html`,
        sass: `${src}/scss/**/*.{scss,sass}`,
        css: `${src}/css/**/*.css`,
        js: `${src}/js/**/*.js`,
        zip: `${src}/zip/*.zip`,
        php: `${src}/php/*.php`,
    },
    admin: {
        htmlFolder: `${src}/html/`,
        adminFile: `${src}/admin/load.js`,
    },
    clearDist: `${dist}/**/*.*`,
    exceptionFile: `!${dist}/files/**/*.*`,
    srcFolder: src,
}