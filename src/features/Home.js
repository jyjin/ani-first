import React, { Component } from 'react';
import BaseLayout from './layout/BaseLayout';
class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }

    render() {
        return (
            <BaseLayout>
            <div style={{padding: '20px 0'}}>
                {this.props.i18n.DESC}
            </div>
            </BaseLayout>
        )
    }
}

export default Home;
