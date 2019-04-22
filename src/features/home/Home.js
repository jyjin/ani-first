import React, { Component } from 'react';
import BaseLayout from '../layout/BaseLayout';
import { Layout, Menu, Row, Col, message } from 'antd';
import connect from '../../redux/connect';
import Hot from './Hot';
import Featured from './Featured';
import Near from './Near';
import ImagePreviewer from '../component/ImagePreviewer';
import { siteUrl } from '../../lib/config';
import { PREVIEW, PREVIEW_RESET } from '../../redux/action/actionTypes';

const { Header } = Layout;

const style = {
    header: { padding: '0 12px', background: '#fff' },
    row: { margin: '0', padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    wrap: {
        height: 'calc(100vh - 52.5px - 66px )',
        width: '100%',
        overflow: 'auto',
        webkitOverflowSscrolling: 'touch',
    },
}

class Home extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            key: 'hot'
        }
    }

    componentDidMount() {

    }

    handleClick = (item, key, keyPath) => {
        this.setState({ key: item.key })
    }

    getPage = () => {
        var { key } = this.state
        if (key === 'hot') {
            return <Hot {...this.props} />
        } else if (key === 'featured') {
            return <Featured {...this.props} />

        } else if (key === 'near') {
            return <Near {...this.props} />
        }
    }

    visible = (key) => {
        return this.state.key === key
    }

    turnPrev = () => {
        var { indexObj } = this.props.preview
        var item = this.props.goodList[indexObj.itemIndex]
        if (indexObj.imgIndex > 0) {
            indexObj.imgIndex -= 1
            var img = this.props.goodList[indexObj.itemIndex].imgs[indexObj.imgIndex]
            const preview = {
                visible: true,
                src: siteUrl + '/' + img.fileName,
                alt: img.realName,
                width: img.width,
                height: img.height,
                name: item.name,
                price: item.price,
                indexObj
            }
            this.props.dispatch(PREVIEW, { preview })
        } else {
            // this.props.info('第一张')
            message.config({
                maxCount: 1
            })
            message.warning('第一张')
        }
    }

    turnNext = () => {
        var { indexObj } = this.props.preview
        var goodList = JSON.parse(JSON.stringify(this.props.goodList))

        var l = goodList[indexObj.itemIndex].imgs.length
        var item = goodList[indexObj.itemIndex]
        if (indexObj.imgIndex < l - 1) {
            indexObj.imgIndex += 1
            var img = goodList[indexObj.itemIndex].imgs[indexObj.imgIndex]
            const preview = {
                visible: true,
                src: siteUrl + '/' + img.fileName,
                alt: img.realName,
                width: img.width,
                height: img.height,
                name: item.name,
                price: item.price,
                indexObj
            }
            this.props.dispatch(PREVIEW_RESET, {})

        } else {
            message.config({
                maxCount: 1
            })
            message.warning('最后一张')
        }
    }

    reset = () => {
        this.props.dispatch(PREVIEW, {})
    }

    render() {

        return (
            <BaseLayout>
                <Header style={style.header}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={style.row}>
                        <Col key='1' className="gutter-row" xs={21} sm={22} md={22} lg={23} xl={23} xxl={23}>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={[this.state.key]}
                                style={{ lineHeight: '64px', border: 'none' }}
                                onClick={this.handleClick}
                            >
                                <Menu.Item key="hot">热门</Menu.Item>
                                <Menu.Item key="featured">精选</Menu.Item>
                                <Menu.Item key="near">附近</Menu.Item>
                            </Menu>
                        </Col>
                        <Col key='2' className="gutter-row" xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>

                        </Col>
                    </Row>
                </Header>
                <div id="scrollWrap" style={style.wrap}>
                    {/* {this.getPage()} */}
                    <Hot visible={this.visible('hot')} {...this.props} />
                    <Featured visible={this.visible('featured')}  {...this.props} />
                    <Near visible={this.visible('near')} {...this.props} />
                </div>
                <ImagePreviewer
                    preview={this.props.preview || {
                        visible: false,
                        src: '',
                        alt: '',
                        width: 0,
                        height: 0,
                        name: '',
                        price: '',
                        indexObj: null
                    }}
                    turnPrev={() => this.turnPrev()}
                    turnNext={() => this.turnNext()}
                    reset={() => { this.reset() }}
                />
            </BaseLayout>
        )
    }
}

export default connect({
    goodList: 'good',
    preview: 'preview',
}, Home)