const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {db} = require('../config')
const TestSchema = require('./test')
const UserSchema = require('./user')
const GoodSchema = require('./good')

mongoose.connect(`mongodb://${db}`,(err)=>{
    if(err){
        console.log(`* Connect DATABASE error, error: `, err)
        process.exit(1);
    }else{
        console.log(`* Connect database success !`)
    }
});

exports.Test = mongoose.model('Test', new Schema(TestSchema));
exports.User = mongoose.model('User', new Schema(UserSchema));
exports.Good = mongoose.model('Good', new Schema(GoodSchema));


