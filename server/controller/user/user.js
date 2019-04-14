
/**
 * api控制器
 *    '/user/*'模块控制器
 * author: jyjin
 * date:   2019.3.2
 * remark:  
 */


const User = require('../../proxy').User
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { expiresIn, appTokenSecret } = require('../../config').server
const uuid = require('uuid/v1');
const {
    DATA_GET_ERROR, DATA_SAVE_ERROR, DATA_UPDATE_ERROR, ONLINE_FAILED, AUTH_TOKEN_ERROR, LOGIN_ERROR, REQUIRE_SOME_PARAM,
    ILLEGAL_CAPTCHA
} = require('../../lib/constant')
const async = require('async')

// json接口
exports.getUser = async (ctx, next) => {
    ctx.body = {
        res: 1,
        data: {
            name: 'jyjin',
            age: 18
        }
    }
}

exports.test = async (ctx, next) => {
    ctx.body = { res: 1, test: 'success' }
}

exports.testPost = async (ctx, next) => {
    console.log('ctx == ', ctx.method, ctx.request.body)
    ctx.body = { res: 1, data: 1 }
}

// 测试异常捕捉
exports.testError = async (ctx, next) => {
    throw new Error('Some error occured');
}

// text接口
exports.resetPassword = (ctx, next) => {
    ctx.body = 'this is reset password page'
}










const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
}

exports.authByToken = (ctx, next) => {
    ctx.body = {
        res: 1,
        data: {
            user: ctx.user
        }
    }
}

// 用户注册
exports.addUser = async (ctx, next) => {

    let opt = {
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        phone: ctx.request.body.phone,
        captcha: ctx.request.body.captcha
    }

    // 验证码
    if (opt.captcha !== '0312') {
        ctx.body = ILLEGAL_CAPTCHA
        return;
    }

    var err = null, result = null;

    await new Promise(resolve => {
        User.addUser(opt, (err, res) => {

            if (err || !res) {
                console.log(`* ERROR IN [ addUser ]: `, err)
                err = {
                    res: -1,
                    message: 'Save data error'
                }
            } else {
                result = {
                    res: 1,
                    data: {
                        token: getToken({
                            userId: res._id,
                            username: res.username
                        }),
                        user: res
                    }
                }
            }
            resolve()
        })
    })

    if (err) {
        ctx.body = err
        return;
    } else {
        log.info('add success')
        ctx.body = result
        return;
    }


}

exports.signIn = async (ctx, next) => {
    log.info('signIn:params', ctx.request.body)
    var opt = {
        phone: ctx.request.body.phone,
        password: ctx.request.body.password,
    }

    var err = null
    var result = null

    await new Promise(resolve => {
        User.queryUser_byPhone(opt.phone, (error, res) => {

            if (error) {
                log.info('signIn:error', error)
                err = DATA_GET_ERROR;
            } else if (!res) {
                err = LOGIN_ERROR;
            } else if (res.password === opt.password) {
                result = {
                    res: 1,
                    data: {
                        token: getToken({
                            userId: res._id,
                            username: res.username
                        }),
                        user: res
                    }
                }
            } else {
                err = LOGIN_ERROR
            }
            resolve()
        }, 1)

    })

    const sleep = (count) => new Promise(resolve => {
        setTimeout(resolve, count);
    });

    // await sleep(6000);

    if (err) {
        ctx.body = err
        return
    } else {
        ctx.body = result
        return
    }
}

exports.queryUserByUsername = (ctx, next) => {
    var opt = {
        username: ctx.params.username
    }

    User.queryUser_byUsername(opt.username, (err, result) => {
        if (err || !result) {
            console.log(`* Query data error: `, err)
            ctx.body = DATA_GET_ERROR
            return
        }

        ctx.body = {
            res: 1,
            data: result
        }
    })
}


/**
 * 模拟高并发处理
 */
var queryQueue = [];  // 并发请求等待队列
var userList = null;  // 请求结果缓存
var timestamp = null; // 时间戳
const EventEmitter = require('events');
const PUB = new EventEmitter();


