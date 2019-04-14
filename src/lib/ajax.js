/**
 * Http 请求组件
 * 
 * author:  jyjin
 * date  :   create at 2018.08.10
 * remark:
 *          解析api数据格式的接口，封装成promise调用
 */

const { auto } = require('async')
const { cloneDeep, has } = require('lodash')
const axios = require('axios')
const config = require('./config')

const promisify = (fn, model) => {
    return function () {                                              // 这里只能用function不能用箭头函数
        return new Promise((resolve, reject) => {
            fn.apply(model, [].concat(arguments[0], [(err, result) => {
                return err ? reject(err) : resolve(result)
            }], arguments[1]))
        })
    }

}

const AJAX = (options, callback) => {
    let token = localStorage.getItem('ANF_TOKEN') || ''

    let _config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            token
        },
        timeout: config.timeout,
        baseURL: config.siteUrl,
        responseType: 'json',
        method: options.method,
        url: options.url,
        params: options.query,                                  //?name=XXX&age=XXX
        data: options.data,                                     //post json object
        onUploadProgress: function (progressEvent) {

        },
        onDownloadProgress: function (processEvent) {

        },
        maxContentLength: 2000,

    }
    options = Object.assign({}, _config)

    axios
        .request(options)
        .then(function (response) {
            if (response.status != 200) {
                console.log(`[ Http request failed ]`)
                return callback(` Http request failed `)
            }
            callback(null, response.data)
        }).catch(function (error) {
            if (error.response) {
                console.log(`[ Http response error ]`);
                console.log(`[ - data ]`, error.response.data);
                console.log(`[ - status ]`, error.response.status);
                console.log(`[ - headers ]`, error.response.headers);
                callback(`Http response error`)
            } else if (error.request) {
                console.log(`[ Http request error ]`);
                console.log(`[ - request ]`, error.request);
                callback(` Http request error `)
            } else {
                console.log(`[ Http error  ]`);
                console.log(`[ - message ]`, error.message);
                callback(` Http error `)
            }
        });
}

const AJAX_FETCH = (options, callback) => {
    let token = localStorage.getItem('ANF_TOKEN') || ''

    let _config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            token
        },
        method: options.method,
        url: config.siteUrl + options.url,
        params: options.query,                                  //?name=XXX&age=XXX
        data: options.data,                                     //post json object
    }
    options = Object.assign({}, _config)

    /**
    * 将对象转成 a=1&b=2的形式
    * @param obj 对象
    */
    function obj2String(obj, arr = [], idx = 0) {
        for (let item in obj) {
            arr[idx++] = [item, obj[item]]
        }
        return new URLSearchParams(arr).toString()
    }

    let initObj = {}
    if (options.method === 'GET') { // 如果是GET请求，拼接url
        if (options.params) {
            options.params.token = token
        } else {
            options.params = { token }
        }
        const searchStr = obj2String(options.params)
        options.url += '?' + searchStr
        initObj = {
            method: options.method,
            credentials: 'include',
            mode: 'cors',
        }
    } else {
        initObj = {
            method: options.method,
            credentials: 'include',
            mode: 'cors',
            headers: new Headers(options.headers),
            body: obj2String(options.data)
        }
    }

    console.log('send fetch request... ')
    fetch(options.url, initObj).then((res) => {

        return res.json() // 读取流 并将流转json 然后通过promise返回。注意：这个流只能读一次

    }).then((json) => {

        callback(null, json) // 返回json数据

    }).catch(function (error) {
        if (error.response) {
            console.log(`[ Http response error ]`);
            console.log(`[ - data ]`, error.response.data);
            console.log(`[ - status ]`, error.response.status);
            console.log(`[ - headers ]`, error.response.headers);
            callback(`Http response error`)
        } else if (error.request) {
            console.log(`[ Http request error ]`);
            console.log(`[ - request ]`, error.request);
            callback(` Http request error `)
        } else {
            console.log(`[ Http error  ]`);
            console.log(`[ - message ]`, error.message);
            callback(` Http error `)
        }
    })
}

const init = (API) => {

    var model = {}
    API.map(fun => {
        model[fun.name] = (data, callback, query) => {
            auto({
                request: (cb) => {

                    var _cloneData = cloneDeep(data)
                    var lackField = false
                    if (~fun.url.indexOf(':') || ~fun.url.indexOf('：')) {
                        fun.url = fun.url.replace(/:([A-Za-z_\$][A-Za-z0-9_\$]*)/g, function (match, field) {
                            if (has(_cloneData, field)) {
                                return data[field];
                            } else {
                                lackField = true;
                                return 'undefined';
                            }
                        });

                        if (lackField) {
                            return cb('lack necessary Params');
                        }
                    }

                    var options = {
                        url: fun.url,
                        method: fun.isPost ? 'POST' : 'GET',
                        data: data,
                        query: query,
                    }
                    // AJAX(options, cb)
                    AJAX_FETCH(options, cb)
                }
            }, (err, result) => {
                callback(err, result.request)
            })
        }
    })

    Object.getOwnPropertyNames(model).map(funName => {
        model[funName] = promisify(model[funName], model)
    })

    return model
}

module.exports = init