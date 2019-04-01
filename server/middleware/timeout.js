const timeout = require('../config').server

module.exports = async function (ctx, next) {
    var tmr = null;
    await Promise.race([
        new Promise(function (resolve, reject) {
            tmr = setTimeout(function () {
                var e = new Error('Request timeout');
                e.status = 408;
                reject(e);
            }, timeout * 1000);
        }),
        new Promise(function (resolve, reject) {
            //使用一个闭包来执行下面的中间件
            (async function () {
                await next();
                clearTimeout(tmr);
                resolve();
            })();
        })
    ])
}

