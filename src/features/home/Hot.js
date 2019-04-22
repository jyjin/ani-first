import React, { Component } from 'react';
import BaseLayout from '../layout/BaseLayout';
import { Layout, Menu, Row, Col, message } from 'antd';
import { Spin } from 'antd';
import api from '../../lib/hapi';
import { GOOD_LIST } from '../../redux/action/actionTypes';
import connect from '../../redux/connect';
import { siteUrl } from '../../lib/config';
import TouchEvent from '../component/TouchEvent';
import ImagePreviewer from '../component/ImagePreviewer';
import Swipe from 'react-easy-swipe';
import { PREVIEW } from '../../redux/action/actionTypes';

const style = {
    header: { padding: '0 12px', background: '#fff' },
    row: { margin: '0', padding: '0', background: '#fff', 'borderBottom': '1px solid #e8e8e8' },
    wrap: {
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    good: {
        margin: '5px 0',
        padding: '20px',
        background: 'white',
        // minWidth:'410px',
    },
    imgs: {
        margin: "0 0 10px 0",
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
    },
    loading: {
        margin: '20p auto',
    }
}

var t = Number(new Date())

class Hot extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            size: 160,
            page: 1,
            loading: true,
        }
    }

    componentDidMount() {
        this.getGoodList()
        this.onScroll();
    }

    onScroll = () => {

        var el = document.getElementById('scrollWrap')
        el.onscroll = () => {
            //文档内容实际高度（包括超出视窗的溢出部分）
            var scrollHeight = el.scrollHeight
            //滚动条滚动距离
            var scrollTop = el.scrollTop
            //窗口可视范围高度
            var clientHeight = el.clientHeight

            if (clientHeight + scrollTop >= scrollHeight) {
                var t1 = Number(new Date())
                if (t1 - t > 1000) {
                    this.setState(state => ({
                        page: state.page + 1
                    }), this.getGoodList)
                    t = t1
                }
            } else if (scrollTop < 0) {
                this.setState(state => ({
                    page: 1,
                }), () => {
                    this.getGoodList('down')
                })
            }

        }
    }

    getGoodList(down) {
        if (down) {
            this.setState({
                loadingDown: true
            })
        } else {
            this.setState({
                loading: true
            })
        }

        api.getGoodList({ page: this.state.page }).then(json => {
            if (json.res > 0) {

                var pros = []
                if (!json.data.length) {
                    if (down) {
                        this.setState({
                            loadingDown: false,
                            page: this.state.page - 1
                        })
                    } else {
                        this.setState({
                            loading: false,
                            page: this.state.page - 1
                        })
                    }
                    message.config({
                        top: 'calc(100vh - 100px)',
                        // bottom: 100,
                        maxCount: 1
                    })
                    message.warning('没有更多')
                    var el = document.getElementById('scrollWrap')
                    var clientHeight = el.clientHeight
                    var scrollHeight = el.scrollHeight
                    console.log('scroll height == ', scrollHeight)
                    el.scrollTop = scrollHeight - clientHeight - 10

                    return;
                }
                json.data && json.data.map(item => {
                    item.imgs && item.imgs.map(img => {
                        pros.push(new Promise(resolve => {
                            this.getImage(img, (err, result) => {
                                if (err) {
                                    img = result
                                } else {
                                    img = result
                                }
                                resolve(json)
                            })
                        }))
                    })
                })

                Promise.all(pros).then(result => {
                    this.props.dispatch(GOOD_LIST, { goodList: result[result.length - 1].data, prevGoodList: down ? [] : this.props.goodList || [] })
                    if (down) {
                        this.setState({
                            loadingDown: false
                        })
                    } else {
                        this.setState({ loading: false })
                    }
                })

            } else {

            }
        })
    }

    getImage = (image, cb) => {
        var img_url = `${siteUrl}/${image.fileName}?` //+ Date.parse(new Date());
        // 创建对象
        var img = new Image();
        // 改变图片的src
        img.src = img_url;

        // 加载完成执行
        img.onload = function () {
            image.width = img.width
            image.height = img.height
            cb(null, image)
        };

        img.onerror = function () {
            image.width = 0
            image.height = 0
            image.error = true
            cb('image not found', image)
        }
    }

    cauImage = (img) => {
        // w/h = w/300
        const { size } = this.state

        if (img.width > img.height) {
            return {
                width: img.width / img.height * size,
                height: size,
            }
        } else {
            return {
                width: size,
                height: size / (img.width / img.height),
            }
        }
    }

    longPress = (_img, _item, _indexObj) => {
        var img = JSON.parse(JSON.stringify(_img))
        var item = JSON.parse(JSON.stringify(_item))
        var indexObj = JSON.parse(JSON.stringify(_indexObj))

        var preview = {
            visible: true,
            src: siteUrl + '/' + img.fileName,
            fileName: img.fileName,
            alt: img.realName,
            width: img.width,
            height: img.height,
            name: item.name,
            price: item.price,
            indexObj
        }
        this.props.dispatch(PREVIEW, { preview })
    }

    onSwipeDown = () => {
        this.getGoodList('down')
    }

    onSwipeUp = () => {
        this.setState(state => ({
            page: state.page + 1,
        }), this.getGoodList)
    }

    render() {
        return (
            // <Swipe
            //     // onSwipeUp={this.onSwipeUp}
            //     // onSwipeDown={this.onSwipeDown}
            //     style={{ minHeight: 'calc(100vh - 52.5px - 66px' }}
            // >
            <div style={Object.assign({}, style.wrap, { display: this.props.visible ? 'block' : 'none' })}>
                {this.state.loadingDown ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <Spin size="large" tip="数据刷新中..." />
                </div> : null}

                {this.props.goodList && this.props.goodList.length && this.props.goodList.map((item, itemIndex) => {

                    return <div key={item._id}
                        style={style.good}
                        className="flexWidth"
                    >
                        <div key={item._id}
                            style={style.imgs}>
                            {item.imgs && item.imgs.map((img, imgIndex) => {
                                var { width, height } = this.cauImage(img)
                                return <div
                                    key={img.fileName.toString()}
                                    style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: 'space-around',
                                        // border: '2px solid gray',
                                        margin: '3px',
                                        width: this.state.size,
                                        height: this.state.size,
                                        background: 'gray',
                                        overflow: 'hidden',
                                        // textAlign: 'center', verticalAlign: 'middle'
                                    }}>
                                    {!img.error ? <TouchEvent
                                        className="no-touch"
                                        longPress={() => this.longPress(img, item, { itemIndex, imgIndex })}
                                    >
                                        <img key={'img_' + item.fileName}
                                            // onClick={() => this.longPress(img, item, { itemIndex, imgIndex })}
                                            style={{ display: 'block', width: width, height: height }}
                                            src={siteUrl + '/' + img.fileName} alt={img.realName}
                                        />
                                    </TouchEvent> : <div style={{ width: this.state.size, height: this.state.size, background: '#eee', textAlign: 'center', color: 'white', lineHeight: '158px', fontSize: '40px' }}>AniFirst</div>}
                                </div>
                            })}
                        </div>
                        <p key={'p_' + item._id} style={{ display: 'flex', justifyContent: "space-between" }}>
                            <span>{item.name}</span>
                            <span>价格：{item.price}￥</span>
                        </p>
                    </div>
                })}
                {this.state.loading ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <Spin size="large" tip="奋力加载中..." />
                </div> : null}
            </div>
            // </Swipe>
        )
    }
}

export default connect({
    goodList: 'good',
    preview: 'preview',
}, Hot)