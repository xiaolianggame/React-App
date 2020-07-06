import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {List, Grid} from 'antd-mobile'

import headporstyle from './headpor.module.css'

class Head extends Component {

    static propTypes = {
        settouxiang: PropTypes.func.isRequired
    }
    
    state = {
        img: null
    }

    constructor (props) {
        super (props)
        this.headerlist = []
        for(let i = 0; i < 8; i++) {
            this.headerlist.push({
                text: '头像' + (i+1),
                icon: require(`./imgs/头像${i+1}.jpg`)
            })
        }
    }

    handleclick = ({text, icon}) => {
        this.setState({img: icon})
        this.props.settouxiang(text)
    }



    render () {
        const {img} = this.state
        const listheader = img ?(
           <div className={headporstyle.touxiang}>
               您选择的头像:<img src={img} alt=""/>
           </div>
        ) : '请选择头像'
        return (
            <List renderHeader={() => listheader}
             className={headporstyle.list}>
                <Grid data={this.headerlist}
                  onClick={this.handleclick}
                />
            </List>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Head)