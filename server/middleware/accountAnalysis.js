const { isLength, isEmail, isMobilePhone } = require('validator')
const { AUTH_PARAM_MISSGING, AUTH_ACCOUNT_LENGTH_ILLEGAL, ILLEGAL_PHONE } = require('../lib/constant')

module.exports = (ctx, next) => {
    log.info('accountAnalysis:params', ctx.request.body)
    var opt = {
        phone: ctx.request.body.phone,
        password: ctx.request.body.password
    }

    // 用户名、密码不能为空
    if (!opt.phone || !opt.password) {
        ctx.body = AUTH_PARAM_MISSGING
        return
    }

    if (!isMobilePhone(opt.phone)) {
        // 手机号登录
        ctx.body = ILLEGAL_PHONE
        return;
    }
    return next()
}
