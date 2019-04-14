import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { Icon } from 'antd';
import { withRouter } from "react-router-dom";
const { Footer } = Layout;


const style = {
    footer: { padding: '10px 0', textAlign: 'center', background: '#fff' },
    row: { margin: 0, padding: '0' },
    icon: { fontSize: '20px', padding: '5px', cursor: 'pointer' },
    iconHover: { fontSize: '20px', color: '#25b864', padding: '5px', cursor: 'pointer' },
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        margin: '-18.5px -16px'
    }
}

class NavFooter extends Component {

    onNav(path) {
        const { history } = this.props;
        console.log('jyjin ', this.props)
        const _location = {
            pathname: path,
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    setIconStyle(path) {
        return 'outlined'
        // return this.props.history.location.pathname === path ? 'filled' : 'outlined'
    }

    setStyle(path) {
        return this.props.history.location.pathname === path ? style.iconHover : style.icon
    }

    render() {
        return (
            <Footer style={style.footer}>
                <Row gutter={16} style={style.row}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><Icon onClick={() => this.onNav('/')} style={this.setStyle('/')} type="home" theme={this.setIconStyle('/')} /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><Icon onClick={() => this.onNav('ani')} style={this.setStyle('/ani')} type="thunderbolt" theme={this.setIconStyle('/ani')} /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><Icon onClick={() => this.onNav('find')} style={this.setStyle('/find')} type="deployment-unit" theme={this.setIconStyle('/find')} /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><Icon onClick={() => this.onNav('user')} style={this.setStyle('/user')} type="user" theme={this.setIconStyle('/user')} /></div>
                    </Col>
                </Row>
            </Footer>
        )
    }
}

export default withRouter(NavFooter);
