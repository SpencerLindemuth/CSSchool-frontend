import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export default class LessonView extends React.Component {


    render(){
        return(
            <div className={"game"} id="lessonview">
                <h1 id="lessonnumber">{`Lesson ${this.props.lessonNumber}`}</h1>
                <h3 id="lessontitle">{this.props.title}</h3>
                <ReactMarkdown source={this.props.lesson} escapeHtml={false} /> 
            </div>
        )
    }

}