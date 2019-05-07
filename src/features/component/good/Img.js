import React, { Component } from 'react';
import connect from '../../../redux/connect';
import { siteUrl } from '../../../lib/config';
import TouchEvent from '../TouchEvent';
import { PREVIEW } from '../../../redux/action/actionTypes';

const style = {
    imgWrap: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-around',
        margin: '3px',
        background: 'gray',
        overflow: 'hidden',
    },
    imgError: {
        background: '#eee',
        textAlign: 'center',
        color: 'white',
        lineHeight: '158px',
        fontSize: '40px'
    },
}

class Img extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            page: 1,
            loading: true,
        }
    }

    cauImage = (img) => {
        // w/h = w/300
        const { size } = this.props

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

    render() {

        var { good, img, style: imgStyle, index, imgIndex, size } = this.props

        const Img = <TouchEvent
            className="no-touch"
        // longPress={() => this.longPress(img, good, { itemIndex: index, imgIndex })}
        >
            <img
                key={'img_' + img.fileName}
                style={imgStyle}
                src={siteUrl + '/' + img.fileName}
                alt={img.realName}
                onClick={() => this.longPress(img, good, { itemIndex: index, imgIndex })}
            />
        </TouchEvent>


        var ErrorImg = <div
            style={
                Object.assign({
                    width: size,
                    height: size
                },
                    style.imgError)
            }
        >AniFirst</div>

        return <div
            style={Object.assign({
                width: size,
                height: size
            }, style.imgWrap)}>

            {img.error ? ErrorImg : Img}

        </div>
    }
}


export default connect({
    preview: 'preview',
}, Img)

