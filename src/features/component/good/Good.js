import React, { Component } from 'react';
import ImgList from './ImgList';
import GoodInfo from './GoodInfo';
import Comment from './Comment';

const style = {
    good: {
        margin: '5px 0',
        padding: '20px 20px 0 20px',
        background: 'white',
    }
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

        // var good = this.props.good
        // console.log('good == ', good)

        return <div
            style={style.good}
            className="flexWidth"
        >
            <ImgList {...this.props} />
            <GoodInfo {...this.props} />
            <Comment {...this.props} />
        </div>

    }
}

export default Good