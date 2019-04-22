import React, { Component } from 'react';




var timeOutEvent = 0
const timeInterval = 1000

class TouchEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onEnter = (e) => {
        if (e.keyCode === 13) {
            // scope[fun](data)
        }
    }

    longPress = () => {
        timeOutEvent = 0;
        // console.log("长按事件触发");
        this.props.longPress()
    }

    onTouchStart = (e) => {
        // console.log('==> touchStart')
        timeOutEvent = setTimeout(() => {
            this.longPress(e)
        }, timeInterval);
        // e.preventDefault();
    }

    onTouchMove = (e) => {
        // console.log('==> touchMove')
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
    }

    onTouchEnd = (e) => {
        // console.log('==> touchEnd')
        clearTimeout(timeOutEvent);
        if (timeOutEvent !== 0) {
            // console.log("你这是点击，不是长按");
        }
        return false;
    }

    onClick = e => {

    }

    render() {


        return (
            <div
                {...this.props}
                onClick={this.onClick}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                onEnter={this.onEnter}
            >
                {this.props.children}
            </div>
        );
    }
}

export default TouchEvent