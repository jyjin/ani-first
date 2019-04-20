/**
 * 模块路由集合
 *    '/*'模块路由集合
 * author: jyjin
 * date:   2019.4.19
 * remark:  
 */
const { prefixRouter } = require('../../lib/routers')
const router = prefixRouter('good')
const jwtAuth = require('../../middleware/jwtAuth')
const good = require('./good')

module.exports = (app) => {
    // 添加商品
    router.post('/add', jwtAuth, good.addGood)
    router.post('/list', jwtAuth, good.getProducts)

    app.use(router.routes())
}