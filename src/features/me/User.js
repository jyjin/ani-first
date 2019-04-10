import React, { Component } from 'react';
import BaseLayout from '../layout/UserLayout';
import { List, Icon, Drawer, PageHeader } from 'antd';
import UserAccount from './UserAccount';
import Collection from './Collection';
import Draft from './Draft';

const data = [{
    key: 'account',
    text: '账号'
}, {
    key: 'collection',
    text: '收藏'
}, {
    key: 'draft',
    text: '草稿箱'
}]

class User extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            title: '',
            visible: false,
            child: null,
        }
    }

    navRoute(e) {
        const { history } = this.props;
        const _location = {
            pathname: '/about',
            state: { fromDashboard: true }
        }
        history.push(_location)
    }

    handleClick = (key) => {
        console.log('key == ', key)

        this.setState({
            key: key,
            visible: true,
            title: data.find(item => item.key === key).text
        })
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    getChild() {
        const { key } = this.state;
        var child = null;

        switch (key) {
            case 'account':
                child = <UserAccount {...this.props} />;
                break;
            case 'collection':
                child = <Collection {...this.props} />;
                break;
            case 'draft':
                child = <Draft {...this.props} />;
                break;
            default:
                child = null
        }
        return child
    }

    render() {
        return (
            <BaseLayout>
                <List
                    style={{ width: "100%", background: '#fff', marginTop: '10px', borderRadius: '0' }}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item
                        style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                        actions={[<Icon type="right" style={{ padding: '5px 10px' }} />]}
                        onClick={() => { this.handleClick(item.key) }}
                    >{item.text}</List.Item>)}
                />

                <Drawer
                    className={'user-drawer'}
                    title={<PageHeader
                        onBack={() => { this.onClose() }}
                        title={this.state.title}
                    />}
                    width='100%'
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.getChild()}
                </Drawer>
            </BaseLayout>
        )
    }
}

export default User