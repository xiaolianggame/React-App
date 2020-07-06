import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavBar, Icon} from 'antd-mobile'
import axios from 'axios'

import Okamistyle from './okami.module.css'






class Okami extends Component {

    state = {
        loading: false,
        users: [],
        err:'',
        settext: ''
    }
    Icon = () => {
        this.setState({loading: true})
        const text = this.input.value
        const url = `https://api.github.com/search/users?q=${text}`
        axios.get(url).then(response => {
            const arr = []
            this.setState({
            users : arr
            })
            const result = response.data.items
            const {users} = this.state
            for(let i = 0; i < result.length; i++) {
                users.push(result[i])
                this.setState({
                    users
                })
            }
            console.log(this.state.users)
            this.setState({loading: false})
        }).catch(error =>{
           this.setState({
                err: '失败',
                loading: false
           })
           
        })    
    }
    render () {

        return (

            <div>
            <NavBar
              className={Okamistyle.NavBar}
              mode="light"
              icon= '名人堂'
              onLeftClick={() => {}}
              rightContent={[
              <Icon onClick={this.Icon} key="0" type="search" style={{ marginRight: '16px' }} />
            ]}
            ><input ref={input => this.input=input} autoFocus placeholder="请输入关键字搜索" type="text"/></NavBar>
            <div className={Okamistyle.users}>
                {
                    this.state.loading === true ? <h2>搜索中......</h2> : 
                    this.state.users.map((item, index) => <a href={item.html_url} key={index}>
                    <img src={item.avatar_url} alt="图片加载失败!"/>
                    <div>名字:{item.login}</div>
                    </a>)
                }
                {
                     this.state.err === '失败' ? <h2>数据请求失败！</h2> : <div></div>
                }
            </div>
            </div>
        )
    }
    
}

export default connect(
    state => ({}),
    {}
)(Okami)