import React, {Component} from 'react'
import {connect} from 'react-redux'


import {List} from 'antd-mobile'

import homestyle from './home.module.css'



class Home extends Component {

    state = {
        item: [],
        type: ''
    }
    
    componentWillMount() {
       let type = ''
       this.setState({type: JSON.parse(window.localStorage.getItem('loginuser')).usertype})
       const loginuser =JSON.parse(window.localStorage.getItem('loginuser'))
       if(loginuser.usertype === '老板') {
           type = '求职者'
       } else {
           type = '老板'
       }
       const windowstate =JSON.parse(window.localStorage.getItem('userdata'))
       for(let i = 0; i < windowstate.length; i++) {
         if(windowstate[i].usertype === type) {
            const {item} = this.state
            item.push(windowstate[i])
            this.setState({item})
         }
       }
    }
    getimg(obj) {
        let img = ''
        if(obj.touxiang) {
            const prefix = obj.touxiang
            const dizi = require(`../headportrait/imgs/${prefix}.jpg`)
            img = dizi 
        } else {
            img = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
        }
        return img
    }
    render () {
        const {Item} = List
        const {Brief} = Item
        return (
            <div>
                {
                this.state.item.map(
                    (item, index) => <List key={index}>
                    <Item
                     arrow="horizontal"
                     thumb={this.getimg(item)}
                     multipleLine
                     onClick={() => {
                         window.localStorage.setItem('dian', JSON.stringify(item))
                         this.props.history.replace('/main/chat')
                         
                        }
                    }
                    >{item.username}
                    <div className={this.state.type === '求职者' ? homestyle.type : 'no'}>
                    <Brief>求职岗位:&nbsp;&nbsp;{item.gangwei}</Brief>
                    <Brief>个人介绍:&nbsp;&nbsp;{item.jieshao}</Brief>
                    </div>
                    <div className={this.state.type === '老板' ? homestyle.type : 'no'}>
                    <Brief>公司:&nbsp;&nbsp;{item.gongsi}</Brief>
                    <Brief>招人岗位:&nbsp;&nbsp;{item.zhiwei}</Brief>
                    <Brief>薪资:&nbsp;&nbsp;{item.xinzi}</Brief> 
                    <Brief>要求:&nbsp;&nbsp;{item.yaoqiu}</Brief>   
                    </div>
                    </Item>
                    </List>
                 )
                }
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Home)