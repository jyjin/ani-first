

import React, { Component } from 'react';
import { Button } from 'antd';
import api from '../../lib/hapi'

const style = {

}

class Hot extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }

    sendRequest() {
        for (var i = 0; i < 3; i++) {
            api.getUserList().then(json => {
                console.log('=== i === ', json)
            })
        }
    }

    render() {
        return (
            <div>
                附近
            </div>
        )
    }
}

export default Hot;
