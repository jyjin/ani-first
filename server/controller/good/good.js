
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
const { setErr, setData, setRes } = require('../../lib/util')

// // 测试上传
// exports.addGood1 = async (ctx, next) => {
//     let form = new multiparty.Form(
//         { uploadDir: __dirname.replace('/server/controller/good', '/public/upload') }
//     );
//     async function loadimg() {
//         await form.parse(ctx.req, function (err, fields, files) {
//             if (err) { console.log(err); return; }
//             console.log('fields = ', fields);//除文件外的其他附带信息
//             console.log('files = ', files);//文件信息
//             return;
//         });
//     }
//     await loadimg().then(v => {
//         console.log('v == ', v)
//         ctx.body = { msg: "上传成功" };
//     });
// }

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

    var saveResult = await new Promise((resolve) => {
        var bean = {}
        for (var key in _upload.fields) {
            bean[key] = _upload.fields[key][0]
        }
        bean.imgs = _upload.successed
        Good.addGood(bean, (err, res) => {
            if (err || !res) {
                resolve(setErr(DATA_SAVE_ERROR))
            } else {
                resolve(setData(res))
            }
        })
    })

    if (saveResult.err) {
        ctx.body = saveResult.err
    } else {
        ctx.body = {
            res: 1,
            data: saveResult.data,
            upload: _upload
        }
    }
}

exports.getProducts = async (ctx) => {
    var opt = {
        page: ctx.request.body.page || 0,
        userId: ctx.request.body.userId,
        size: size,
    }

    log.info('getProducts:params', ctx.request.body)

    var queryResult = await new Promise((resolve) => {
        Good.getProducts(opt, (err, res) => {
            if (err || !res) {
                resolve(setErr(DATA_GET_ERROR))
            } else {
                resolve(setData(res))
            }
        })
    })

    ctx.body = setRes(queryResult)
    return
}



const votingAction = async (ctx, type) => {

    var opt = {
        goodId: ctx.request.body.goodId,
        userId: ctx.request.body.userId,
    }

    if (!opt.goodId || !opt.userId) {
        ctx.body = REQUIRE_SOME_PARAM('goodId,userId')
        return
    }

    // 设定需要操作的字段值
    var voting = 'voteIds'
    var disvoting = 'disvoteIds'
    if (type === 'disvote') {
        var t = voting
        voting = disvoting
        disvoting = t
    }

    // 查询商品
    var queryResult = await new Promise(resolve => {
        Good.queryGoodById(opt.goodId, (err, res) => {
            if (err || !res) {
                resolve(setErr(DATA_GET_ERROR))
                return;
            } else {
                resolve(setData(res))
                return
            }
        })
    })


    // 查询错误直接返回
    if (queryResult.err) {
        ctx.body = queryResult.err
        return
    }

    var good = queryResult.data

    !good[voting] && (good[voting] = [])
    !good[disvoting] && (good[disvoting] = [])

    var index = good[voting].indexOf(opt.userId)
    good.markModified(voting)
    good.markModified(disvoting)

    // 进行点赞处理
    if (~index) {
        // 已经点赞过 直接取消赞
        good[voting].splice(index, 1)
    } else {
        // 还没点赞过 添加赞 如果有反对赞 取消该用户反对赞
        good[voting].push(opt.userId)
        var disvotingIndex = good[disvoting].indexOf(opt.userId)
        if (~disvotingIndex) {
            good[disvoting].splice(disvotingIndex, 1)
        }
    }

    // 保存点赞
    var saveResult = await new Promise(resolve => {
        good.save(err => {
            if (err) {
                resolve(setErr(DATA_SAVE_ERROR))
            } else {
                resolve(setData(good))
            }
        })
    })

    ctx.body = setRes(saveResult)
}

exports.vote = async (ctx, next) => votingAction(ctx, 'vote')

exports.disvote = async (ctx, next) => votingAction(ctx, 'disvote')