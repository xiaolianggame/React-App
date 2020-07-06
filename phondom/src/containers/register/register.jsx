/*
注册路由组件
 */
import React, {Component} from 'react'
import registerstyle from './registercss/register.module.css'
import {connect} from 'react-redux'
import img from 'unchanging/img/weimei.jpg'

import {
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
    Toast
} from 'antd-mobile'

import Navigation from 'components/navigation/navigation'
import Logo from 'components/logo/logo'

class Register extends Component {
    
    state = {
        username: '',
        password: '',
        password2: '',
        usertype: '求职者'
    }
    getwindowsate () {
        if (window.localStorage.getItem('userdata')) { 
            return JSON.parse(window.localStorage.getItem('userdata'))     
        } else {
            return []
        }
    }
    doesitexist (date, username, usertype) {
        let ok = false
        for(var i = 0; i < date.length; i++) {
            if(date[i].username === username && date[i].usertype === usertype) {
                ok = false
                 break
            } else {
                ok = true  
            }
        }
        return ok
    }
    adduserstate (arr, obj) {
        obj.username = this.state.username
        obj.password = this.state.password
        obj.usertype = this.state.usertype
        arr.push(obj)
        window.localStorage.setItem('userdata', JSON.stringify(arr))
    }
    Userinputinformation (text, value) {
        this.setState({
            [text]: value
        })
    }
    registerclick = () => {
       let date = this.getwindowsate()
       if (date.length === 0) {
        if (this.state.username !==''
        && this.state.password !== ''
        && this.state.password === this.state.password2) {
            let obj = {}
            this.adduserstate(date, obj)
            Toast.success('注册成功!', 2)
           } else {
            Toast.success('输入为空或两次输入密码不一致!', 2)
           }
       } else {
          let ok = this.doesitexist(date, this.state.username, this.state.usertype)
          if (ok) {
               if (this.state.username !==''
               && this.state.password !== ''
               && this.state.password === this.state.password2) {
                let obj = {}
                this.adduserstate(date, obj)
                Toast.success('注册成功!', 2)
               } else {
                Toast.success('输入为空或两次输入密码不一致!', 2)
               }
          } else {
            Toast.fail('用户已存在', 2)
          }
       }
    }
    tologin = () => {
        this.props.history.replace('/login')
    }
    render () {

        const ListItem = List.Item
        const {usertype} = this.state
        return (
            <div>
               <Navigation center='小良求职'></Navigation>
               <div className={registerstyle.logodiv}>
                <Logo img={img}></Logo>
               </div>
              <WingBlank>
              <div className={registerstyle.WingBlank}>
                   <List>
                      
                       <InputItem placeholder="请输入用户名" autoFocus onChange={value => {this.Userinputinformation('username', value)}}>用户名:</InputItem>
                       <WhiteSpace />
                       <InputItem placeholder="请输入密码" type='password' onChange={value => {this.Userinputinformation('password', value)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                       <InputItem placeholder="请输入确认密码" type='password' onChange={value => {this.Userinputinformation('password2', value)}}>确认密码:</InputItem>
                       <ListItem>
                           <span>您的身份</span>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={usertype === '求职者'} onChange={() => {this.Userinputinformation('usertype', '求职者')}}>求职者</Radio>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={usertype === '老板'} onChange={() => {this.Userinputinformation('usertype', '老板')}}>老板</Radio>
                       </ListItem>
                       <Button type='primary' onClick={this.registerclick}>注册</Button>
                       <Button onClick={this.tologin}>已有账户</Button>
                   </List>
                   </div>
               </WingBlank>
              
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(Register)