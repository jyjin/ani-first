import React, { Component } from 'react';

const style = {
    goodInfo: { paddingBottom: '5px', display: 'flex', justifyContent: "space-between", fontSize: '12px' },
}

class Good extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            size: 160,
            page: 1,
            loading: true,
        }
    }

    render() {
        const good = this.props.good
        return <div key={'div_' + good._id} style={style.goodInfo}>
            <span>{good.name}</span>
            <span>价格：{good.price}￥</span>
        </div>
    }
}

export default Good