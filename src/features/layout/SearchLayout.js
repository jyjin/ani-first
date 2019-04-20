import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import connect from '../../redux/connect';
import { Spin } from 'antd';
import { Input } from 'antd';
import Footer from './Footer'

const Search = Input.Search;
const { Header, Content } = Layout;


const style = {
    header: { padding: 0 },
    row: { margin: 0, padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    content: { padding: '0 50px', height: 'calc(100vh - 66px - 52.5px )', overflow: 'auto' },
    icon: { fontSize: '20px', color: '#25b864', padding: '5px', cursor: 'pointer' },
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
                    <Row gutter={24} style={style.row}>
                        <Col className="gutter-row" span={10}>
                            <span style={{ padding: '10px' }}>{'账户'}</span>
                        </Col>
                        <Col className="gutter-row" span={14}>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                enterButton
                                size="small"
                                style={{ padding: '20px 10px' }}
                            />
                        </Col>

                    </Row>
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