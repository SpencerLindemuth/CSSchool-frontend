import React from 'react'

export default class LoginForm extends React.Component {

    state={
        username: "",
        password: "",
        errorMessage: "",
        createUserFlag: false
    }


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
        let passwordField = document.getElementById("passwordinput")
        this.setState({
            password: ev.target.value
        })
        passwordField.style.borderBottomColor = null
    }

    handleCreateClick = () => {
        this.setState({
            createUserFlag: true
        })
    }

    handleBackClick = () => {
        this.setState({
            createUserFlag: false
        })
    }

    handleCreateSubmit = (ev) => {
        ev.preventDefault()
        if(this.state.username.length === 0){
            let usernameField = document.getElementById("usernameinput")
            this.setState({
                errorMessage: "Username cannot be blank"
            })
            usernameField.style.borderBottomColor = "#EF476F"
        }
        else if(this.state.password.length === 0){
            let passwordField = document.getElementById("passwordinput")
            this.setState({
                errorMessage: "Password cannot be blank"
            })
            passwordField.style.borderBottomColor = "#EF476F"
        }else{
            fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if(data === null){
                    this.setState({
                        errorMessage: "Unable to create account, please try again",
                        password: ""
                    })
                }
                else{
                    this.setState({
                        username: "",
                        password: "",
                        createUserFlag: false,
                    })
                    localStorage.setItem("jwt", data.jwt)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    this.props.setLoginState()
                    this.props.closeModal({target: true})
                }
            })
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if(data === null){
                this.setState({
                    errorMessage: "Invalid Username or Password",
                    password: ""
                })
            }
            else{
                this.setState({
                    username: "",
                    password: ""
                })
                localStorage.setItem("jwt", data.jwt)
                localStorage.setItem("user", JSON.stringify(data.user))
                this.props.setLoginState()
                this.props.closeModal({target: true})
            }
        })
    }

    render(){
        return(
            <div>
                <div id="errordiv">{this.state.errorMessage}</div>
                <form className="loginForm" onSubmit={this.handleSubmit} spellCheck="false">
                    <label id="id">{'#'}</label><label id="useraccountcss">{'useraccount'}</label><label id="brace">{' {'}</label>
                    <br />
                    <div id="usernamesdiv" className="loginformspan">username: <input id="usernameinput" value={this.state.username} onChange={this.handleUsernameChange}/>;</div>
                    <div id="passworddiv" className="loginformspan">password: <input id="passwordinput" value={this.state.password} onChange={this.handlePasswordChange} type="password"/>;</div>
                    <span id="closingcurlyspan">}</span>
                    <br />
                    {!this.state.createUserFlag ? <input id="loginSubmit" type="submit" value={"Login"} /> : null }
                    {!this.state.createUserFlag ? <button type="button" onClick={this.handleCreateClick}>Create Account</button> : null}
                    {this.state.createUserFlag ? <button id="loginSubmit" onClick={this.handleCreateSubmit}>Create</button> : null}
                    {this.state.createUserFlag ? <button type="button" onClick={this.handleBackClick}>Back</button> : null}
                </form>
            </div>
        )
    }



}