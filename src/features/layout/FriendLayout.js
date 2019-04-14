import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import connect from '../../redux/connect';
import { Spin } from 'antd';
import { Input } from 'antd';
import Footer from './Footer';
const { Header, Content } = Layout;



const style = {
    header: { padding: 0, background: '#fff', textAlign: 'center' },
    headerBar: { fontWeight: 'bold', fontSize: '16px', color: 'rgba(0, 0, 0, 0.85)' },
    content: { padding: '0 50px', minHeight: 'calc(100vh - 66px - 52.5px )' },
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        margin: '-18.5px -16px'
    }
}

class SearchLayout extends Component {

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
                <Header theme={'light'} style={style.header}>
                    <div style={style.headerBar}>{'发现'}</div>
                </Header>
                <Content style={style.content}>
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
}, withRouter(SearchLayout))