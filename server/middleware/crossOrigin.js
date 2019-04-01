// 集中处理错误
const handler = async (ctx, next) => {
    // log request URL:
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    ctx.set("Access-Control-Max-Age", "3600");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
    ctx.set("Access-Control-Allow-Credentials", "true");
    if (ctx.request.body.method == "OPTIONS") {
        ctx.response.status = 200
    }
    console.log(`Process ${ctx.request.body.method} ${ctx.request.body.url}`);
    try {
        await next();
        console.log('handler通过')
    } catch (err) {
        console.log('handler处理错误')
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
};
module.exports = handler