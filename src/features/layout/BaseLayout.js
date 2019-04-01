import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Icon } from 'antd';
import { withRouter } from "react-router-dom";
import connect from '../../redux/connect';
import { Spin } from 'antd';

const { Header, Content, Footer } = Layout;


const style = {
    icon: { fontSize: '20px', color: '#25b864', padding: '5px', cursor: 'pointer' },
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        margin: '-18.5px -16px'
    }
}

class BaseLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onNav(path) {
        const { history } = this.props;
        console.log('jyjin ', this.props)
        const _location = {
            pathname: path,
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    render() {

        var token = sessionStorage.getItem('ANF_TOKEN') || ''
        if (!token) {
            this.onNav('login')
        }

        if (this.props.loading) {
            return <div style={style.loading}>
                <Spin size="large" />
            </div>
        }

        if (!this.props.user._id) {
            this.onNav('login')
        }

        return (
            <Layout>
                <Header theme={'light'} style={{ padding: 0 }}>
                    <Row gutter={{xs: 8, sm: 16, md: 24}} style={{ margin: 0, padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' }}>
                        <Col className="gutter-row" xs={21} sm={22} md={22} lg={23} xl={23} xxl={23}>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={['1'] }
                                style={{ lineHeight: '64px', border: 'none' }}
                            >
                                <Menu.Item key="1">热门</Menu.Item>
                                <Menu.Item key="2">精选</Menu.Item>
                                <Menu.Item key="3">附近</Menu.Item>
                            </Menu>
                        </Col>
                        <Col className="gutter-row" xs={3}  sm={2} md={2} lg={1} xl={1} xxl={1}>
                            <a onClick={() => {
                                sessionStorage.removeItem('ANF_TOKEN')
                                this.onNav('/')
                            }}>退出</a>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 66px - 52.5px )' }}>
                    {this.props.children}
                </Content>
                <Footer style={{ padding: '10px 0', textAlign: 'center', background: '#fff' }}>
                    <Row gutter={16} style={{ margin: 0, padding: '0' }}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><Icon onClick={() => this.onNav('/')} style={style.icon} type="home" /></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><Icon onClick={() => this.onNav('ani')} style={style.icon} type="thunderbolt" /></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><Icon onClick={() => this.onNav('find')} style={style.icon} type="deployment-unit" /></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><Icon onClick={() => this.onNav('user')} style={style.icon} type="user" /></div>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        );
    }
}

export default connect({
    token: 'user',
    user: 'user',
    loading: 'user'
}, withRouter(BaseLayout))