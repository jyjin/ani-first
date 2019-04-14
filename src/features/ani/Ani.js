import React, { Component } from 'react';
import { Tabs } from 'antd';
import BaseLayout from '../layout/TabLayout';
import Featured from './Featured';
import Hot from './Hot';
import Near from './Near';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

const style = {
    header: { padding: '0 12px', background: '#fff' },
    row: { margin: '0', padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    content: { padding: '0 50px', minHeight: 'calc(100vh - 52.5px )' },
    tabs: { background: '#fff', minHeight: 'calc(100vh - 52.5px)' },
    tabPane: { padding: '20px', background: 'none' }
}

class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
    }

    render() {
        return (
            <BaseLayout>
                <Tabs defaultActiveKey="1" onChange={callback} style={style.tabs}>
                    <TabPane style={style.tabPane} tab="热门" key="1"><Hot {...this.props}/></TabPane>
                    <TabPane style={style.tabPane} tab="精选" key="2"><Featured {...this.props}/></TabPane>
                    <TabPane style={style.tabPane} tab="附近" key="3"><Near {...this.props}/></TabPane>
                </Tabs>
            </BaseLayout>
        )
    }
}

export default Home;
