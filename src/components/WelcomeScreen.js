import React from 'react'
import Navbar from './Navbar';

export default class WelcomeScreen extends React.Component {

    getProgress = () => {
      }

    handleClick = () => {
        if(localStorage.getItem("lastlesson")){
            this.props.history.push(`/lesson/${localStorage.getItem("lastlesson")}`)
        }
        else{
            this.props.history.push("lesson/1")
        }
    }

    handleContinueClick = () => {
        return fetch("https://csschool-api.herokuapp.com/api/users/progress", {
            method: "GET",
            headers: {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${localStorage.jwt}`
            }
          })
          .then(res => res.ok ? res.json() : null)
          .then(data => {
              console.log(data)
              data !== null ? this.props.history.push(`lesson/${data.progress.lesson_number + 1}`) : this.props.history.push("lesson/1")
          })
        }

    render(){
        return(
            <div>
                <Navbar history={this.props.history} openModal={this.props.openModal} setLoginState={this.props.setLoginState} setLogoutState={this.props.setLogoutState} loggedIn={this.props.loggedIn}/>
                <div id="welcome-div">
                    <h1>Welcome to CSSchool!</h1>
                    <p>CSSchool is here to teach you the basic in's and out's of CSS styling.
                        From changing colors and font sizes to positioning elements and creating consistent layouts, this course will
                        give you the skills to jump off the deep end into front-end web design. 
                    </p>
                    <button onClick={this.handleClick}>Get Started</button>
                    {
                        this.props.loggedIn ? <button onClick={this.handleContinueClick}>Continue</button> : null
                    }
                </div>
            </div>
        )
    }



}