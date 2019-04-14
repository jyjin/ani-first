import React, { Component } from 'react';
import { Button } from 'antd';
import api from '../../lib/hapi'

import { List } from 'antd';

class Hot extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
        this.state = {
            msgList: []
        }
    }

    sendRequest() {
        var msgList = this.state.msgList
        for (var i = 0; i < 1001; i++) {
            ((i) => {
                console.log('send === ', i)
                api.queryUserList().then(json => {
                    console.log(`recv === ${i} `, json)

                    if (json.res > 0) {
                        msgList.push({
                            i,
                            msg: json.msg,
                            result: json.data
                        })
                    } else {
                        msgList.push({
                            i,
                            msg: json.msg,
                            result: ''
                        })
                    }
                    this.setState({ msgList })
                })
            })(i)
        }
    }

    render() {
        return (
            <div>
                <Button
                    type="primary"
                    style={{ marginTop: '24px', width: '100%' }}
                    onClick={() => this.sendRequest()}>发送批量请求</Button>
                <Button
                    type="primary"
                    style={{ marginTop: '24px', width: '100%' }}
                    onClick={() => this.setState({
                        msgList: []
                    })}>清空</Button>
                <List
                    style={{ marginTop: '24px', width: "100%", background: '#fff', marginTop: '0px', borderRadius: '0' }}
                    bordered
                    dataSource={this.state.msgList}
                    renderItem={item => (
                        <List.Item>{`第${item.i}次请求结果 == ` + item.msg}
                            {/* =>{item.result ? JSON.stringify(item.result, null, 2) : ''} */}
                        </List.Item>)}
                />
            </div>
        )
    }
}

export default Hot;
