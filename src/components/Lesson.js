import React from 'react'
import Navbar from './Navbar'
import CodeView from './lessonComponents/codeView'
import ActionView from './lessonComponents/actionView'
import LessonView from './lessonComponents/lessonView'
import PageNotFound from './lessonComponents/pagenotfound'

export default class Lesson extends React.Component {

    state = {
        lessonView: true,
        guessed: false,
        styleAdded: 0,
        update: false,
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
            if(this.props.loggedIn && localStorage.user && JSON.parse(localStorage.user).username && JSON.parse(localStorage.user).username.length > 0){
                this.saveProgress()
            }
            this.removeStyles()
            this.props.history.push(`/lesson/${this.pathName() + 1}`)
            this.setState({
                lessonView: true,
                guessed: false
            })
        }

    }

    saveProgress = () => {
        fetch('https://csschool-api.herokuapp.com/api/users/save', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.jwt}`
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.user).username,
                lesson: this.pathName()
            })
        })
    }

    getComponent = () => {
        if(this.state.lessonView){
           return  <LessonView lesson={this.findLesson().lesson} title={this.findLesson().title}/>
        }
        else{
           return <ActionView html={this.findLesson().html} css={this.findLesson().css} handleNextClick={this.handleNextClick}/>
        }
    }

    answerButtonClick = (ev) => {
        this.removeStyles()
        if(this.state.lessonView)
            this.setState({
                lessonView: false,
                guessed: true, 
            })
        else{
            this.setState({
                guessed: true
            })
        }
        let target = ev.target
        setTimeout(() => {
        this.applyCss(this.findLesson()[`${target.name}_action_css`])
        },0)
    }

    resetButton = () => {
        this.removeStyles()
        this.setState({
            guessed: false
        })
    }

    prevButton = () => {
        this.removeStyles()
        this.setState({
            guessed: false,
            lessonView: true,
        })
        if((this.pathName() - 1) === 0){
            this.props.history.push("/")
        }
        else{
            this.props.history.push(`/lesson/${this.pathName() - 1}`)
        }
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

    findLesson = () => {
        const id = this.pathName()
        let lesson = this.props.lessons.filter(les => {
            return les.lesson_number == id
        })
        if(lesson.length === 0){
            return null
        }
        else{
            return lesson[0]
        }
    }

    render(){

        // const lesson = this.props.lessons[this.pathName() - 1]
        const lesson = this.findLesson()

        return(
            <div>
                <Navbar history={this.props.history} openModal={this.props.openModal} setLoginState={this.props.setLoginState} setLogoutState={this.props.setLogoutState} loggedIn={this.props.loggedIn}/>
                <div id="pagenotfound">{
                    lesson ? null : <PageNotFound history={this.props.history}/>
                }</div>
                {lesson ? <div className="actionbar">
                    <span className="leftbuttons">
                        <button onClick={this.prevButton}>&#8592; Prev</button>
                        <button id="lessonbutton" onClick={this.handleLessonClick}>{this.state.lessonView ? "Code": "Lesson"}</button>
                    </span>
                    <span className="rightbuttons">
                        <button onClick={this.resetButton}>Reset</button>
                        <button onClick={() => this.props.history.push("/createlesson")}>Create</button>
                    </span>
                    </div> : null }
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
        if(!this.state.lesson){
            this.findLesson()
        }
    }

}