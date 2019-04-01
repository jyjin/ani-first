/**
 * Server配置文件
 * author: jyjin
 * date:   2019.3.1
 * remark:  
 *         Server配置
 *         日志配置
 *         ...
 */
module.exports = {
    /**
     * 服务器配置
     */
    server: {
        // 端口
        port: 3000,
        expiresIn: 60 * 3600 * 2,                   // token过期时长（秒/s）
        appTokenSecret: 'jyjinsavetheworld',        // token验证密匙
        httpTimeout: 5,                             // http请求超时时间（秒/s）
    },
    /**
     * 日志配置
     *     优先级：ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
     */
    log: {
        // 日志开关
        open: true,
        // 定义日志类型
        appenders: {
            water: { type: 'file', filename: './logs/water.log' },
            date: { type: 'dateFile', filename: './logs/date.log', patten: '.mm' },
            cheese: { type: 'stderr', filename: './logs/cheese.log' },
            fruit: { type: 'stdout', filename: './logs/fruit.log' },
            juice: { type: 'console' }
        },
        // 设置日志组合
        categories: {
            default: { appenders: ['water'], level: 'all' },
            date: { appenders: ['date'], level: 'debug' },
            cheese: { appenders: ['cheese'], level: 'error' },
            fruit: { appenders: ['fruit'], level: 'warn' },
            multi: { appenders: ['fruit', 'cheese'], level: 'trace' },
            dev: { appenders: ['juice'], level: 'info' }
        },
        // 当前启用的日志 可选值： ''='default'/'test'/'jyjin'
        current: 'dev',
    }
}