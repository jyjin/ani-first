import React, { Component } from 'react';
import { List } from 'antd';
import {  Button } from 'antd';
import { withRouter } from "react-router-dom";


class UserAccount extends Component {
    constructor(props, context) {
        super(props)
        this.state = {

        }
    }

    onNav(path) {
        const { history } = this.props;
        const _location = {
            pathname: path,
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    render() {
        console.log('=== user: ', this.props.user);
        var { user } = this.props
        const data = []
        data.push("用户名：" + (user.username || ''))
        data.push("手机号码：" + (user.phone || ''))
        data.push("邮箱：" + (user.email || ''))
        data.push("性别：" + (user.gender || ''))

        return (
            <div>
                <List
                    style={{ width: "100%", background: '#fff', marginTop: '0px', borderRadius: '0' }}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item
                    >{item}</List.Item>)}
                />
                <Button
                    type="primary"
                    style={{ marginTop: '24px', width: '100%' }}
                    onClick={() => {
                        sessionStorage.removeItem('ANF_TOKEN')
                        this.onNav('/')
                    }}>退出登录</Button>
            </div>
        )
    }
}

export default withRouter(UserAccount)

