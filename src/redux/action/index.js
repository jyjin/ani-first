/**
 * action触发器封装
 * @param {} ACTION_NAME action事件名
 * @param {*} data       事件传送的数据
 */
export default function eventDispatch(ACTION_NAME, data) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTION_NAME,
            payload: data
        })
    }
}