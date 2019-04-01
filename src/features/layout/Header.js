import React, { Component } from 'react';
import { PageHeader } from 'antd';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props, context) {
        super(props)

        this.state = {

        }
    }

    static contextTypes = {
        local: PropTypes.string,
        appInfo: PropTypes.object,
    }

    render() {
        return (
            <PageHeader
                // onBack={() => null}
                title={this.context.appInfo.title}
                subTitle={this.context.appInfo.subTitle}
            />
        )
    }
}

export default Header;
