import React, { Component } from 'react';
import { Icon } from 'antd';
import connect from '../../../redux/connect';
import api from '../../../lib/hapi';
import { UPDATE_VOTE } from '../../../redux/action/actionTypes';

const style = {
    goodCommentInfo: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', fontSize: '12px',
        // borderTop: '1px solid #eee',
    },
    goodCommentItem: { display: 'block', padding: '5px 5px', flexGrow: 1, cursor: 'pointer' },
    goodCommentIcon: { marginRight: 10 },
}

class Comment extends Component {
    constructor(props, context) {
        super(props)
        this.state = {

        }
    }

    apiVote() {
        api.vote({
            goodId: this.props.good._id,
            userId: this.props.user._id
        }).then(json => {
            if (json.res > 0) {
                this.props.dispatch(UPDATE_VOTE, {
                    goodList: this.props.goodList,
                    good: json.data
                })
            } else {
                // this.props.error('')
                console.error('点赞失败')
            }

        })
    }

    apiDisVote() {
        api.disvote({
            goodId: this.props.good._id,
            userId: this.props.user._id
        }).then(json => {
            if (json.res > 0) {
                this.props.dispatch(UPDATE_VOTE, {
                    goodList: this.props.goodList,
                    good: json.data
                })
            } else {
                // this.props.error('')
                console.error('取消点赞失败')
            }
        })
    }

    onCommentClick = (type) => {
        if (type === 'chat') {

        } else if (type === 'vote') {
            this.apiVote()
        } else {
            this.apiDisVote()
        }
    }

    getStyle = (type)=>{
        // type 接受 voteIds 和 disvoteIds字段
        var userId = this.props.user._id
        var good = this.props.good
        var _style = {} 

        if(~good[type].indexOf(userId)){
            _style = Object.assign({}, style.goodCommentItem, {color:'#25b864'})
        }else{
            _style = style.goodCommentItem
        }

        return _style
     
    }

    render() {

        const good = this.props.good

        return <div style={style.goodCommentInfo}>
            <span style={this.getStyle('voteIds')} onClick={() => this.onCommentClick('vote')}>
                <Icon style={style.goodCommentIcon} type="like" />
                {good.voteIds.length || 0}
            </span>
            <span style={this.getStyle('disvoteIds')} onClick={() => this.onCommentClick('disvote')}>
                <Icon style={style.goodCommentIcon} type="dislike" />
                {good.disvoteIds.length || 0}
            </span>
            <span style={style.goodCommentItem} onClick={() => this.onCommentClick('chat')}>
                <Icon style={style.goodCommentIcon} type="message" />
                {good.ask || 0}
            </span>
        </div>
    }
}

export default connect({
    goodList: 'good',
}, Comment)