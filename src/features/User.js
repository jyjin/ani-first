import React, { Component } from 'react';
import BaseLayout from './layout/SearchLayout';
class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }

    navRoute(e) {
        const { history } = this.props;
        const _location = {
            pathname: '/about',
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    render() {
        return (
            <BaseLayout>
                <div style={{ padding: '20px 0' }}>
                    {'User Page'}
                </div>
            </BaseLayout>
        )
    }
}

export default Home;
