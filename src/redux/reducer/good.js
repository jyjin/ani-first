
import { GOOD_LIST, UPDATE_IMG, UPDATE_VOTE } from '../action/actionTypes';
var defaultState = []


// reducer可以接收state，但是绝不能修改state
// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
export default (state = defaultState, action) => {
    var newState = Object.assign({}, state)
    switch (action.type) {
        case GOOD_LIST:
            newState.goodList = action.payload.prevGoodList.concat(action.payload.goodList)
            break;

        case UPDATE_IMG:
            var { image, index, innerIndex, goodList } = action.payload
            newState.goodList = goodList
            newState.goodList[index].imgs[innerIndex] = image
            break;

        case UPDATE_VOTE:
            var { good, goodList } = action.payload
            console.log('goodList 000 ', goodList)
            console.log('good 000 ', goodList)

            var index = goodList.findIndex(g => g._id === good._id)
            if(~index){
                goodList[index] = good
                newState.goodList = goodList
                console.log('new 000 ', newState.goodList)
            }else{
                console.error('没有更新')
                newState.goodList = goodList
            }
            break;
        default: {

        }
    }
    return newState;
}
