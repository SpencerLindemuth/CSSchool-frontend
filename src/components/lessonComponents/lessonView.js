import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class LessonView extends React.Component {


    render(){
        return(
            <div className={"game"} id="lessonview">
                <h1>{this.props.title}</h1>
                <ReactMarkdown source={this.props.lesson} escapeHtml={false} /> 
            </div>
        )
    }

}