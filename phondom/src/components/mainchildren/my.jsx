import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, WingBlank} from 'antd-mobile'


import mystyle from './my.module.css'




class My extends Component {

    state = {
        item: []
    }

    componentDidMount() {
      
    }

    getimg() {
        let img = ''
        const loginuser = JSON.parse(window.localStorage.getItem('loginuser'))
        const windowstate = JSON.parse(window.localStorage.getItem('userdata'))

        for(let i = 0; i < windowstate.length; i++) {
            if(windowstate[i].username === loginuser.username && windowstate[i].usertype === loginuser.usertype) {
                if(windowstate[i].touxiang) {
                    const prefix = windowstate[i].touxiang
                    const dizi = require(`../headportrait/imgs/${prefix}.jpg`)
                    img = dizi 
                } else {
                    img = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                }
            }
        }
        return img
    }
    toinfor = () => {
        const type =JSON.parse(window.localStorage.getItem('loginuser')).usertype
        if(type === '老板') {
            this.props.history.replace('/bossinfor')
        } else {
            this.props.history.replace('/jobs')
        }
    }
    render () {
        const alert = Modal.alert;
        let user = {}
        const loginuser = JSON.parse(window.localStorage.getItem('loginuser'))
        const windowstate = JSON.parse(window.localStorage.getItem('userdata'))
        for(let i = 0; i < windowstate.length; i++) {
             if(windowstate[i].username === loginuser.username && windowstate[i].usertype === loginuser.usertype) {
                user = windowstate[i]
             }
         }
        return (
            
            <div className={mystyle.imgdiv}>
               <img src={this.getimg()} alt=""/>
               <div>用户名:&nbsp;{user.username}</div>
               <div>身&nbsp;&nbsp;份:&nbsp;{user.usertype}</div>
               <div className={mystyle.Button}>
                <Button type='ghost' onClick={this.toinfor}>完善信息</Button>
               <WingBlank>
               <Button type='warning' onClick={() =>
               alert('退出登录', '你确定要推出登陆？？？', [
              { text: '取消', onPress: () => {} },
              { text: '确定', onPress: () => {
                  const getstate = []
                window.localStorage.setItem('loginuser', JSON.stringify(getstate))
                this.props.history.replace('/login')
              } },
                ])
                    }
                 >退出登录</Button>
               </WingBlank>
               </div>
            </div>
        )
    }
    
}

export default connect(
    state => ({}),
    {}
)(My)