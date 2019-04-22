const Models = require('../models')
const Good = Models.Good
const { pageSize } = require('../config').server

// 添加用户
exports.addGood = (bean, callback) => {
    var good = new Good()
    for (var key in bean) {
        good[key] = bean[key]
    }
    good.save((err, result) => {
        if (err) return callback(err)
        callback(null, result)
    })
}

exports.getProducts = (opt, callback) => {
    var page = opt.page || 1
    var size = opt.size || pageSize
    var query = {}
    if (opt.userId) {
        query.userId = opt.userId
    }
    Good.find(query).skip((page - 1) * size).limit(size).sort({ updateAt: -1 }).exec(callback)
}


