

/**
 * user.js
 * 用户表 
 * author jyjin
 * create at 2018.09.11
 * --------------------
 * imgs     图片地址 数组
 * name     商品名称
 * price    价格
 * type     商品类型
 * createAt 创建时间
 * updateAt 更新时间
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;

module.exports = {
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    imgs: { type: Array },
    name: { type: String, default: '' },
    price: { type: Number, default: null },
    type: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voteIds: { type: Array, default: [] },
    disvoteIds: { type: Array, default: [] },
}