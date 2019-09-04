import React from 'react'
import { Link } from 'react-router-dom'

export default class LessonCreated extends React.Component{

    render(){
        return(
            <div id="created">
                <Link to={`lesson/${this.props.lessonId}`}>{`localhost:3000/lesson/${this.props.lessonId}`}</Link>
            </div>
        )
    }




}