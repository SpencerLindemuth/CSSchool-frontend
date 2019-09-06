import React from 'react'
import logo from '../images/CSSchool.png'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {

    state={
        loggedIn: false
    }

    handleLogoPress = () => {
       this.props.history.push("/")
    }

    logout = () => {
        localStorage.setItem("jwt", null)
        this.props.setLogoutState()
    }

    render(){
        return(
            <div id="navbar">
                <img id="logo" src={logo} onClick={this.handleLogoPress}></img>
                <span id="userspan">
                {console.log("loggedIn ", this.props.loggedIn)}
                {
                    this.props.loggedIn ? <button onClick={this.logout}>Logout</button> : <button onClick={this.props.openModal}>Login</button>
                }
                </span>
            </div>
        )
    }

    componentDidMount = () => {
        if(localStorage.jwt !== "null"){
            this.setState({
                loggedIn: true
            })
        }
    }

}