// 查询DB处理
PUB.on('queryUserList', (eventData) => {

    log.info('请求触发事件')
    const queryDB = () => {
        log.info('开始查询DB...')
        User.queryUserList((error, result) => {
            timestamp = Number(new Date())
            if (error || !result) {
                userList = null
                log.info('DB查询失败...')

                queryQueue.map(item => {
                    PUB.emit(`queryEnd_${item.key}`, { res: -1, key: item.key, msg: 'DB查询失败' })
                })
            } else {
                log.info('DB查询成功并结束')
                userList = result
                queryQueue.map(item => {
                    PUB.emit(`queryEnd_${item.key}`, { res: 1, key: item.key, msg: '超过1s,DB查询成功并返回' })
                })
            }
        })
    }

    if (!userList) {
        log.info('没有缓存查询DB')
        userList = null
        queryDB()
    } else {
        if (timestamp && eventData.timestamp - timestamp > 1000) {
            log.info('超过1s查询DB')
            userList = null
            queryDB()
        } else {
            log.info('1s内请求直接返回缓存')
            queryQueue.map(item => {
                PUB.emit(`queryEnd_${item.key}`, { res: 1, key: item.key, msg: '超过1s查询DB成功返回' })
            })
        }
    }


})

exports.queryUserList = async (ctx, next) => {

    var err = null
    var msg = null

    // 当前请求待处理对象
    var queryObj = {
        key: uuid(),
        timestamp: Number(new Date())
    }

    // 1s内的请求 如果有缓存 直接返回缓存数据
    if (userList && timestamp && queryObj.timestamp - timestamp < 1000) {
        log.info('queryUserList:1s内请求直接返回缓存')
        ctx.body = {
            res: 1,
            data: userList,
            msg: 'queryUserList:1s内请求直接返回缓存'
        }
        return
    }

    // 第一次请求 以及 超过1s内查询过数据的请求，加入队列并发送指令查询数据
    queryQueue.push(queryObj)
    PUB.emit('queryUserList', queryObj)

    await new Promise(resolve => {
        PUB.on(`queryEnd_${queryObj.key}`, eventData => {

            // 核心：使用setImmediate将处理结果加入事件队列堆栈处理，不影响后续请求进来
            setImmediate(() => {
                if (eventData.res < 0) {
                    err = eventData.error
                }
                msg = eventData.msg
                queryQueue.splice(queryQueue.findIndex(item => item.key === eventData.key), 1)
                console.log(queryQueue)
                resolve()
            })
        })
    })

    if (err) {
        ctx.body = {
            res: -1,
            message: 'Query data error',
            msg
        }
    } else {
        ctx.body = {
            res: 1,
            data: userList,
            msg
        }
    }
    return
}

let setUserStatus = (id, status, callback) => {
    User.queryUser_byId(id, (err, result) => {
        if (err) {
            return callback(err)
        }
        result.status = status
        result.save(callback)
    })
}

let setUserStatusCallback = (ctx, err, result) => {
    if (err) {
        ctx.body = DATA_UPDATE_ERROR
        return
    }
    ctx.body = {
        res: 1,
        data: result
    }
}

exports.online = (ctx, next) => {
    var id = ctx.request.body.id
    if (!id) {
        ctx.body = REQUIRE_SOME_PARAM('id')
        return
    }
    setUserStatus(id, 1, (err, result) => setUserStatusCallback(ctx, err, result))
}

exports.offline = (ctx, next) => {
    var id = ctx.request.body.id
    if (!id) {
        ctx.body = REQUIRE_SOME_PARAM('id')
        return
    }
    setUserStatus(id, 0, (err, result) => setUserStatusCallback(ctx, err, result))
}

exports.chatHangup = (id, callback) => {

    if (!id) {
        return callback(-1)
    }

    async.auto({
        emitUser: (cb) => {
            User.queryUser_byId(id, (err, result) => {
                if (err) {
                    return cb(err)
                }
                var { receiveUserId: tempId } = result
                result.receiveUserId = null
                result.save((errSave, resultSave) => {
                    console.log(resultSave)
                    if (errSave) {
                        return cb(errSave)
                    }
                    return cb(null, tempId)
                })
            })
        },
        receiveUser: ['emitUser', (result, cb) => {
            console.log('== ', result.emitUser)
            var receiveUserId = result.emitUser
            if (receiveUserId) {
                User.queryUser_byId(receiveUserId, (errRcUser, resultRcUser) => {
                    if (errRcUser) {
                        return cb(errRcUser)
                    }
                    resultRcUser.receiveUserId = null
                    resultRcUser.save((err, resultSave) => {
                        if (err) {
                            return cb(err)
                        }
                        console.log(resultSave)
                        return cb(null, resultSave)
                    })
                })
            } else {
                cb(null, null)
            }
        }]
    }, (err, result) => {
        if (err) {
            return callback(-1)
        }
        return callback(null, result)
    })

}