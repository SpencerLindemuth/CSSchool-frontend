import React from 'react'
import Navbar from './Navbar'
import CodeView from './lessonComponents/codeView'
import ActionView from './lessonComponents/actionView'
import LessonView from './lessonComponents/lessonView'

export default class Lesson extends React.Component {

    state = {
        lessonView: true,
        guessed: false,
        styleAdded: 0,
    }

    applyCss = (css) => {
        let parsedCss = css.replace(/\s/g, "")
        let sheet = window.document.styleSheets[0];
        let parsedArray = parsedCss.split("")
        try{
            for (let i = 0; i < parsedArray.length; i++) {
              let index = parsedArray.indexOf("}")
              let rule = parsedArray.splice(0, index+1)
              let parsedRule = rule.join("")
              sheet.insertRule(parsedRule, sheet.cssRules.length);
              this.setState({styleAdded: this.state.styleAdded + 1})
            }
          }
          catch(error){
            console.log(error)
          }
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

    handleNextClick = () => {
        if(this.state.guessed){
            console.log("hello from parent")
        }
    }

    getComponent = () => {
        if(this.state.lessonView){
           return  <LessonView lesson={this.props.lessons[this.pathName() - 1].lesson} title={this.props.lessons[this.pathName() - 1].title}/>
        }
        else{
           return <ActionView html={this.props.lessons[this.pathName() - 1].html} css={this.props.lessons[this.pathName() - 1].css} handleNextClick={this.handleNextClick}/>
        }
    }

    answerButtonClick = (ev) => {
        this.removeStyles()
        if(this.state.lessonView)
            this.setState({
                lessonView: false,
                guessed: true, 
            })
        let target = ev.target
        console.log(this.props.lessons[this.pathName() - 1][`${target.name}_action_css`])
        setTimeout(() => {
        this.applyCss(this.props.lessons[this.pathName() - 1][`${target.name}_action_css`])
        },0)
    }

    resetButton = () => {
        this.removeStyles()
        this.setState({
            guessed: false
        })
    }

    removeStyles = () => {
        let sheet = window.document.styleSheets[0];
        for (let i = 0; i < this.state.styleAdded; i++){
            sheet.deleteRule(sheet.cssRules.length-1);
        }
        this.setState({
            styleAdded: 0
        })
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
                        <button onClick={this.resetButton}>Reset</button>
                        <button>Save</button>
                    </span>
                </span>
                <div className="helperdiv">
                    <div id="gamescreen">
                        {lesson ? <CodeView code={lesson.template} /> : null}
                        {lesson ? this.getComponent() : null}
                    </div>
                    <div id="answerbuttonspans">
                        <span id="answerbuttonspanfirst">
                            {lesson ? <button id="answer1" name="button_one" onClick={this.answerButtonClick}>{lesson.button_one_text}</button> : null}
                            {lesson ? <button id="answer2" name="button_two" onClick={this.answerButtonClick}>{lesson.button_two_text}</button> : null}
                        </span>
                        <span id="answerbuttonspanfirst">
                            {lesson ? <button id="answer3" name="button_three" onClick={this.answerButtonClick}>{lesson.button_three_text}</button> : null}
                            {lesson ? <button id="answer4" name="button_four" onClick={this.answerButtonClick}>{lesson.button_four_text}</button> : null}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
    }

}