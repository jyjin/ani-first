

/**
 * token认证
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 解析token，将token携带信息绑定到req.user
 *
 */
const jwt = require('jsonwebtoken')
const { appTokenSecret } = require('../config').server
const { AUTH_TOKEN_ERROR, AUTH_TOKEN_EXPIRED, LOGIN_ERROR } = require('../lib/constant')
const User = require('../proxy/user')


/**
 * 拦截器演示
 * author: jyjin
 * date:   2019.3.1
 * remark:  
 *         可在此对各请求过滤预处理
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

module.exports = async (ctx, next) => {

    log.info('jwtauth:ip', getIp(ctx))
    log.info('jwtauth:path', ctx.path)

    // 定义 不用token 的api
    if (ctx.path.indexOf('/getToken') >= 0) {
        return next();
    }

    //定义 用token的api  对其验证
    var token = ctx.params.token || ctx.query.token || ctx.request.body.token || ctx.headers["token"]
    log.info('* token === ', token)

    var err = null
    var result = null
    await new Promise(resolve => {
        jwt.verify(token, appTokenSecret, function (error, decoded) {
            if (error) {
                log.info('* [ ERROR IN jwtAuth ] === ', error.name)
                // 返回错误信息
                if (error.name) {
                    if ('TokenExpiredError' === error.name) {
                        err = AUTH_TOKEN_EXPIRED
                    } else if ('JsonWebTokenError' === error.name) {
                        err = AUTH_TOKEN_ERROR
                    }
                } else {
                    err = AUTH_TOKEN_ERROR
                }
                resolve()
            } else {
                // 解析必要的数据（相应字段为定义token时的字段）
                var data = {
                    userId: decoded.userId,
                    username: decoded.username
                }
                User.queryUser_byId(data.userId, (error, res) => {
                    if (error) {
                        console.log('* query data error: ', error)
                        err = AUTH_TOKEN_ERROR
                    } else {
                        if (!res) {
                            err = LOGIN_ERROR
                        } else if (res._id.toString() === data.userId) {
                            result = res
                        } else {
                            err = AUTH_TOKEN_ERROR
                        }
                    }
                    resolve()
                }, 1)
            }
        });
    })

    if (err) {
        ctx.body = err
    } else {
        ctx.user = result;
        return next()
    }
}
