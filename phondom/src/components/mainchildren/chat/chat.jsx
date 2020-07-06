import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,Icon, List, Button} from 'antd-mobile'


import chatstyle from './chat.module.css'

class Chat extends Component {
    
    state = {
        inputtext: '',
        chatuser: [],
        chatdate: [],
        chatuserarrstate: [],
        Isaid: []

    }
    componentWillMount() {
        const {chatuser} = this.state
        chatuser.push(JSON.parse(window.localStorage.getItem('dian')))
        this.setState({
            chatuser
        })
        this.getuserchat()
    }
    Isaid = () => {
        const {Isaid} = this.state
        if(this.input.value !== '') {
            Isaid.push(this.input.value)
        }
        this.setState({Isaid})
    }
    getimg() {
        let img = ''
        const dian = JSON.parse(window.localStorage.getItem('dian'))
        if(dian.touxiang) {
           const prefix = dian.touxiang
           const dizi = require(`../../headportrait/imgs/${prefix}.jpg`)
           img = dizi 
           } else {
           img = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
          }
        return img
    }
    getuserchat = () => {
        let chatuserarr = []
        const loginuser = JSON.parse(window.localStorage.getItem('loginuser'))
        const windowuser = JSON.parse(window.localStorage.getItem('userdata'))
        const dianwho = JSON.parse(window.localStorage.getItem('dian'))
        for(let i = 0; i < windowuser.length; i++) {
            if(windowuser[i].username === loginuser.username &&
                windowuser[i].usertype === loginuser.usertype
              )
            {
                if(windowuser[i].chatuserarr) {
                    chatuserarr = windowuser[i].chatuserarr
                    console.log(windowuser[i].chatuserarr)
                } else {
                    windowuser[i].chatuserarr = []
                }
            }
        }
        const {chatuserarrstate} = this.state
        const l = this.state.chatuserarrstate.length
        chatuserarrstate.splice(0,l)
        this.setState({
            chatuserarrstate
        })
        for(let i = 0; i < chatuserarr.length; i++) {
            if(chatuserarr[i].username === dianwho.username &&
                chatuserarr[i].usertype === dianwho.usertype
              )
            {
                const {chatuserarrstate} = this.state
               if(chatuserarr[i].chattext !== '') {
                chatuserarrstate.push(chatuserarr[i])
               }
                this.setState({chatuserarrstate})
            }
        }
    }

    sendout = () => {
        const loginuser = JSON.parse(window.localStorage.getItem('loginuser'))
        loginuser.chattext = this.state.inputtext
        const windowuser = JSON.parse(window.localStorage.getItem('userdata'))
        for(let i = 0; i < windowuser.length; i++) {
            if(windowuser[i].username === this.state.chatuser[0].username &&
                windowuser[i].usertype === this.state.chatuser[0].usertype
              )
            {
                if(windowuser[i].chatuserarr) {
                    windowuser[i].chatuserarr.push(loginuser)
                } else {
                    windowuser[i].chatuserarr = []
                    windowuser[i].chatuserarr.push(loginuser)
                }
            }
        }
        window.localStorage.setItem('userdata', JSON.stringify(windowuser))
        this.Isaid()
        this.input.value = ''
    }
    render () {
        const {Item} = List
        const {Brief} = Item
        return (
            
            <div>
            <NavBar className={chatstyle.NavBar}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.replace('/main')}
            >聊天</NavBar>
            <div className={chatstyle.chat}>
               {
                       this.state.chatuserarrstate.map((item, index) => 
                        <List key ={index}>
                        <Item
                        arrow=""
                        thumb= {this.getimg()}
                        multipleLine
                       >{item.username}
                       <Brief>对你说：{item.chattext}</Brief>
                       </Item>
                       </List>
                       )
                   }
                   {
                       this.state.Isaid.map((item, index) => 
                       <div key={index} className={chatstyle.me}>
                           <div>我</div>
                           <span>{item}</span>
                       </div>
                       )
                   }
             </div>
           <div className={chatstyle.TextareaItem}>
           <input type="text"
            ref={input => this.input=input}
            onChange={() => this.setState({inputtext: this.input.value})}
           />
           <Button onClick={this.sendout}>发送</Button>
           </div>
    </div>
        )
    }
    
}

export default connect(
    state => ({}),
    {}
)(Chat)