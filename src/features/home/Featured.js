import React, { Component } from 'react';
import BaseLayout from '../layout/BaseLayout';
import { Layout, Menu, Row, Col } from 'antd';
import { Spin } from 'antd';
import api from '../../lib/hapi';
import { GOOD_LIST } from '../../redux/action/actionTypes';
import connect from '../../redux/connect';
import { siteUrl } from '../../lib/config';

const { Header } = Layout;

const style = {
    wrap: {
        margin: '0 auto',
        width: '96%',
        padding: '20px 0px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'center',
    },
}

class Hot extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={Object.assign({}, style.wrap, { display: this.props.visible ? 'block' : 'none' })}>
                Page 2
            </div>
        )
    }
}

export default connect({
    goodList: 'good'
}, Hot)