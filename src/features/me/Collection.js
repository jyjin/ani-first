import React, { Component } from 'react';
import { List } from 'antd';

class Collection extends Component {
    constructor(props, context) {
        super(props)
        this.state = {

        }
    }



    render() {
        const data = ['暂无数据']

        return (
            <div>
                <List
                    style={{ width: "100%", background: '#fff', marginTop: '0px', borderRadius: '0' }}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item
                    >{item}</List.Item>)}
                />

            </div>
        )
    }
}

export default Collection

