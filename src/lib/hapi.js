/*********************************************************************************************
 * 后端接口定义组件
 * 
 * author:  jyjin
 * date  :  create at 2018.08.10
 * remark:
 *          定义后端服务接口地址，接口请求类型
 *          调用方式： api.name(data,query).then(json=>...)
 *          参数详解：
 *          name：[STRING]  配置的方法name,不可重名
 *          data: [JSON]    1.post发送的参数; 2.rest风格的参数;
 *                如:       url:'/getUser/:name'                   
 *                          data:{name: 'tom'}
 *                          ==>
 *                          /getUser/tom
 *          query:[JSON]    url的query参数    
 *                如：      url:/getUserList                       
 *                          query:{pageNum: 1, pageCount: 10}
 *                          ==>             
 *                          /getUserList?pageNum=1&pageCount=10
 * 
 **********************************************************************************************/

const AJAX = require('./ajax')

const API = [
    {
        name: `test`,
        url: `/user/test`
    },{                                       // 登录           
        name: `signIn`,
        url: `/user/signIn`,
        isPost: true
    },
    {                                       // 登出           
        name: `signOut`,
        url: `/user/offline`,
        isPost: true
    },
    {                                       // 添加用户
        name: `register`,
        url: `/user/register`,
        isPost: true
    },
    {                                       // 查询用户列表
        name: `queryUserList`,
        url: `/user/queryUserList`,
    },
    {                                       // token认证
        name: `authByToken`,
        url: `/user/authByToken/:token`,
    },
    {                                       // 挂断
        name: `hangupFriends`,
        url: `/user/chatHangup`,
        isPost: true
    },
    {                                       // 重新匹配
        name: `changeFriends`,
        url: `/user/chatSwitch`,
        isPost: true
    },{
        name: `addGood`,
        url: `/good/add`,
        isPost: true,
        isUpload: true
    },{
        name: `getGoodList`,
        url: `/good/list`,
        isPost: true,
    }
]

export default AJAX(API)
