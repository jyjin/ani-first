const httpTimeout = require('../middleware/timeout')

/**
 * Error 处理器
 * author: jyjin
 * date:   2019.3.2
 * remark:
 *         1.404处理
 *         2.500处理
 *         3.错误信息收集
 */
module.exports = (app, fn) => {
    // do when error
    app.on('error', (err, ctx) => {
        log.info(`http-error:error message`, err.status + ' ' + err.message)
    });

    // 超时处理
    // app.use(httpTimeout)

    // 500 error, must at very beginning of all other routes
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            err.expose = true
            err.status = err.statusCode || err.status || 500;
            err.message = `Miss.Server has encountered some problems with [ status ${err.status} - ${err.message} ]`
            throw err;
        }
    });

    // all router methods
    fn()

    // 404 error, must at very ending of all other routes
    app.use((ctx) => {
        ctx.throw(404, 'Page not found')
        /**
         * 
         * equal to:
         * const err = new Error('Page not found 1') 
         * err.status = 404 
         * err.expose = true throw err
         * throw err
         * 
         * 
         * throw a err equal to:
         * ctx.app.emit(404, new Error('Page not found'), ctx)
         * 
         */
    })
}