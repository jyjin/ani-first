
import { PREVIEW, PREVIEW_RESET } from '../action/actionTypes';
var defaultState = {}


// reducer可以接收state，但是绝不能修改state
// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
export default (state = defaultState, action) => {
    console.log('store preview state = ', state)
    state = state || {}
    var newState = Object.assign({}, state)
    switch (action.type) {
        case PREVIEW:
            newState.preview = action.payload.preview
            break;

        case PREVIEW_RESET:
            newState.preview = {}
            break;
            
        default: {
        }
    }
    return newState;
}
