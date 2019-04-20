const Models = require('../models')
const Good = Models.Good

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

exports.getProducts = (callback) => {
    Good.find().sort({ updateAt: -1 }).exec(callback)
}


