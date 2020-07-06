/*
主路由组件
 */
import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {NavBar, Button} from 'antd-mobile'
import mainstyle from './maincss/main.module.css'

import Home from 'components/mainchildren/home'
import My from 'components/mainchildren/my'
import News from 'components/mainchildren/news'
import Chat from 'components/mainchildren/chat/chat'
import Okami from 'components/mainchildren/okami'


export default class Main extends Component {

    state = {
        longinuser : [],
        style: 1,
        text: ''
    }
    componentWillMount () {
      const windowstate = JSON.parse(window.localStorage.getItem('loginuser'))
      const {longinuser} = this.state
      longinuser.push(windowstate)
      this.setState({
        longinuser: windowstate
      })
      if(this.state.longinuser.usertype === '求职者') {
        this.setState({text: '老板列表'})
    } else {
        this.setState({text: '求职者列表'})
    }
    }
    btnactive = () =>{
       this.setState({
           style: 1
       })
       if(this.state.longinuser.usertype === '求职者') {
        this.setState({text: '老板列表'})
    } else {
        this.setState({text: '求职者列表'})
    }
    this.props.history.replace('/main/home')
    }
    btnactive2 = () =>{
        this.setState({
            style: 2
        })
        this.props.history.replace('/main/news')
        this.setState({text: '消息'})
     }
     btnactive3 = () =>{
        this.setState({
            style: 3
        })
        this.props.history.replace('/main/okami')
     }
     btnactive4 = () =>{
        this.setState({
            style: 4
        })
        this.props.history.replace('/main/my')
        this.setState({text: '个人中心'})
     }
    render () {
        
        const btnstyle1 = this.state.style === 1 ? mainstyle.btnactive: mainstyle.noactive
        const btnstyle2 = this.state.style === 2 ? mainstyle.btnactive: mainstyle.noactive
        const btnstyle3 = this.state.style === 3 ? mainstyle.btnactive: mainstyle.noactive
        const btnstyle4 = this.state.style === 4 ? mainstyle.btnactive: mainstyle.noactive
        return (
            <div className='bossdiv'>
              <NavBar>{this.state.text}</NavBar>
              <Switch>
                      <Route path='/main/home' component={Home} />
                      <Route path='/main/my' component={My}/>
                      <Route path='/main/news' component={News}/>
                      <Route path='/main/chat' component={Chat}/>
                      <Route path='/main/okami' component={Okami}/>
                      <Route component={Home}/>   
              </Switch>
              <div className={mainstyle.btndiv}>
               <Button className={btnstyle1} onClick={this.btnactive}>首页</Button>
               <Button className={btnstyle2} onClick={this.btnactive2} >消息</Button>
               <Button className={btnstyle3} onClick={this.btnactive3}>大神级人物</Button>
               <Button className={btnstyle4} onClick={this.btnactive4}>个人</Button>
              </div>
            </div>
        )
    }
    c
}