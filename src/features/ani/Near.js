

import React, { Component } from 'react';
import api from '../../lib/hapi'
import '../../style/traffic-light.css';

const TRANFFIC_LIGHT_SETTING = {
    red: 15,
    yellow: 3,
    green: 15,
    // red: 3,
    // yellow: 1,
    // green: 3,
}

var tcs = []
var ts = []

class Near extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            red: '',
            yellow: '',
            green: '',
            tc: []
        }
    }

    setLight = (color, time) => {
        var p = new Promise(resolve => {
            this.timeTick(color, time)
            var t = setTimeout(() => {
                clearTimeout(t)
                ts.splice(ts.findIndex(tt => t === tt), 1)
                resolve({ color, time })
            }, time * 1000)
            ts.push(t)

        })
        return p
    }


    timeTick = (color, time) => {
        var t = time
        var tc = setInterval(() => {
            if (t === 0) {
                clearInterval(tc)
                tcs.splice(tcs.findIndex(t => t === tc), 1)
                console.log('change tcs == ', tcs)
                return
            }
            console.log(`Traffic light: ${color} == ${t}s`)
            this.setStyle(color, t--)
        }, 1000)
        tcs.push(tc)
        console.log('tcs == ', tcs)
    }

    clearTimeTick = () => {
        console.log('clear tcs == ', tcs)
        for (let i = 0; i < tcs.length; i++) {
            console.log('clear ' + tcs[i])
            clearInterval(tcs[i])
        }
        tcs = []

        console.log('clear ts == ', tcs)
        for (let i = 0; i < ts.length; i++) {
            console.log('clear ' + ts[i])
            clearTimeout(ts[i])
        }
        ts = []
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
            if (this.TrafficLight) {
                this.TrafficLight()
            }
        })
    }

    componentDidMount() {
        this.TrafficLight()
    }

    componentWillUnmount() {
        this.clearTimeTick()
        this.TrafficLight = null
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
