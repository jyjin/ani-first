import React, { Component } from 'react';
import BaseLayout from './layout/FriendLayout';
class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }
    render() {
        return (
            <BaseLayout>
                <div style={{ padding: '20px 0' }}>
                    {'我想在这做个盆友圈'}
                </div>
            </BaseLayout>
        )
    }
}

export default Home;
