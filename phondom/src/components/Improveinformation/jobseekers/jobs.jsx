import React, {Component} from 'react'
import {connect} from 'react-redux'

import {NavBar, InputItem, TextareaItem, Button, Icon, Toast} from 'antd-mobile'

import jobsstyle from './jobs.module.css'


import Head from 'components/headportrait/headportrait'

class Jobs extends Component {

    state = {
        touxiang: '',
        gangwei: '',
        jieshao: ''
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
       infordate.gangwei = this.state.gangwei
       infordate.touxiang = this.state.touxiang
       infordate.jieshao = this.state.jieshao
       infordate.username = username
       infordate.password = userpassword
       infordate.usertype = type
       user.push(infordate)
       
       window.localStorage.setItem('userdata',JSON.stringify(user))
       Toast.loading('完善成功!', 2, () => this.props.history.replace('/main'))
       
    }

    render () {
        return (
            <div>
                <NavBar className={jobsstyle.NavBar}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.replace('/main')}
                >求职者完善信息</NavBar>
                <Head settouxiang={this.settouxiang}/>
                <div>
                <InputItem placeholder='请输入求职岗位' onChange={value => {this.upda('gangwei', value)}}>求职岗位:</InputItem>
                <TextareaItem title='个人介绍:'
                    rows={4}
                    onChange={value => {this.upda('jieshao', value)}}
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
)(Jobs)