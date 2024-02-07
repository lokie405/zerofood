
export const clearDist = function() {
    return app.plugins.deleteAsync([app.path.clearDist, app.path.exceptionFile]);
}