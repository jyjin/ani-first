
/**
 * api控制器
 *    '/user/*'模块控制器
 * author: jyjin
 * date:   2019.3.2
 * remark:  
 */


const Good = require('../../proxy').Good
const uuid = require('uuid/v1');
var fs = require('fs');
const { pageSize: size } = require('../../config').server
const {
    DATA_GET_ERROR, DATA_SAVE_ERROR, DATA_UPDATE_ERROR, ONLINE_FAILED, AUTH_TOKEN_ERROR, LOGIN_ERROR, REQUIRE_SOME_PARAM,
    ILLEGAL_CAPTCHA
} = require('../../lib/constant')
var multiparty = require('multiparty');

const myPromise = async (fn) => {
    return new Promise(resolve => {
        fn()
        resolve()
    })
}



exports.addGood1 = async (ctx, next) => {
    let form = new multiparty.Form(
        { uploadDir: __dirname.replace('/server/controller/good', '/public/upload') }
    );
    async function loadimg() {
        await form.parse(ctx.req, function (err, fields, files) {
            if (err) { console.log(err); return; }
            console.log('fields = ', fields);//除文件外的其他附带信息
            console.log('files = ', files);//文件信息
            return;
        });
    }
    await loadimg().then(v => {
        console.log('v == ', v)
        ctx.body = { msg: "上传成功" };
    });
}

exports.addGood = async (ctx) => {
    let form = new multiparty.Form(
        { uploadDir: __dirname.replace('/server/controller/good', '/public/upload') }
    );
    let errsign = { res: -1 };

    function loadimg() {
        let send_json = {};
        return new Promise((resolve) => {
            form.parse(ctx.req, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    send_json = {
                        msg: "解析失败",
                        err: false
                    };
                    resolve(send_json);
                } else {
                    console.log("fields = ", fields);//除文件外的其他附带信息
                    console.log("files  = ", files);//文件信息
                    if (files !== undefined && files !== {}) {

                        var errFile = []
                        var sucFile = []
                        var length = 0, nullFileCount = 0;

                        for (var key in files) {
                            length++
                            var _file = files[key]
                            if (_file !== undefined && _file.length > 0) {
                                let item = _file[0]
                                let filename = item.path;
                                let filetype = item.headers['content-type'];
                                let realname = item.originalFilename;
                                console.log("filename = ", filename);
                                console.log("filetype = ", filetype);
                                console.log("realname = ", realname);
                                if (filetype.indexOf("image/") >= 0) {
                                    sucFile.push({
                                        realname: realname,
                                        fileName: filename.split('/public/upload/')[1]
                                    })
                                } else {
                                    errFile.push({
                                        realname: realname,
                                        fileName: filename.split('/public/upload/')[1]
                                    })
                                    fs.unlinkSync(filename);//删除非图片文件
                                }
                            } else {
                                nullFileCount++
                            }
                        }

                        console.log('总文件数：', length)
                        console.log('上传成功：', sucFile.length)
                        console.log('上传失败：', errFile.length)

                        if (nullFileCount === length) {
                            send_json = {
                                msg: "未上传文件",
                            };
                            resolve(send_json);
                            return;
                        }

                        if (sucFile.length) {
                            send_json = {
                                msg: "上传成功",
                                successed: sucFile,
                                failed: errFile,
                                fields
                            };
                        } else {
                            send_json = {
                                msg: "上传失败",
                                successed: sucFile,
                                failed: errFile,
                                fields
                            };
                        }
                        resolve(send_json);
                    } else {
                        send_json = {
                            msg: "未上传文件",
                        };
                        resolve(send_json);
                        return;
                    }
                }
            });
        });
    }

    var _upload = null

    await loadimg().then(upload => {
        if (!upload.successed) {
            errsign.data = upload
            ctx.body = errsign
            return;
        } else {
            _upload = upload
        }
    });

    var error = null, result = null
    await new Promise((resolve) => {
        var bean = {}
        for (var key in _upload.fields) {
            bean[key] = _upload.fields[key][0]
        }
        bean.imgs = _upload.successed
        Good.addGood(bean, (err, res) => {
            if (err || !res) {
                error = DATA_SAVE_ERROR
            } else {
                result = res
            }
            resolve()
        })
    })

    if (error) {
        ctx.body = error
    } else {
        ctx.body = {
            res: 1,
            data: result,
            upload: _upload
        }
    }
}

exports.getProducts = async (ctx) => {
    var error = null, result = null
    var opt = {
        page: ctx.request.body.page || 0,
        userId: ctx.request.body.userId,
        size: size,
    }

    log.info('getProducts:params', ctx.request.body)

    await new Promise((resolve) => {
        Good.getProducts(opt, (err, res) => {
            if (err || !res) {
                err = DATA_GET_ERROR
            } else {
                result = res
            }
            resolve()
        })
    })

    if (error) {
        ctx.body = error
    } else {
        ctx.body = {
            res: 1,
            data: result
        }
    }
    return
}