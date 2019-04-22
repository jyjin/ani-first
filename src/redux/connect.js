import eventDispatch from './action'
import { connect } from 'react-redux'

/**
 * action封装
 * create by jyjin
 * 2019.3.29 05:22
 * @param {} _dispatch 事件触发器
 * @param ACTION_NAME  action事件名
 * @param data         action传递的数据
 */
const mapDispatchToProps = _dispatch => {
    return {
        dispatch: (ACTION_NAME, data) => _dispatch(eventDispatch(ACTION_NAME, data))
    }
}

/**
 * 根据map构建mapStateToProps对象
 * create by jyjin
 * 2019.3.29 05:22
 * @param {} map mapStateToProps的map对象
 *              如{userList: 'user'} => reducer中user.js的state.userList => this.props.userList
 */
const getMapStateToProps = map => {
    if (!map) {
        return null
    }
    return state => {

        // console.log('store state == ', state)

        // const mapStateToProps = state => {
        //     console.log('state == ', state)
        //     return {
        //         userList: state['user'].userList // 将state映射到props属性 => store里state的userList, 在这里被映射到 this.props.userList
        //     }
        // };

        // 构造上述结构
        var obj = {}
        for (var key in map) {
            obj[key] = state[map[key]][key]
        }
        // console.log('obj == ', obj)
        return obj
    }
}

/**
 * 使用方法：
 * connect(
 *      getMapStateToProps({
 *          user: 'userList',
 *          ...
 *      }),
 *      mapDispatchToProps
 * )(Register)
 */



/**
 * map          mapStateToProps的map对象
 *              如{userList: 'user'} => reducer中user.js的state.userList => this.props.userList
 * component    组件
 */
export default (map, component) => {
    return connect(
        getMapStateToProps(map),       // mapStateToProps参数， 这个参数基本用来取值
        mapDispatchToProps
    )(component)
}