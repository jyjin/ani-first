import React, { Component } from 'react';
import BaseLayout from './layout/BaseLayout';
import api from '../lib/hapi';
import { GOOD_LIST } from '../redux/action/actionTypes';
import connect from '../redux/connect';
import { siteUrl } from '../lib/config';

const style = {
    wrap: {
        padding: '20px 0px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    good: {
        margin: '5px',
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
}

class Home extends Component {
    constructor(props, context) {
        super(props)
        console.log('...props: ', this.props)
        this.state = {
            size: 158
        }
    }

    componentDidMount() {

        api.getGoodList().then(json => {
            if (json.res > 0) {

                var pros = []
                json.data && json.data.map(item => {
                    item.imgs && item.imgs.map(img => {
                        pros.push(new Promise(resolve => {
                            this.getImage(img, (result) => {
                                img = result
                                resolve(json)
                            })
                        }))
                    })
                })

                Promise.all(pros).then(result => {
                    this.props.dispatch(GOOD_LIST, { goodList: result[result.length - 1].data })
                })

            } else {
                this.props.info('获取商品失败')
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
            cb(image)
        };
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

    render() {

        console.log('goodList == ', this.props.goodList)

        return (
            <BaseLayout>
                <div style={style.wrap}>
                    {this.props.goodList && this.props.goodList.length && this.props.goodList.map(item => {

                        return <div key={item._id}
                            style={style.good}
                            className="flexWidth"
                        >
                            <div key={item._id}
                                style={style.imgs}>


                                {item.imgs && item.imgs.map(img => {
                                    var { width, height } = this.cauImage(img)
                                    return <div key={Math.random(0, 1)} style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: 'space-around',
                                        // border: '2px solid gray',
                                        margin: '2px',
                                        width: this.state.size,
                                        height: this.state.size,
                                        background: 'gray',
                                        overflow: 'hidden',
                                        // textAlign: 'center', verticalAlign: 'middle'
                                    }}>
                                        <img key={'img_' + item.fileName} style={{ display: 'block', width: width, height: height }} src={siteUrl + '/' + img.fileName} alt={img.realName} />
                                    </div>
                                })}
                            </div>
                            <p key={'p_' + item._id} style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span>{item.name}</span>
                                <span>价格：{item.price}￥</span>
                            </p>
                        </div>
                    })}
                </div>
            </BaseLayout>
        )
    }
}

export default connect({
    goodList: 'good'
}, Home)