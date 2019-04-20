/**
 * 控制器router模块集合
 * author: jyjin
 * date:   2019.3.2
 * remark:  
 *         可在此文件对单个模块的restful api接口单独关闭
 */
const errorHandling = require('./controller/errorHandling')
const userRoute = require('./controller/user')
const goodRoute = require('./controller/good')

module.exports = (app) => {
    errorHandling(app, () => {
        userRoute(app)
        goodRoute(app)
        // ...other module routes
    })
}