/**
 * 国际化-中文
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 国际化入口
 */
module.exports = {
    // 系统级别提示
    'JSS_0001': '添加数据失败了',
    'JSS_0002': '删除数据失败了',
    'JSS_0003': '修改数据失败了',
    'JSS_0004': '查询数据失败了',
    'JSS_0005': '保存数据失败了',
    'JSS_0006': '获取数据失败了',

    // 认证提示
    'JSS_AUTH_0001': 'token认证失败了',
    'JSS_AUTH_0002': 'token已失效',
    'JSS_AUTH_0003': '用户名或密码不能为空',
    'JSS_AUTH_0004': '请输入3到20位的用户名',
    'JSS_AUTH_0005': '用户名或密码不正确',
    'JSS_AUTH_0006': '上线失败',

    // 校验提示
    'JSS_VLD_0001': (s) => `参数'${s}'不可以缺失`,
    'JSS_VLD_0002': (k, m, n) => `${k}长度必须在${m}到${n}之间`,
    'JSS_VLD_0003': '邮箱格式错误',
    'JSS_VLD_0004': '手机号格式错误',
    'JSS_VLD_0005': '密码格式错误',
    'JSS_VLD_0006': (k) => `${k}已存在`,
    'JSS_VLD_0007': '两次密码不一致',
    'JSS_VLD_0008': '手机验证码错误',
}