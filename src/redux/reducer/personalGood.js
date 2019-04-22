
import { PERSONAL_GOOD_LIST, UPDATE_IMG, PREVIEW } from '../action/actionTypes';
var defaultState = []


// reducer可以接收state，但是绝不能修改state
// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
export default (state = defaultState, action) => {
    var newState = Object.assign({}, state)
    switch (action.type) {
        case PERSONAL_GOOD_LIST:
            newState.personalGoodList = action.payload.prevPersonalGoodList.concat(action.payload.personalGoodList)
            break;

        case UPDATE_IMG:
            var { image, index, innerIndex, personalGoodList } = action.payload
            newState.personalGoodList = personalGoodList
            newState.personalGoodList[index].imgs[innerIndex] = image
            break;

        default: {

        }
    }
    return newState;
}
