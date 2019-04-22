import React, { Component } from 'react';
import { Tabs } from 'antd';
import BaseLayout from '../layout/TabLayout';
import Featured from './Featured';
import Hot from './Hot';
import Near from './Near';
import { Icon, Drawer, PageHeader } from 'antd';

import AddGood from './AddGood';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

const style = {
    header: { padding: '0 12px', background: '#fff' },
    row: { margin: '0', padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    content: { padding: '0 50px', minHeight: 'calc(100vh - 52.5px )' },
    tabs: { background: '#fff', minHeight: 'calc(100vh - 52.5px)' },
    tabPane: { background: '#f0f2f5' },
    icon: { position: 'absolute', padding: '22px 0', width: "60px", top: 0, right: 0, fontSize: '20px', color: '#25b864' },
}

class Home extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            visible: false
        }
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <BaseLayout>
                <Tabs defaultActiveKey="1" onChange={callback} style={style.tabs}>
                    <TabPane style={style.tabPane} tab="全部" key="1"><Hot {...this.props} /></TabPane>
                    <TabPane style={style.tabPane} tab="案例" key="2"><Featured {...this.props} /></TabPane>
                    <TabPane style={style.tabPane} tab="红路灯" key="3"><Near {...this.props} /></TabPane>
                </Tabs>
                <Icon type="camera"
                    size="large"
                    style={style.icon}
                    onClick={() => this.setState({
                        visible: true
                    })}
                />
                <Drawer
                    className={'user-drawer'}
                    title={<PageHeader
                        title={'添加商品'}
                        onBack={() => { this.onClose() }}
                    />}
                    width='100%'
                    height="100%"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <AddGood
                        {...this.props}
                        onClose={this.onClose}
                    />
                </Drawer>

            </BaseLayout>
        )
    }
}

export default Home;
