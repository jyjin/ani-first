import React, { Component } from 'react';
import Loading from '../component/good/Loading';
import GoodList from '../component/good/GoodList';

const style = {
    wrap: {
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
}

class Hot extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            loading: false,
            loadingDown: false
        }
    }

    setLoading = (loading) => {
        this.setState({
            loading
        })
    }

    setLoadingDown = (loadingDown) => {
        this.setState({
            loadingDown
        })
    }

    render() {
        return <div style={Object.assign({}, style.wrap, { display: this.props.visible ? 'block' : 'none' })}>
            <Loading
                tip={'加载中...'}
                visible={this.state.loadingDown}
            />
            <GoodList
                {...this.props}
                setLoading={this.setLoading}
                setLoadingDown={this.setLoadingDown}
            />
            <Loading
                visible={this.state.loading}
            />
        </div>
    }
}

export default Hot