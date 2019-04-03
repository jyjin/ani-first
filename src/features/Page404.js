import React, { Component } from 'react';
class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }

    render() {
        return (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
                <h1 style={{ color: '#27b764' }}>
                    404 Not Found
                </h1>
                <div style={{ color: '#ddd' }}>
                    您访问的页面似乎不存在，请检查检查页面地址 <code style={{ textDecoration: 'underline', color: '#27b764', cursor: 'pointer' }}>"{window.location.origin + this.props.location.pathname}"</code>
                </div>

            </div>
        )
    }
}

export default Home;
