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

var getIp = (ctx) => {
    var ip = ctx.ip
    if (~ctx.ip.indexOf('::ffff:')) {
        ip = ctx.ip.replace('::ffff:', '')
    }
    if (~ctx.ip.indexOf('::1')) {
        ip = '127.0.0.1'
    }
    return ip
}

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
            // 为所有请求添加日志
            log.info('request:ip', getIp(ctx))
            log.info('request:path', ctx.path)
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

    // 404 error, must at very ending of all other routes, except default render index.html
    app.use(async (ctx, next) => {
        log.info('method', ctx.method)
        // 如果是get url查找不到，直接返回404页面
        if (ctx.method === "GET") {
            return next()
        }

        // 如果是post url查找不到, 返回404json信息

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