/**
 * 模块路由集合
 *    '/*'模块路由集合
 * author: jyjin
 * date:   2019.3.2
 * remark:  
 */
const { prefixRouter } = require('../../lib/routers')
const router = prefixRouter('user')
const jwtAuth = require('../../middleware/jwtAuth')
const accountAnalysis = require('../../middleware/accountAnalysis')
const userRequire = require('../../middleware/userRequire')
const user = require('./user')

module.exports = (app) => {

    router.get('/test', async (ctx, next) => {
        log.info('params', ctx.params)
        log.info('query', ctx.query)
        return ctx.body = ' hello'
    })

    router.get('/test/:name', async (ctx, next) => {
        log.info('params', ctx.params)
        log.info('query', ctx.query)
        return ctx.body = ' hello'
    })

    router.post('/test/post', async (ctx, next) => {
        log.info('body', ctx.request.body)
        ctx.body = {
            res: 1,
            data: 'post data success'
        }
    })

    // 用户注册
    router.post('/register', userRequire, user.addUser)
    // 用户登录
    router.post('/signIn', accountAnalysis, user.signIn)
    // token认证
    router.get('/authByToken/:token', jwtAuth, user.authByToken);
    // 查询用户 根据用户名
    router.get('/getUser/:username', jwtAuth, user.queryUserByUsername);
    // 查询用户列表
    router.use('/queryUserList', jwtAuth, user.queryUserList)
    // 上线
    router.use('/online', jwtAuth, user.online)
    // 下线
    router.use('/offline', jwtAuth, user.offline)

    app.use(router.routes())
}