import React, { Component } from 'react';
import { message } from 'antd';
import api from '../../../lib/hapi';
import { GOOD_LIST } from '../../../redux/action/actionTypes';
import { siteUrl } from '../../../lib/config';
import connect from '../../../redux/connect';
import Good from './Good';


// const style = {

// }

var t = Number(new Date())

class GoodList extends Component {
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

    getGoodList(down) {
        if (down) {
            this.props.setLoadingDown(true)
        } else {
            this.props.setLoading(true)
        }

        api.getGoodList({ page: this.state.page }).then(json => {
            if (json.res > 0) {

                var pros = []
                if (!json.data.length) {
                    if (down) {
                        this.props.setLoadingDown(false)
                        this.setState({
                            page: this.state.page - 1
                        })
                    } else {
                        this.props.setLoading(false)
                        this.setState({
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
                    this.props.dispatch(GOOD_LIST, {
                        goodList: result[result.length - 1].data,
                        prevGoodList: down ? [] : this.props.goodList || []
                    })
                    if (down) {
                        this.props.setLoadingDown(false)
                    } else {
                        this.props.setLoading(false)
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

    onScroll = () => {

        var el = document.getElementById('scrollWrap')
        el.onscroll = () => {
            //文档内容实际高度（包括超出视窗的溢出部分）
            var scrollHeight = el.scrollHeight
            //滚动条滚动距离
            var scrollTop = el.scrollTop
            //窗口可视范围高度
            var clientHeight = el.clientHeight
            //检查时间标志
            var t1 = Number(new Date())
            if (t1 - t > 1000) {
                if (clientHeight + scrollTop >= scrollHeight) {
                    this.setState(state => ({
                        page: state.page + 1
                    }), this.getGoodList)
                    t = t1
                } else if (scrollTop <= 0) {
                    this.setState(state => ({
                        page: 1,
                    }), () => {
                        this.getGoodList('down')
                    })
                }
            }
        }
    }


    render() {

        var { goodList } = this.props;
        // console.log('goodlist == ', goodList)

        return <div>
            {goodList && goodList.length && goodList.map((good, index) => {
                console.log('goodlist good == ', good)
                return <Good
                    key={good._id}
                    {...this.props}
                    good={good}
                    index={index}
                />
            })}
        </div>
    }
}

export default connect({
    goodList: 'good',
}, GoodList)