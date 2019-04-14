
import { ADD_USER, DEL_USER, SIGN_IN, TOKEN_SIGN_IN, TOKEN_SIGN_IN_LOADING } from '../action/actionTypes'
const defaultState = {
    user: {},
    token: '',
    loading: true,
};

const setToken = token => localStorage.setItem('ANF_TOKEN', token)

// reducer可以接收state，但是绝不能修改state
// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
export default (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    // var user = action.payload.user || {};

    switch (action.type) {
        // 注册
        case ADD_USER:
            newState.token = action.payload.token
            setToken(action.payload.token)
            break;
        case DEL_USER:

            break;
        // 账号登录成功
        case SIGN_IN:
            newState.user = action.payload.user
            setToken(action.payload.token)
            newState.loading = false
            break;
        // token自动登录中
        case TOKEN_SIGN_IN_LOADING:
            newState.loading = true
            break;
        // token登录成功
        case TOKEN_SIGN_IN:
            newState.user = action.payload.user || {}
            newState.loading = false
            break;
        default: {

        }
    }

    return newState;
}
