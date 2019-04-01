/**
 * 引用redux包
 * 1.创建store
 *   创建方法 createStore
 *
 * 2.构建reducer
 * 
 * 3.引入一些插件
 *   引入方法 applyMiddleware, 引入有顺序要求，logger必须放后面
 *   thunk: 修改action的参数格式，默认接受对象，使用此插件可接受方法
 *   logger: 日志组件
 * 
 * 总结:
 *    - store是唯一的
 *    - 只有store才能改变自己的内容（state）
 *    - reducer必须是纯函数
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './reducer'

const logger = createLogger();

export default createStore(
    rootReducer,

    // //如果安装了redeux devtools扩展这个工具（谷歌商店里下载），
    // //则在控制台里使用这个方法（为了调试redux）
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // window.__REDUX_DEVTOOLS_EXTENSION__(),

    applyMiddleware(thunk, logger)
)