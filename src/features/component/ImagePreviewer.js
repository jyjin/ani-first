import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import Swipe from 'react-easy-swipe';

class ImagePreviewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.preview.visible || false,
            src: this.props.preview.src,
            alt: this.props.preview.alt,
            width: this.props.preview.width,
            height: this.props.preview.height,
            name: this.props.preview.name,
            price: this.props.preview.price
        }
    }

    cauImage = () => {
        const sw = document.body.clientWidth
        const sh = document.body.clientHeight

        var { width, height } = this.state

        // console.log(sw, ' X ', sh, ' -- ', width, ' X ', height)


        var r = width / height
        var rw = sw / sh;

        // console.log(rw, ' -- ', r)

        if (r > rw) {
            return {
                width: sw,
                height: sw / r
            }
        } else {
            return {
                width: r * sh,
                height: sh
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                visible: nextProps.preview.visible,
                src: nextProps.preview.src,
                alt: nextProps.preview.alt,
                width: nextProps.preview.width,
                height: nextProps.preview.height,
                name: nextProps.preview.name,
                price: nextProps.preview.price
            })
        }
    }

    onSwipeLeft = (e) => {
        this.props.turnNext()
    }

    onSwipeRight = (e) => {
        this.props.turnPrev()
    }

    render() {
        return <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0, lef: 0, zIndex: 10,
                background: 'black',
                // margin: '0 -20px',
                display: 'flex',
                alignItems: 'center',
                transform: 'scale(' + (this.state.visible ? 1 : 0) + ')',
                webkitTransition: 'all .5s',
            }}
        >
            <div onClick={() => {
                this.setState({
                    visible: false
                })
                this.props.reset()
            }}>
                <Swipe
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight}
                >
                    {this.state.error
                        ?
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: '300px', height: '300px', background: '#eee',
                                textAlign: 'center', color: 'white', lineHeight: '158px', fontSize: '40px'
                            }}
                            >AniFirst</div>
                        </div>
                        :
                        <img
                            src={this.state.src}
                            width={this.state.cw}
                            height={this.state.ch}
                            alt={this.state.alt}
                            onLoad={() => {
                                this.setState({
                                    cw: this.cauImage().width,
                                    ch: this.cauImage().height
                                })
                            }}
                            onError={
                                () => {
                                    this.setState({
                                        // error: true
                                    })
                                }} />}
                </Swipe>
            </div>
            <div
                style={{
                    position: 'absolute', bottom: 0,
                    display: 'flex',
                    justifyContent: "space-between",
                    padding: '10px 20px',
                    width: '100%',
                    color: '#fff',
                    background: 'rgba(0, 0, 0, 0.5)',
                }}>
                <span>{this.state.name}</span>
                <span>价格：{this.state.price}￥</span>
            </div>
        </div>
    }
}

export default ImagePreviewer