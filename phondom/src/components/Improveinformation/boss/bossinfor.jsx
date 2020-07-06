import React, {Component} from 'react'
import {connect} from 'react-redux'

import {NavBar, InputItem, TextareaItem, Button, Icon, Toast} from 'antd-mobile'

import bossinforstyle from './bossinfor.module.css'

import Head from 'components/headportrait/headportrait'

class Bossinfor extends Component {

    state = {
        touxiang: '',
        zhiwei: '',
        gongsi: '',
        xinzi: '',
        yaoqiu:''
    }
    upda = (text, value) => {
        this.setState(
            {[text]: value}
        )
    }
    settouxiang = (touxiang) => {
        this.setState({
            touxiang
        })
    }
    save = () => {
        
        let user = []
        let userpassword = 0
        let username = ''
        let type = ''
        const loginuser = JSON.parse(window.localStorage.getItem('loginuser'))
        if(window.localStorage.getItem('userdata') && JSON.parse(window.localStorage.getItem('userdata')).length !==0) {
            user = JSON.parse(window.localStorage.getItem('userdata'))
            
            for(let i = 0; i < user.length; i++) {
                if(user[i].username === loginuser.username) { 
                    
                    username = user[i].username
                    type = user[i].usertype
                    userpassword = user[i].password
                    user.splice(i, 1); 
                }
            }
        }
       const infordate = {}
       infordate.touxiang = this.state.touxiang
       infordate.username = username
       infordate.password = userpassword
       infordate.usertype = type
       infordate.zhiwei = this.state.zhiwei
       infordate.gongsi = this.state.gongsi
       infordate.xinzi = this.state.xinzi
       infordate.yaoqiu = this.state.yaoqiu
       user.push(infordate)
       window.localStorage.setItem('userdata',JSON.stringify(user))
       Toast.loading('完善成功!', 2, () => this.props.history.replace('/main'))
       
    }

    render () {
         return (
            <div>
                <NavBar className={bossinforstyle.NavBar}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.replace('/main')}
                >老板完善信息</NavBar>
                <Head settouxiang={this.settouxiang}/>
                <div className={bossinforstyle.inputdiv}>
                <InputItem placeholder='请输入招聘职位' onChange={value => {this.upda('zhiwei', value)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={value => {this.upda('gongsi', value)}}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={value => {this.upda('xinzi', value)}}>职位薪资:</InputItem>
                <TextareaItem className={bossinforstyle.Textareai} title='职位要求:'
                    rows={4}
                    onChange={value => {this.upda('yaoqiu', value)}}
                 />
                 <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Bossinfor)