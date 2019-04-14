import React, { Component } from 'react';
import Routers from './Routers'
import { default as i18nModule } from './i18n'
import { message } from 'antd';
import PropTypes from 'prop-types';
// import "antd/dist/antd.css"; // 使用react-app-rewired customize-cra babel-plugin-import 自定义主题不能引入此样式
import api from './lib/hapi';
import { TOKEN_SIGN_IN, TOKEN_SIGN_IN_LOADING } from './redux/action/actionTypes';
import connect from './redux/connect';

class App extends Component {

    constructor(props, context) {
        super(props, context)


        var local = localStorage.getItem('LOCAL') || 'cn';   // cn-中文 en-英文
        var appInfo = {
            version: '0.0.1',
            title: 'Ani First',
            subTitle: '狗狗是美好家庭的灵魂，猫咪是独身的完美陪伴',
            author: 'jyjin',
            design: 'jyjin',
            createAt: '2019-3-20'
        }
        this.state = {
            local,
            appInfo,
        }
    }

    static childContextTypes = {
        local: PropTypes.string,
        appInfo: PropTypes.object,
    }

    getChildContext() {
        const { local, appInfo } = this.state;
        return {
            local,
            appInfo,
        };
    }

    componentDidMount() {
        this.authByToken()
    }

    authByToken() {
        var token = localStorage.getItem('ANF_TOKEN') || ''
        if (token) {
            this.props.dispatch(TOKEN_SIGN_IN_LOADING, { loading: true })
            api.authByToken({ token }).then(json => {
                if (json.res > 0) {
                    this.props.dispatch(TOKEN_SIGN_IN, { user: json.data.user, loading: false })
                } else {
                    this.props.dispatch(TOKEN_SIGN_IN, { user: null, loading: false })
                    this.info('身份已过期，请重新登录')
                }
            })
        }
    }

    info(...args) {
        return message.info.call(message, ...args);
    }

    success(...args) {
        return message.success.call(message, ...args)
    }

    error(...args) {
        return message.error.call(message, ...args)
    }

    warn(...args) {
        return message.warn.call(message, ...args)
    }

    warning(...args) {
        return message.warning.call(message, ...args)
    }

    loading(...args) {
        return message.loading.call(message, ...args)
    }

    render() {
        console.log('render app ...')
        return (
            <Routers
                {...this.props}
                {...this.state}
                i18n={i18nModule(this.state.local)}
                info={this.info.bind(this)}
                success={this.success.bind(this)}
                error={this.error.bind(this)}
                warn={this.warn.bind(this)}
                warning={this.warning.bind(this)}
                loading={this.loading.bind(this)}
            />
        )
    }
}

export default connect({
    token: 'user',
    user: 'user'
}, App)