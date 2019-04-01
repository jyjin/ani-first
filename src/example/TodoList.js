import React ,{Component}from 'react';
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'
import store from '../store/index';
import {getInputChangeAction,getAddItemAction,getDeleteItemAction}from '../store/actionCreators';//从封装的actionCreator解构出自定义的函数

class TodoList extends  Component{

    constructor(props){
        super(props);
        this.state=store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelet = this.handleItemDelet.bind(this);
        //监听store里面的变化，只要一变化
        // 只要store里面的数据发生改变，则立即执行subscribe函数里的函数
        store.subscribe(this.handleStoreChange)
    }
    
    render(){
        return(
            <div style={{margin:'10px',marginLeft:'10px'}}>
                <div>
                    <Input
                        value={this.state.inputValue}
                        placehoder="todo list "
                        style={{width:'300px'}}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        type= "primary"
                        onClick={this.handleBtnClick}
                    >提交</Button>
                </div>
                <List
                    style={{marginTop:'10px',width:'300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item,index) => (<List.Item onClick={this.handleItemDelet.bind(this, index)} >{item}</List.Item>)}//这个这个参考antd官网
                />
                </div>
        )
    }

    handleInputChange=(e)=>{
        // console.log(e.target.value);
        // 获取input的value值
        // 告诉store,输入的类型和输入框中的值
        // const  action={
        //     // type:'change_input_value',
        //     type:CHANGE_INPUT_VALUE,//由公共常量代替，防止，字符串不一致
        //     value: e.target.value,
        // };
        const action=getInputChangeAction(e.target.value);
        //把action传给store , store自动传给reducer
        store.dispatch(action);
    };

    //reducer返回newState之后，store传递newState给组件
    handleStoreChange=()=>{
        this.setState(store.getState());
        // console.log('store change')
        // 感知store发生变化之后，从store里获取最新的数据，然后进行设置
    };

    //提交按钮(又一次流程)
    handleBtnClick=()=>{
        // //action封装之前
        // const  action={
        //     // type:'add_todo_item'
        //     type:ADD_TODO_ITEM
        // };
        // action封装之后
        const action=getAddItemAction();
        store.dispatch(action);
    };

    //点击删除
    handleItemDelet=(index)=>{
        // const  action={
        //     // type:'delete_todo_item',
        //     type:DELETE_TODO_ITEM,
        //     index:index,
        // };
        // action封装之后
        const action=getDeleteItemAction(index);
        store.dispatch(action);
    }


}
export default TodoList;
