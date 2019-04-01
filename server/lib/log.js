/**
 * Log4js package
 * author: jyjin
 * date:   2019.3.1
 * remark:
 *         1.调整日志级别、开关日志，请到根目录config.js中配置
 *         2.api方法:
 *           log.all()
 *           log.trace()
 *           log.debug()
 *           log.info()
 *           log.warn()
 *           log.error()
 *           log.fatal()
 *           log.mark()
 *         3.用法
 *           以上api方法用法均一致，可接受1-2个参数;
 *           一个参数时：log.XXX('module')    =>   module
 *                     log.XXX(value)       =>   value
 *           两个参数时：log.XXX('module:key',value) => [module] key => value   推荐使用
 *                     log.XXX('module',value)     => [module]     => value
 *           eg:
 *           log.all('user')                => 'user'
 *           log.all('user', 'jyjin')       => [user] =>  jyjin
 *           log.all('user:name', 'jyjin')  => [user] user   =>  jyjin
 *           
 */

const config = require('../config')
var log4js = require('log4js');
log4js.configure({
    appenders: config.log.appenders,
    categories: config.log.categories
});
var logger = log4js.getLogger(config.log.current);








// ===================================
// 总是测试设置级别不生效
// logger.levels = {
//     mark: { value: 100, colour: 'red' }
// }
// ===================================

if (!config.log.open) {
    logger.level = 'off'; // off 仅仅用于关闭日志
}
// logger.all("  Some all messages");
// logger.trace("Some trace messages");
// logger.debug("Some debug messages");
// logger.info(" Some info messages");
// logger.warn(" Some warn messages");
// logger.error("Some error messages");
// logger.fatal("Some fatal messages");
// logger.mark(" Some mark messages");

/**
 * 格式化打印 eg: [title] key => value
 */
const wraplog = (key) => {
    return (title_key, value) => {
        if (value) {
            var arr = title_key.split(':')
            if (arr.length && arr.length > 1) {
                if (typeof value === 'object') {
                    logger[key](`[${arr[0]}]\t${arr[1]}\t=>\t${JSON.stringify(value, null, 2)}`)

                } else {
                    logger[key](`[${arr[0]}]\t${arr[1]}\t=>\t${value}`)
                }
            } else {
                if (typeof value === 'object') {
                    logger[key](`[${arr[0]}]\t\t=>\t${JSON.stringify(value, null, 2)}`)
                } else {
                    logger[key](`[${arr[0]}]\t\t=>\t${value}`)
                }
            }
        } else {
            logger[key](title_key)
        }
    }
}

const mylogger = {}
mylogger.all = wraplog('all')
mylogger.trace = wraplog('trace')
mylogger.debug = wraplog('debug')
mylogger.info = wraplog('info')
mylogger.warn = wraplog('warn')
mylogger.error = wraplog('error')
mylogger.fatal = wraplog('fatal')
mylogger.mark = wraplog('mark')

global.log = mylogger  // 全局用log访问

module.exports = mylogger
