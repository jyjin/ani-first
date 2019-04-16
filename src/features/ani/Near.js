

import React, { Component } from 'react';
import api from '../../lib/hapi'
import '../../style/traffic-light.css';

const TRANFFIC_LIGHT_SETTING = {
    red: 15,
    yellow: 3,
    green: 15
}

class Near extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            red: '',
            yellow: '',
            green: ''
        }
    }

    setLight = (color, time) => {
        var p = new Promise(resolve => {
            this.timeTick(color, time)
            setTimeout(() => {
                resolve({ color, time })
            }, time * 1000)

        })
        return p
    }


    timeTick = (color, time) => {
        var t = time
        var tc = setInterval(() => {
            if (t == 0) {
                clearInterval(tc)
                return
            }
            console.log(`Traffic light: ${color} == ${t}s`)
            this.setStyle(color, t--)
        }, 1000)
    }

    setStyle = (color, time) => {
        time = time + ''
        if (time / 10 < 1) {
            time = '0' + time
        }

        var { red, yellow, green } = this.state

        red = ''
        yellow = ''
        green = ''

        if (color === 'red') {
            red = time
        } else if (color === 'yellow') {
            yellow = time
        } else {
            green = time
        }

        this.setState({
            red,
            yellow,
            green
        })
    }


    TrafficLight = () => {
        this.setLight('red', TRANFFIC_LIGHT_SETTING.red).then(v => {
            return this.setLight('yellow', TRANFFIC_LIGHT_SETTING.yellow)
        }).then(v => {
            return this.setLight('green', TRANFFIC_LIGHT_SETTING.green)
        }).then(v => {
            this.TrafficLight()
        })
    }

    componentDidMount() {
        this.TrafficLight()
    }

    sendRequest() {
        for (var i = 0; i < 3; i++) {
            api.getUserList().then(json => {
                console.log('=== i === ', json)
            })
        }
    }

    getStyle = (color) => {
        return color ? { opacity: 1 } : { opacity: 0.5 }
    }

    render() {
        return (
            <div className="traffic-wrap">
                <div className="traffic-light">
                    <div className="red-light" style={this.getStyle(this.state.red)}>{this.state.red}</div>
                    <div className="yellow-light" style={this.getStyle(this.state.yellow)}>{this.state.yellow}</div>
                    <div className="green-light" style={this.getStyle(this.state.green)}>{this.state.green}</div>
                </div>
                <div className="hoz-line"></div>
                <div className="vet-line"></div>
            </div>
        )
    }
}

export default Near;
