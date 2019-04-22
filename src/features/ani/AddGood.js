import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import connect from '../../redux/connect';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Upload, message } from 'antd';
import api from '../../lib/hapi';
const Dragger = Upload.Dragger;

class AddGood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    onNav(path) {
        const { history } = this.props;
        const _location = {
            pathname: path,
            state: { fromDashboard: true }
        }
        history.replace(_location)
    }

    handleSubmit = () => {

        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file, index) => {
            console.log(file.originFileObj)
            formData.append(`file${index}`, file.originFileObj);
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.fileCountError) {
                    debugger
                    message.error('最多4张图片')
                    return;
                }

                for (var key in values) {
                    formData.append(key, values[key])
                }
                formData.append('userId', this.props.user._id)
                this.setState({
                    uploading: true,
                });

                var p = message.loading('上传中...')

                api.addGood(formData).then(json => {
                    console.log('add good == ', json)
                    if (json.res > 0) {
                        p.then(v =>
                            message.success('上传成功！')
                        )
                        this.props.onClose()
                        this.onNav('/')
                    } else {
                        p.then(v =>
                            message.error('上传失败！')
                        )
                    }
                })
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            multiple: true,
            accept: 'image/*',
            // listType: 'picture',
            showUploadList: {
                showPreviewIcon: true,
                showRemoveIcon: true,
            },
            onChange: (info) => {
                const status = info.file.status;
                console.log('info == ', status)
                if (info.fileList && info.fileList.length > 4) {
                    debugger
                    message.config({
                        maxCount: 1
                    })
                    message.error('不能超过4张图片')
                    this.setState({
                        fileCountError: true
                    })
                    return;
                } else {
                    this.setState({
                        fileCountError: false
                    })
                }
                if (status !== 'uploading') {
                    console.log('info.file = ', info.file);
                    console.log('info.fileList = ', info.fileList);
                    this.setState({ fileList: info.fileList })
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onRemove: (file) => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: state.fileList.concat(file)
                }));
                return false;
            }
        };

        return (
            <div style={{ padding: "20px" }}>
                <Form className="login-form">
                    <Form.Item>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">轻触区域选择图片</p>
                            <p className="ant-upload-hint">支持一个或多个图片上传</p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true, message: '请输入商品名称!'
                                },
                                {
                                    validator: this.validateToPhone
                                }
                            ],
                        })(
                            <Input placeholder={'商品名称'} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true, message: '请输入价格!'
                                },
                                {
                                    validator: this.validateToPhone
                                }
                            ],
                        })(
                            <Input placeholder={'价格/元'} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="login-form-button" onClick={() => this.handleSubmit()}>
                            {'发布'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddGood);


export default connect({
    token: 'user',
    user: 'user',
    loading: 'user'
}, withRouter(WrappedNormalLoginForm))