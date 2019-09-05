import React from 'react'
import logo from '../images/CSSchool.png'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {

    handleLogoPress = () => {
       this.props.history.push("/")
    }

    render(){
        return(
            <div id="navbar">
                <img id="logo" src={logo} onClick={this.handleLogoPress}></img>
                <span id="userspan"><button onClick={this.props.openModal}>Login</button></span>
            </div>
        )
    }

}