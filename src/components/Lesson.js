import React from 'react'
import Navbar from './Navbar'
import CodeView from './lessonComponents/codeView'
import ActionView from './lessonComponents/actionView'
import LessonView from './lessonComponents/lessonView'

export default class Lesson extends React.Component {

    state = {
        lessonView: true,
    }

    pathName = () => {
        let url = this.props.location.pathname
        let lessonNum = url.replace("/lesson/", "")
        return parseInt(lessonNum)
    }

    handleLessonClick = () => {
        this.setState({
            lessonView: !this.state.lessonView
        })
    }

    getComponent = () => {
        if(this.state.lessonView){
           return  <LessonView lesson={this.props.lessons[this.pathName() - 1].lesson} title={this.props.lessons[this.pathName() - 1].title}/>
        }
        else{
           return <ActionView html={this.props.lessons[this.pathName() - 1].html} css={this.props.lessons[this.pathName() - 1].css}/>
        }
    }

    render(){

        const lesson = this.props.lessons[this.pathName() - 1]

        return(
            <div>
                <Navbar history={this.props.history}/>
                <span className="actionbar">
                    <span className="leftbuttons">
                        <button>&#8592; Prev</button>
                        <button id="lessonbutton" onClick={this.handleLessonClick}>{this.state.lessonView ? "Code": "Lesson"}</button>
                    </span>
                    <span className="rightbuttons">
                        <button>Reset</button>
                        <button>Save</button>
                    </span>
                </span>
                <div className="helperdiv">
                    <div id="gamescreen">
                        {lesson ? <CodeView code={lesson.template} /> : null}
                        {lesson ? this.getComponent() : null}
                    </div>
                </div>
            </div>
        )
    }

}