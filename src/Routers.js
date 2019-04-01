import React, { Component } from 'react';
import Login from './features/Login';
import Register from './features/Register';
import Home from './features/Home';
import Ani from './features/Ani';
import Find from './features/Find';
import User from './features/User';
import About from './features/About';
import {
    BrowserRouter as Router,
    // Route as PureRoute 
} from "react-router-dom";
import Route from './middleware/passProps'; // 这里的是通过封装的withRouterPropsRoute，为了方便起名别称Route

class Routers extends Component {
    constructor(props) {

        super(props);
        this.state = {}
    }

    render() {
        console.log('...props of app custom: ', this.props)

        return (
            <Router>
                <Route {...this.props} exact path="/login" component={Login} />
                <Route {...this.props} exact path="/register" component={Register} />
                <Route {...this.props} exact path="/" component={Home} />
                <Route {...this.props} exact path="/ani" component={Ani} />
                <Route {...this.props} exact path="/find" component={Find} />
                <Route {...this.props} exact path="/user" component={User} />
                <Route {...this.props} path="/about" component={About} />
            </Router>
        )
    }
}

export default Routers