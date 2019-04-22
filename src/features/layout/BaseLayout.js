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
    content: { padding: '0', height: 'calc(100vh - 52.5px )' },
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
            visible: false
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

    setA = () => {
        alert('setA')
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
                <Content
                    style={style.content}
                    className="webkit-scroll scrollPersonWrap"
                >
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