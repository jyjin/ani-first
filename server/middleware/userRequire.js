
const { isEmail, isMobilePhone, isLength } = require('validator')
const { REQUIRE_SOME_PARAM, ILLEGAL_LENGTH_BETWEEN, ILLEGAL_EMAIL, ILLEGAL_PHONE, ILLEGAL_PASSWORD, DATA_ADD_ERROR, SOME_EXIST } = require('../lib/constant')
const User = require('../proxy/user')
const { auto } = require('async')
module.exports = async (ctx, next) => {
    log.info(`userRequire:params`, ctx.request.body)
    let opt = {
        phone: ctx.request.body.phone,
        password: ctx.request.body.password,
        confirm: ctx.request.body.confirm,
        captcha: ctx.request.body.captcha,
    }

    // 手机号必填
    if (!opt.phone) {
        ctx.body = REQUIRE_SOME_PARAM('phone')
        return
    }

    // 手机号校验
    if (!isMobilePhone(opt.phone)) {
        ctx.body = ILLEGAL_PHONE
        return
    }

    // 用户名必填
    if (!opt.username) {
        opt.username = opt.phone
    }

    // 密码必填
    if (!opt.password) {
        ctx.body = REQUIRE_SOME_PARAM('password')
        return
    }

    // 验证密码必填
    if (!opt.confirm) {
        ctx.body = REQUIRE_SOME_PARAM('confirm password')
        return
    }

    if (opt.password !== opt.confirm) {
        ctx.body = REQUIRE_SOME_PARAM('confirm password')
        return
    }

    var err = null;
    var result = null
    await new Promise(resolve => {
        auto({
            usernameCounts: (cb) => {
                User.getUserCounts_byUsername(opt.username, cb)
            },
            phoneCounts: (cb) => {
                User.getUserCounts_byPhone(opt.phone, cb)
            }
        }, (error, res) => {
            if (error) {
                console.log(`* Query data error: `, error)
                err = DATA_ADD_ERROR
            }

            // 用户名已存在
            if (res.usernameCounts > 0) {
                err = SOME_EXIST('username')
            }

            // 手机号已存在
            if (res.phoneCounts > 0) {
                err = SOME_EXIST('phone')
            }

            result = res
            resolve()
        })
    })

    if(err){
        ctx.body = err;
    }else{
        return next()
    }
}