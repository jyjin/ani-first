import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd';
import api from '../lib/hapi';
import { isMobilePhone } from 'validator';
import { ADD_USER } from '../redux/action/actionTypes'
import connect from '../redux/connect'

const style = {
    title: { fontSize: '30px', padding: '5% 0 20px', color: '#27b764', textAlign: 'center' },
}
const { Option } = Select;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
    };

    apiRegister(data) {
        api.register(data).then(json => {
            if (json.res > 0) {
                this.props.dispatch(ADD_USER, { token: json.data.token })
                this.props.info(this.props.i18n.SUCCESS.TO.SAVE)
                this.onNav('login')
            } else {
                this.props.info(json.i18n[this.props.local])
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('from data: ', values);
                this.apiRegister(values)
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    validateToPhone = (rule, value, callback) => {
        if (!isMobilePhone(value)) {
            callback('请输入11位手机号')
        } else {
            callback()
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    validateToCaptcha = (rule, value, callback) => {
        if (value && value.length !== 4) {
            callback('请输入4位验证码');
        } else {
            callback();
        }
    }

    validateToAgreement = (rule, value, callback) => {
        !!value ? callback() : callback('请仔细阅读协议条款，同意后才可注册')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        const {
            APP_NAME, PASSWORD, LOGIN_IN, REGISTER, CONFIRM_PASSWORD, PHONE, CAPTCHA, I_HAVE_READ, AGREEMENT, INPUT_PASSWORD, INPUT_CONFIRM_PASSWORD, INPUT_PHONE, INPUT_CAPTCHA, EXTRA_CAPTCHA, GET_CAPTCHA, HAVE_ACCOUNT
        } = this.props.i18n;


        return (
            <Form className="register-form" {...formItemLayout} onSubmit={this.handleSubmit}>

                <div style={style.title}>{APP_NAME + ' ' + REGISTER} </div>
                <Form.Item {...tailFormItemLayout}>
                    {HAVE_ACCOUNT}
                    <a href="javascript:null" onClick={() => { this.onNav('login') }}>{LOGIN_IN}</a>
                </Form.Item>
                <Form.Item
                    label={PHONE}
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: INPUT_PHONE
                        }, {
                            validator: this.validateToPhone
                        }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    label={PASSWORD}
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: INPUT_PASSWORD,
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label={CONFIRM_PASSWORD}
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: INPUT_CONFIRM_PASSWORD,
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label={CAPTCHA}
                    extra={EXTRA_CAPTCHA}
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{
                                    required: true, message: INPUT_CAPTCHA
                                }, {
                                    validator: this.validateToCaptcha
                                }],
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>{GET_CAPTCHA}</Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [{
                            validator: this.validateToAgreement
                        }]
                    })(
                        <Checkbox>{I_HAVE_READ} <a href="javascript:null">{AGREEMENT}</a></Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">{REGISTER}</Button>
                </Form.Item>

            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default connect(
    null,
    WrappedRegistrationForm
)