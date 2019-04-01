import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../style/login.css';
import { isMobilePhone } from 'validator';
import api from '../lib/hapi';
import { SIGN_IN } from '../redux/action/actionTypes'

const style = {
    title: { fontSize: '30px', padding: '5% 0 20px', color: '#27b764', textAlign: 'center' },
}


class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    apiLogin(data) {
        var p = this.props.loading('登录中...')
        api.signIn(data).then(json => {
            if (json.res > 0) {
                p.then(() => {
                    this.props.success('登录成功')
                })
                this.props.dispatch(SIGN_IN, { user: json.data.user, token: json.data.token })
                this.onNav('/')
            } else {
                p.then(() => {
                    this.props.success(json.i18n[this.props.local])
                })
            }
        })
    }

    onNav(path) {
        const { history } = this.props;
        const _location = {
            pathname: path,
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    validateToPhone = (rule, value, callback) => {
        if (!isMobilePhone(value)) {
            callback('请输入11位手机号')
        } else {
            callback()
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('from data: ', values);
                this.apiLogin(values)
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { APP_NAME, ACCOUNT, PASSWORD, REMEMBER_ME, FORGET_PASSWORD, LOGIN_IN, REGISTER } = this.props.i18n;
        return (
            <div style={{ padding: "20px" }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <div style={style.title}>{APP_NAME} </div>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true, message: '请输入11位手机号!'
                                },
                                {
                                    validator: this.validateToPhone
                                }
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={ACCOUNT} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={PASSWORD} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>{REMEMBER_ME}</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">{FORGET_PASSWORD}</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {LOGIN_IN}
                        </Button>
                        <a href="" onClick={() => { this.onNav('register') }}>{REGISTER}</a>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm

