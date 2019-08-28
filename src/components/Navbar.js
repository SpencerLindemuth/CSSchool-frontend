import React from 'react'
import logo from '../images/CSSchool.png'
import {Link} from 'react-router-dom'
export default class Navbar extends React.Component {

    handleLogoPress = () => {
       this.props.history.push("/dashboard")
    }

    render(){
        return(
            <div id="navbar">
                <img src={logo} onClick={this.handleLogoPress}></img>
            </div>
        )
    }

}