import React from 'react'
import Navbar from './Navbar';

export default class WelcomeScreen extends React.Component {

    handleClick = () => {
        if(localStorage.getItem("lastlesson")){
            this.props.history.push(`/lesson/${localStorage.getItem("lastlesson")}`)
        }
        else{
            this.props.history.push("lesson/1")
        }
    }

    render(){
        return(
            <div>
                <Navbar history={this.props.history} openModal={this.props.openModal}/>
                <div id="welcome-div">
                    <h1>Welcome to CSSchool!</h1>
                    <p>CSSchool is here to teach you the basic in's and out's of CSS styling.
                        From changing colors and font sizes to positioning elements and creating consistent layouts, this course will
                        give you the skills to jump off the deep end into front-end web design. 
                    </p>
                    <button onClick={this.handleClick}>Get Started</button>
                </div>
            </div>
        )
    }



}