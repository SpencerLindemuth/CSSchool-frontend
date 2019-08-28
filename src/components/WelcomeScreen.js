import React from 'react'

export default class WelcomeScreen extends React.Component {

    render(){
        return(
            <div id="welcome-div">
                <h1>Welcome to CSSchool!</h1>
                <p>CSSchool is here to teach you the basic in's and out's of CSS styling.
                    From changing colors and font sizes to positioning elements and creating consistent layouts, this course will
                    give you the skills to jump off the deep end into front-end web design. </p>

                <button>Get Started</button>
            </div>
        )
    }



}