/**
 * 引用redux包
 * 1.利用redux自带的combineReducers插件，绑定多个reduce
 */
import { combineReducers } from 'redux';
import user from './user';
import good from './good';
import personalGood from './personalGood';
import preview from './preview';

export default combineReducers({
    user,
    good,
    personalGood,
    preview,
})