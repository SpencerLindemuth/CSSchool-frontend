import React from 'react'
import { Link } from 'react-router-dom'

export default class LessonCreated extends React.Component{

    render(){
        return(
            <div id="created">
                <h3>Your lesson has been created! You can view it or share it with this link:</h3>
                <br />
                <Link to={`lesson/${this.props.lessonId}`}>{`10.137.5.116:3000/lesson/${this.props.lessonId}`}</Link>
            </div>
        )
    }




}