import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import connect from '../../redux/connect';
import { Spin } from 'antd';
import Footer from './Footer';

const { Header, Content } = Layout;


const style = {
    header: { padding: '0 12px', background: '#fff' },
    row: { margin: '0', padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    content: { padding: '0 20px', height: 'calc(100vh - 66px - 52.5px )', overflow: 'auto', webkitOverflowSscrolling: 'touch' },
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

        var token = localStorage.getItem('ANF_TOKEN') || ''
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
                <Header style={style.header}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={style.row}>
                        <Col key='1' className="gutter-row" xs={21} sm={22} md={22} lg={23} xl={23} xxl={23}>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px', border: 'none' }}
                            >
                                <Menu.Item key="1">热门</Menu.Item>
                                <Menu.Item key="2">精选</Menu.Item>
                                <Menu.Item key="3">附近</Menu.Item>
                            </Menu>
                        </Col>
                        <Col key='2' className="gutter-row" xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>

                        </Col>
                    </Row>
                </Header>
                <Content style={style.content} className="webkitScroll">
                    {this.props.children}
                </Content>
                <Footer />
            </Layout>
        );
    }
}

export default connect({
    token: 'user',
    user: 'user',
    loading: 'user'
}, withRouter(BaseLayout))