// 操作成功语
const SUCCESS = {
    ADD: '添加成功',
    REMOVE: '删除成功',
    MODIFY: '修改成功',
    QUERY: '查询成功',
    SAVE: '保存成功',
    UPLOAD: '上传成功',
    DOWNLOAD: 'Download成功',
}

// 操作失败语
const FAILED = {
    ADD: '添加失败',
    REMOVE: '删除失败',
    MODIFY: '修改失败',
    QUERY: '查询失败',
    SAVE: '保存失败',
    UPLOAD: '上传失败',
    DOWNLOAD: '下载失败',
}

// 中文语言包
const CN = {
    SUCCESS: {
        ...SUCCESS,
        TO: SUCCESS
    },
    FAILED: {
        ...FAILED,
        TO: FAILED
    },
    APP_NAME: 'AniFirst',
    ACCOUNT: '账号',
    PASSWORD: '密码',
    REMEMBER_ME: '下次自动登录',
    FORGET_PASSWORD: '忘记密码',
    LOGIN_IN: '登录',
    REGISTER: '新用户注册',
    EMAIL: '邮箱',
    CONFIRM_PASSWORD: '确认密码',
    NICKNAME: '昵称',
    ADDRESS: '常住地址',
    PHONE: '手机号',
    WEBSITE: '个人网站', 
    CAPTCHA: '验证码', 
    I_HAVE_READ: '我已阅读', 
    AGREEMENT: '协议',
    INPUT_EAMAIL: '请输入邮箱', 
    INPUT_PASSWORD: '请输入密码', 
    INPUT_CONFIRM_PASSWORD: '请再次输入密码', 
    INPUT_PHONE: '请输入手机号码', 
    INPUT_NICKNAME: '请输入昵称', 
    SELECT_ADDRESS: '请选择常住地址', 
    INPUT_CAPTCHA: '请输入验证码',
    INPUT_WEBSITE: '请填写个人网站地址', 
    EXTRA_CAPTCHA: '我们必须确认您是本人', 
    GET_CAPTCHA: '获取验证码',
    HAVE_ACCOUNT: '已有账号，直接',
    HOME: '主页',
    ABOUT: '关于',

    QUIT: '退出',
    ZH: '中文',
    EN: 'EN',
    SEND: '发送',
    SIGN_TITLE: '欢迎使用',
    SIGN_IN: '开始破吧',
    CLEAR: '清空',
    CONTROL: '控制器',
    DO_SUCCESS: '操作成功',
    DESC: '古金，请继续完善我吧，加油！'
}

export default CN