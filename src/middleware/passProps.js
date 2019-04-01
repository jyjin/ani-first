import React from 'react';
import { Route, withRouter } from "react-router-dom";

// 合并route自带props和传递的props
const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

// 封装Route -> 能够传递除Route默认props之外的自定义props
const PropsRoute = ({ component, ...rest }) => {
    
    return (
        <Route {...rest} render={routeProps => {
            console.log('...props of app and Route: ', rest)
            console.log('...props of routeProps: ', routeProps)  // 这里已经有history对象， 所以不需要下面的WithRouterPropsRoute
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
}

// 封装进withRoute 子组件可以调用history对象
const WithRouterPropsRoute = withRouter(PropsRoute)

export default WithRouterPropsRoute