/**
 * app.js
 * author: jyjin
 * date:   2019.3.1
 * remark:  
 *         Server入口文件
 */
const Koa = require('koa');
const app = new Koa();
const log = require('./lib/log')
const routes = require('./routes')
const { port } = require('./config').server

// // 跨域解决方案一
var cors = require('koa-cors');
var crossOrigin = cors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": "x-requested-with,Authorization,Content-Type,Accept",
    // "allowedHeaders": "x-requested-with,Authorization,Content-Type,Accept,Referer,Origin,User-Agent",
    "credentials": true
})
app.use(crossOrigin);

// // 跨域解决方案二
// const handler = require('./middleware/crossOrigin')
// app.use(handler)

// post参数解析
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 设置静态访问目录
const root = __dirname.replace('server', 'build')
const _static = require('koa-static')
log.info('path', root)
app.use(_static(root))


routes(app)

// 根目录render build首页
const views = require('koa-views');
app.use(views(root)).use(function (ctx) {
    return ctx.render('./index.html')
})

log.info(`Listen on port ${port}...`)
app.listen(port);