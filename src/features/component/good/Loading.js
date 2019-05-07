

import React, { Component } from 'react';
import { Spin } from 'antd';

class Loading extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tip: '拼命加载中...',
            size: 'large'
        }
    }

    render() {

        if (!this.props.visible) {
            return null
        }

        return <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Spin
                size={this.props.size || this.state.size}
                tip={this.props.tip || this.state.tip}
            />
        </div>
    }
}


export default Loading