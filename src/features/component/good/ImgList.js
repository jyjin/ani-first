import React, { Component } from 'react';
import Img from './Img';
const style = {
    size: 160,
    imgs: {
        margin: "0 0 10px 0",
        display: 'flex',
        flexWrap: 'wrap',
    },
}

class ImgList extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            size: style.size,
            page: 1,
            loading: true,
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

    render() {
        var { good } = this.props
        console.log('imglist good == ', good)

        return <div
            key={good._id}
            style={style.imgs}
        >
            {good.imgs && good.imgs.map((img, index) => {

                const { width, height } = this.cauImage(img)
                const imgStyle = { display: 'block', width: width, height: height }

                return <Img
                    key={img.fileName}
                    {...this.props}
                    width={width}
                    height={height}
                    style={imgStyle}
                    img={img}
                    imgIndex={index}
                    size={this.state.size}
                />
            })}
        </div>
    }
}

export default ImgList