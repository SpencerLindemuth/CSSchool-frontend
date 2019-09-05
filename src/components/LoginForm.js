import React from 'react'

export default class LoginForm extends React.Component {

    state={
        username: "",
        password: "",
        errorMessage: "",
    }

    passwordField = document.getElementById("passwordinput")

    handleUsernameChange = (ev) => {
        let usernameField = document.getElementById("usernameinput")
        if(ev.target.value.length >= 24){
            this.setState({errorMessage: "Username cannot be longer than 24 characters"})
            usernameField.style.borderBottomColor = "#EF476F"
        }
        else{this.setState({
                username: ev.target.value,
                errorMessage: ""
            })
            usernameField.style.borderBottomColor = null
        }
    }

    handlePasswordChange = (ev) => {
            this.setState({
                password: ev.target.value
            })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.setState({
            errorMessage: "Sorry there was an error with your request"
        })
    }

    render(){
        return(
            <div>
                <div id="errordiv">{this.state.errorMessage}</div>
                <form className="loginForm" onSubmit={this.handleSubmit} spellcheck="false">
                    <label id="id">{'#'}</label><label id="useraccountcss">{'useraccount'}</label><label id="brace">{' {'}</label>
                    <br />
                    <div id="usernamesdiv" className="loginformspan">username: <input id="usernameinput" value={this.state.username} onChange={this.handleUsernameChange}/>;</div>
                    <div id="passworddiv" className="loginformspan">password: <input id="passwordinput" value={this.state.password} onChange={this.handlePasswordChange} type="password"/>;</div>
                    <span id="closingcurlyspan">}</span>
                    <br />
                    <input id="loginSubmit" type="submit" />
                </form>
            </div>
        )
    }



}