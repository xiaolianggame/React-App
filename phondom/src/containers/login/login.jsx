/*
登陆路由组件
 */
import React, {Component} from 'react'
import logistyle from './logincss/login.module.css'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'



import img from 'unchanging/img/weimei.jpg'



import {
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'

import Navigation from 'components/navigation/navigation'
import Logo from 'components/logo/logo'

class Login extends Component {
    
    state = {
        username: '',
        password: '',
        usertype: '求职者'
    }
    componentDidMount() {
        if(window.localStorage.getItem('loginuser') && JSON.parse(window.localStorage.getItem('loginuser')).length !==0) {
            const type =JSON.parse(window.localStorage.getItem('loginuser'))
            Toast.loading('你一登陆过，正在自动登陆...', 3, () => {
                if(type.usertype === '老板') {
                    this.props.history.replace('/bossinfor')
                } else {
                    this.props.history.replace('/jobs')
                }
            })
        }
    }
    Userinputinformation (text, value) {
        this.setState({
            [text]: value
        })
    }
    getwinodwsate() {
        let windowstate = []
        if(window.localStorage.getItem('userdata')) {
           windowstate = JSON.parse(window.localStorage.getItem('userdata'))
        }
        return windowstate
    }
    doesitexist (date, username, password, usertype) {
        let ok = false
        for(var i = 0; i < date.length; i++) {
            if(date[i].username === username && date[i].usertype === usertype && date[i].password === password) {
                ok = true
                 break
            } 
        }
        return ok
    }
    loginclick = () => {
        const receive = this.getwinodwsate()
        if(receive.length === 0) {
            Toast.fail('你还没有注册',2)
        } else {
            const {username} = this.state
            const {password} = this.state
            const {usertype} = this.state
            const yes = this.doesitexist(receive, username, password, usertype)
            if(yes) {
                const loginuser = {}
                const getstate = {}
                loginuser.username = username
                loginuser.password = password
                loginuser.usertype = usertype
                getstate.username = username
                getstate.usertype = usertype

                window.localStorage.setItem('loginuser', JSON.stringify(getstate))
                Toast.loading('校验信息中...', 2, () => {
                    if(usertype === '老板') {
                        this.props.history.replace('/bossinfor')
                    } else {
                        this.props.history.replace('/jobs')
                    }
                })
            } else {
                Toast.fail('请输入正确信息！', 2)
            }
        }
    }
    toregister = () => {
        this.props.history.replace('/register')
    }
    render () {

        const ListItem = List.Item
        const {usertype} = this.state
        return (
            <div>
               <Navigation center='小良求职'></Navigation>
               <div className={logistyle.logodiv}>
                <Logo img={img}></Logo>
               </div>
              <WingBlank>
              <div className={logistyle.WingBlank}>
                   <List>
                       <WhiteSpace />
                       <InputItem placeholder="请输入用户名" autoFocus onChange={value => {this.Userinputinformation('username', value)}}>用户名:</InputItem>
                       <WhiteSpace />
                       <InputItem placeholder="请输入密码" ref={input => this.input=input} type='password' onChange={value => {this.Userinputinformation('password', value)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                       <WhiteSpace />
                       <WhiteSpace />
                       <WhiteSpace />
                       <WhiteSpace />
                       <ListItem>
                           <span>您的身份</span>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={usertype === '求职者'} onChange={() => {this.Userinputinformation('usertype', '求职者')}}>求职者</Radio>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={usertype === '老板'} onChange={() => {this.Userinputinformation('usertype', '老板')}}>老板</Radio>
                       </ListItem>
                       <Button type='primary' onClick={this.loginclick}>登陆</Button>
                       <Button onClick={this.toregister}>注册</Button>
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
)(Login)