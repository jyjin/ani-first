import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const style = {
    title: { fontSize: '30px', padding: '5% 0 20px', color: '#27b764', textAlign: 'center' },
}
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'Shanghai',
    label: '上海市',
    children: [{
        value: 'Minhang',
        label: '闵行区',
        children: [{
            value: 'Pujiang',
            label: '浦江镇',
        }],
    }],
}, {
    value: 'jiangsu',
    label: '江苏省',
    children: [{
        value: 'nanjing',
        label: '南京市',
        children: [{
            value: 'zhonghuamen',
            label: '中华门',
        }],
    }],
}];

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

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
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        const { APP_NAME, ACCOUNT, PASSWORD, REMEMBER_ME, FORGET_PASSWORD, LOGIN_IN, REGISTER,
            EMAIL, CONFIRM_PASSWORD, NICKNAME, ADDRESS, PHONE, WEBSITE, CAPTCHA, I_HAVE_READ, AGREEMENT,
            INPUT_EAMAIL, INPUT_PASSWORD, INPUT_CONFIRM_PASSWORD, INPUT_PHONE, INPUT_NICKNAME, SELECT_ADDRESS, INPUT_CAPTCHA,
            INPUT_WEBSITE, EXTRA_CAPTCHA, GET_CAPTCHA, HAVE_ACCOUNT
        } = this.props.i18n;


        return (
            <Form className="register-form" {...formItemLayout} onSubmit={this.handleSubmit}>

                <div style={style.title}>{APP_NAME + ' ' + REGISTER} </div>
                <Form.Item {...tailFormItemLayout}>
                    {HAVE_ACCOUNT}
                    <a href="" onClick={() => { this.onNav('login') }}>{LOGIN_IN}</a>
                </Form.Item>
                <Form.Item
                    label={PHONE}
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: { INPUT_PHONE } }],
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
                {/* <Form.Item
                    label={EMAIL}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式错误',
                        }, {
                            required: true, message: INPUT_EAMAIL,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={(
                        <span>
                            {NICKNAME}
                            &nbsp;
                <Tooltip title="你希望别人对你的称谓">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: INPUT_NICKNAME, whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={ADDRESS}
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['上海市', '闵行区', '浦江镇'],
                        rules: [{ type: 'array', required: true, message: SELECT_ADDRESS }],
                    })(
                        <Cascader options={residences} />
                    )}
                </Form.Item>
               
                <Form.Item
                    label={WEBSITE}
                >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: { INPUT_WEBSITE } }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                    )}
                </Form.Item> */}
                <Form.Item
                    label={CAPTCHA}
                    extra={EXTRA_CAPTCHA}
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: INPUT_CAPTCHA }],
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
                    })(
                        <Checkbox>{I_HAVE_READ} <a href="">{AGREEMENT}</a></Checkbox>
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

export default WrappedRegistrationForm