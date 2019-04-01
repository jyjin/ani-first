/**
 * Koa router 生成器
 * author: jyjin
 * date:   2019.3.2
 */
const Router = require('koa-router')

// default router
const router = new Router()
// prefix router  
// eg: 
//   const router = prefixROuter('users');  
//   router.get('/') => /users/ 
//   router.get('/update-password) => /users/update-password
const prefixRouter = (_prefix) => {
    return new Router({
        prefix: `/${_prefix}`
    })
}

exports = {
    router,
    prefixRouter
}

module.exports = exports