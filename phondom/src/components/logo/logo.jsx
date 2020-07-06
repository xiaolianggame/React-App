import React, {Component} from 'react'
import PropTypes from 'prop-types'

import logostyle from './logo.module.css'


export default class Logo extends Component {
 
    static propTypes = {
        img: PropTypes.string.isRequired
    }

    render () {
        return (
            <div className={logostyle.logodiv}>
                <img src={this.props.img} alt="logo"/>
            </div>
        )
    }

}
